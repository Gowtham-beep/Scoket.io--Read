import express from 'express'
import {createServer} from 'node:http'
import {fileURLToPath} from 'node:url'
import { dirname,join } from 'node:path'
import { Server } from 'socket.io'

const app=express()
const server=createServer(app)
const io= new Server(server)

const __dirname=dirname(fileURLToPath(import.meta.url))

app.get('/',(req,res)=>{
    res.sendFile(join(__dirname,'index.html'))
})

io.on('connection',(soket)=>{
    console.log('A user connected')

    soket.on('disconnect',()=>{
        console.log('A user disconnected')
    })

    soket.on('chatmessage',(msg)=>{                 
        console.log('message:',msg)
        io.emit('chatmessage',msg)
    })
    
})
server.listen(3000,()=>{
    console.log('serevr running aat http://localhost:3000')
})