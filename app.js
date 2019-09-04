const express =require('express');
const app = express();
var path= require('path');
var cors = require('cors');
bodyParser = require('body-parser');

const webpush = require('web-push');

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/',(req,res)=>{
    res.send(' Welcome to api')
})

const dummyDb = { subscription: null } //dummy in memory store
const vapidKeys = {
"publicKey":"BDqb6KsuiaTnDWqLpolnfAWd2P-8GiK_qh9Jrg5K6X6Mqnxq9T7zdNYuiMw_eoF-oZjrGx-J_Wv1EbxF70tLp3k",
"privateKey":"9BZFD6slgYfdxtDLmnHaIX-sHrrovVyu_VLW_ibZd2M"
}

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

async function saveToDatabase(subscription){
     dummyDb.subscription = await subscription;
}
sendNotification = (subscription, dataToSend) => {
    webpush.sendNotification(subscription, dataToSend)
}





app.post('/api/save-subscription',async (req,res)=>{
// console.log(req)
    const subscription = req.body;
    saveToDatabase(subscription) //Method to save the subscription to Database
     res.json({ message: 'success' })

})

app.get('/api/send-notification', (req, res) => {
    const subscription = dummyDb.subscription //get subscription from your databse here.
    const message = 'Hello World'
    sendNotification(subscription, message);
    res.json({ message: 'message sent' })
})




app.post('/api/newsletter',(req,res)=>{
    // console.log(req.body)
    const allSubscriptions=[];

    const notificationPayload = {
        "notification": {
            "title": "Angular News",
            "body": "Newsletter Available!",
            "icon": "assets/main-page-logo-small-hat.png",
            "vibrate": [100, 50, 100],
            "data": {
                "dateOfArrival": Date.now(),
                "primaryKey": 1
            },
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    };
    Promise.all(allSubscriptions.map(sub => webpush.sendNotification(
        req.body, JSON.stringify(notificationPayload) )))
        .then(() => res.status(200).json({message: 'Newsletter sent successfully.'}))
        .catch(err => {
            console.error("Error sending notification, reason: ", err);
            res.sendStatus(500);
        });
})


server = app.listen(3000);
const io= require("socket.io")(server);
io.on("connection",(socket)=>{
  


    socket.on('new_message',(data)=>{
        console.log("new message",data);
        io.sockets.emit('new_message',{message:data.message})

    })
})

 function sendNewsletter(req, res) {
    

}
