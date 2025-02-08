import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const db = await open({
    filename: 'chat.db',
    driver: sqlite3.Database
});

// Create a table to store messages if it doesn't exist
await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_offset TEXT UNIQUE,
        content TEXT
    );
`);

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {} // Enables connection recovery
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', async (socket) => {
    console.log(`User ${socket.id} connected`);

    // Check if the user has recovered from disconnection
    if (socket.recovered) {
        console.log(`User ${socket.id} reconnected and recovered missed events`);
    } else {
        // If recovery was not successful, send missed messages from the database
        try {
            const lastOffset = socket.handshake.auth.serverOffset || 0; // Get last received message ID from client
            await db.each(
                'SELECT id, content FROM messages WHERE id > ?',
                [lastOffset],
                (_err, row) => {
                    socket.emit('chatmessage', row.content, row.id); // Send missed messages
                }
            );
        } catch (error) {
            console.error('Error retrieving missed messages:', error);
        }
    }

    socket.on('disconnect', (reason) => {
        console.log(`User ${socket.id} disconnected due to: ${reason}`);
    });

    socket.on('chatmessage', async (msg, clientOffset) => {
        let result;
        try {
            result = await db.run('INSERT INTO messages (client_offset, content) VALUES (?, ?)', [
                clientOffset,
                msg
            ]);
        } catch (error) {
            console.error('Error inserting message:', error);
            return;
        }
        console.log(`Message received: ${msg}`);
        io.emit('chatmessage', msg, result.lastID); // Broadcast message with message ID
    });
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
