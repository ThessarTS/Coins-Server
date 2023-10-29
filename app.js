if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
const { createServer } = require("http");
const { Server } = require("socket.io");
const { Chat } = require('./models/index')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*', methods: ['GET', 'POST'] } });

app.use('/', router)

app.use(errorHandler)

io.on('connection', (socket) => {
    console.log(socket.id, 'is connected');
    socket.on('message', async (data) => {
        if (data.messages) {
            await Chat.create(data)
        }
        let chats = await Chat.findAll()
        io.emit('broadcast', chats)
    })
})

httpServer.listen(port);