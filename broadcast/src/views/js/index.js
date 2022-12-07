const socket = io();

const circle = document.querySelector("#circle");

const drawCircle = position=>{
    circle.style.top = position.top;
    circle.style.left = position.left;
}

const drag = e =>{
    
    // console.log(e);

    const clientX = e.clientX;
    const clientY = e.clientY;

    const position = {
        top: e.clientY + "px",
        left: e.clientX +"px"
    };

    drawCircle(position);
    
    socket.emit("circle position", position);


    // circle.style.top = clientY +"px";
    // circle.style.left = clientX +"px";

}

document.addEventListener("mousedown", e=>{
    document.addEventListener("mousemove",drag)
});

document.addEventListener("mouseup", e=>{
    document.removeEventListener("mousemove", drag)
});

socket.on("move circle", position =>{
    drawCircle(position);
})