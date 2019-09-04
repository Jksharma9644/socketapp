const express =require('express');
const app = express();
var path= require('path');
app.set('view engine','ejs');

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'))
})

server = app.listen(3000);
const io= require("socket.io")(server);
io.on("connection",(socket)=>{
  


    socket.on('new_message',(data)=>{
        console.log("new message",data);
        io.sockets.emit('new_message',{message:data.message})

    })
})
