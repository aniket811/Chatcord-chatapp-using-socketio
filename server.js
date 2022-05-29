const path=require('path')
const http=require('http');
const express=require('express');
const socketio =require('socket.io')
const formatMessage=require('./utils/messages')
const {userJoin, getCurrentuser, userLeave, getroomUsers}=require('./utils/users')

app=express()
const server=http.createServer(app);
const PORT=4500 || process.env.PORT
app.use(express.static(path.join(__dirname,'public')))
const io=socketio(server)
const botName='Chatcord bot'
io.on('connection',socket=>{
    socket.on('joinroom',({username,room})=>{
        const user=userJoin(socket.id,username,room)
        socket.join(user.room)
        socket.emit('message',formatMessage(botName,'Welcome to Chatcord '));
        // Broadcast 
    socket.broadcast.to(user.room).emit('message',formatMessage(botName,`A ${user.username} has joined the chat !`));
    })
    console.log('New server connected')
    // A user connect 
    socket.emit('message',formatMessage(botName,'Welcome to Chatcord '));
        // Broadcast 
    socket.broadcast.emit('message',formatMessage(botName,'A user has joined the chat !'));
    
    // Disconnect
  
    socket.on('chatMessage',(msg)=>{
        const user=getCurrentuser(socket.id)
        // console.log(msg)
        io.to(user.room).emit('message',formatMessage(user.username,msg))
        io.to(user.room).emit('roomusers',{
            room:user.room,
            user:getroomUsers(user.room)    
        })

    })
    socket.on('disconnect',()=>{
        const user=userLeave(socket.id)
        if(user){

            io.to(user.room).emit('message',formatMessage(botName,`${user.username} has left the chat`))
            io.to(user.room).emit('roomusers',{
                room:user.room,
                user:getroomUsers(user.room)
            })
        }
        else{

        }
    })
})
server.listen(PORT,()=>{
    console.log('Server has started running');
})
