$(function(){
    var socket =io.connect('http://localhost:3000');
    var message=$("#message");
    var send_message= $("#send_message");
    var chatroom =$("#chatroom")+"</p>"
    send_message.click(function(){
        socket.emit('new_message',{message:message.val()})
    })

    socket.on('new_message',(data)=>{
        console.log(data.message)
        chatroom.append("<p>"+data.message+"</p>") 
    })
})

function sendNotification(){

}