const io = require('socket.io')(4000)

const users = {}

io.on('connection',socket=>{
    console.log('new user')
    socket.emit('chat-message','Hello People')

    socket.on('new-user',name=>
    {
        users[socket.id]=name
        socket.broadcast.emit('user-connected',name)
    })

    socket.on('send-chat-message',message=>
    {
        //console.log(message); to check if message is sending
        socket.broadcast.emit('chat-message',
        {
            message:message,
            name:users[socket.id]
        })//to send to all users expect himself
    })
    socket.on('disconnect',()=>
    {
        socket.broadcast.emit('user-disconnected',users[socket.id])
        delete users[socket.id]
    })
})