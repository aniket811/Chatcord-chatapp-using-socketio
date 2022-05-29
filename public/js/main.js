const chatForm=document.getElementById('chat-form');
const chatMessage=document.querySelector('.chat-messages')
const roomName=document.getElementById('room-name')
const userList=document.getElementById
const socket =io()
// Get username and room from url
const {username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
})

// Join chat 
socket.emit('joinroom',{username,room})
 
socket.on('message',message=>{
    console.log(message)
    outputMessage(message)

    chatMessage.scrollTop=chatMessage.scrollHeight;

});
socket.on('roomusers',({room,users})=>{
    outputRoomName(room)
    outputUsers(users)
})
// Messagesubmit
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg=e.target.elements.msg.value
    // Emitting message
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();
    socket.emit('chatMessage',msg)
})
// Domoutput
function outputMessage(message){
    const div=document.createElement('div')
    div.classList.add('message')
    div.innerHTML=`	<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
       ${message.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)

}
// Add room name to donm
function outputRoomName(room){
    roomName.innerText=room;


}
// Add user to DOM
function outputUsers(users) {
    userList.innerHTML = '';
    users.forEach((user) => {
      const li = document.createElement('li');
      li.innerText = user.username;
      userList.appendChild(li);
    });
  }
  //Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) {
      window.location = '../index.html';
    } else {
    }
  });