# Socket.IO Chat App

A real-time chat application built using **Node.js**, **Express**, **Socket.IO**, and **SQLite**. This app supports **connection state recovery**, ensuring users can reconnect without missing messages.

---

## 🚀 Features

- **Real-time messaging** using WebSockets
- **Connection state recovery** (restores missed messages after reconnection)
- **Persistent chat history** stored in SQLite
- **Manual connect/disconnect toggle**

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express, Socket.IO
- **Database:** SQLite
- **Frontend:** HTML, CSS, JavaScript

---

## 📦 Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/socketio-chat-app.git
   cd socketio-chat-app
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Start the server**
   ```sh
   node server.js
   ```

4. **Open the app in your browser**
   ```
   http://localhost:3000
   ```

---

## 📜 Usage

1. Open the chat app in multiple tabs to test real-time messaging.
2. Type a message in the input box and hit **Send**.
3. Click **Connect/Disconnect** to manually toggle the WebSocket connection.
4. If a user disconnects and reconnects, missed messages will be recovered.

---

## 📂 Project Structure

```
📁 socketio-chat-app
│── 📄 server.js       # Express + Socket.IO backend
│── 📄 index.html      # Frontend UI
│── 📄 package.json    # Project dependencies
└── 📄 chat.db         # SQLite database (generated at runtime)
```

---

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|------------|-----------------|
| `GET`  | `/`        | Serves the chat UI |

---

## 📌 Improvements & Future Enhancements

- [ ] Add user authentication
- [ ] Support private messaging
- [ ] Store timestamps for messages

---

## 🏆 Credits

Built with ❤️ using **Socket.IO** following the official documentation.

---

## 📜 License

This project is licensed under the MIT License.

