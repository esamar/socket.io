const socket = io();

const connectRoom1 = document.querySelector("#connectRoom1");
const connectRoom2 = document.querySelector("#connectRoom2");
const connectRoom3 = document.querySelector("#connectRoom3");

connectRoom1.addEventListener("click", ()=>{
    socket.emit("connect to room", room1);
});

connectRoom2.addEventListener("click", ()=>{
    socket.emit("connect to room", room2);
});

connectRoom3.addEventListener("click", ()=>{
    socket.emit("connect to room", room3);
});