const express = require('express');
const bodyParser = require('body-parser');
const socket = require('socket.io');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));//gives read access to all the files in the public folder 


app.set('view engine', 'ejs');
var port = process.env.PORT || 3000;

app.get('/',(req,res,next) => {
    res.render('index');
})

app.post('/room',(req,res,next) => {
    // console.log(req.body);
    roomname = req.body.roomname;
    username = req.body.username;
    res.redirect(`/room?username=${username}&roomname=${roomname}`)
})

app.get('/room', (req,res,next) => {
    res.render('room');
})

app.use((req,res,next) => {
    res.status(404).end("404 Page Not Found");
})
const server = app.listen(port, () => {
    console.log(`Server Running on ${port}`);
})


