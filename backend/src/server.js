const express = require('express');
const routes = require('./routes');
const cors  = require('cors');
const path  = require('path');
const mongoose = require('mongoose');
const socketio = require('socket.io')
const http = require('http')

const app = express();
const server = http.Server(app)
const io = socketio(server)


mongoose.connect('mongodb+srv://onministack:onministack@onministack-mpk75.mongodb.net/semana09?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const connectedUsers = {}

io.on('connection', socket => {
  const { user_id } = socket.handshake.query

  connectedUsers[user_id] = socket.id
})

app.use((req, res, next) => {
  req.io = io
  req.connectedUsers = connectedUsers
  return next()
})

//req.params = Acessar route params (para edição e delete)
//req.query = Acessar query arams (Filtros)
//req.body - Acessar o corpo da requiseição (criação e edição)

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..','uploads')));
app.use(routes);

server.listen(3333);