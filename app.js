//imports
const express = require('express');
const http = require('http')
const app = express();
const httpServer = http.createServer(app);
const io = require('socket.io')(httpServer)
const osUtils=  require('node-os-utils')
const os = require('os')

//setting view engine
app.set('view engine', 'ejs')
app.use(express.static(__dirname+'/public'));




app.get('/',(req,res)=>{
    res.render('index')
})

const cpu =  osUtils.cpu
const username = os.userInfo([{encoding:"buffer"}]).username
const osInfo = os.type();
//socketio

io.on('connection',socket=>{
    console.log(`${socket.id} connected`);

    setInterval(() => {
        let ramUsed = Math.round(os.totalmem())-Math.round(os.freemem())
        let ram = (ramUsed*100/Math.round(os.totalmem()).toFixed(2))

        cpu.usage().then(cpu=> socket.emit('ram-usage',{ram,cpu,username,osInfo}))
        
    },1000);
})


const PORT = 3000;
httpServer.listen(PORT,()=>{
    console.log('server beating http');
})

