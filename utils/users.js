const users=[

]
// Join in chat
function userJoin(id,username,room){
     const user={id,username,room}
     users.push(user)
     return user;


}
// function get
function getCurrentuser(id){
    return users.find(user=>user.id===id)
}
function userLeave(id){
    const index=users.findIndex(user=>user.id===id)
    if(index!=-1){
        return users.splice(index,1)[0];

    }

}
// Get room users
function getroomUsers(room){
    return users.filter(user=>user.room === room);
}
module.exports={
    userJoin,getCurrentuser,userLeave,getroomUsers
}