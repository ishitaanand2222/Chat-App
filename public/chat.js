//CLIENT SIDE

//getting html elments
const output = document.getElementById('output');
const message = document.getElementById('message');
const send = document.getElementById('send');
const feedback = document.getElementById('feedback');
const roomMessage = document.querySelector('.room-message');
const users = document.querySelector('.users');

//Socket server URL
const socket = io.connect('http://localhost:3000/');

//Fetching parameters from the url
const queryString = window.location.search; //helps in fetching the querystring i.e the string written after ?
const urlParams = new URLSearchParams(queryString);
console.log(urlParams);
console.log(queryString);
const username = urlParams.get('username');
const roomname = urlParams.get('roomname');

console.log(username, roomname);

//displaying the room name of the user 
roomMessage.innerHTML = `Connected in room ${roomname}`;

//emitting the username and roomname of newly joined user to server
socket.emit('joined-user',{
    username: username,
    roomname: roomname
});

//displaying if new user joined room
socket.on('joined-user', (data) => {
    output.innerHTML += '<p>--> <strong><em>' + data.username + ' </strong>has Joined the Room</em></p>';
})

//sending data when user clicks on send
send.addEventListener('click', () => {
    socket.emit('chat', {
        username: username,
        message: message.value,
        roomname: roomname
    })
    message.value = '';
})
//displaying message sent from  user
socket.on('chat', (data) => {
    output.innerHTML += '<p><strong>' + data.username + '</strong>: ' + data.message + '</p>';
    feedback.innerHTML = '';
    document.querySelector('.chat-message').scrollTop = document.querySelector('.chat-message').scrollHeight
})

//sending username if user is typing
message.addEventListener('keypress', () =>{
    socket.emit('typing', {username: username, roomname: roomname});
})

//displaying if user is typing 
socket.on('typing', (user) => {
    feedback.innerHTML = '<p><em>' + user + ' is typing...</em></p>';
})

socket.on('online-users', (data) => {
    users.innerHTML = ''
    data.forEach(user => {
        users.innerHTML += `<p>${user}</p>`
    });
})

