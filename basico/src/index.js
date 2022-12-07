const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app =  express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use( express.static( path.join(__dirname,"views")) )

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

/*io.on("connection", socket =>{

    // https://ajaxhispano.com/ask/lista-de-socketio-eventos-70239/

    // console.log(socket);
    console.log("clientes conectados:", io.engine.clientsCount);
    console.log("IDs del socket conectado:", socket.id);

    socket.on("disconnect", ()=>{

        console.log("El socket " + socket.id + " Se ha desconectado")

    });

    socket.conn.once("upgrade", ()=>{
        console.log("Hemos pasado de http long-polling a", socket.conn.transport.name )
    })

})*/

const socketOnline = [];

io.on("connection", socket =>{

    socketOnline.push(socket.id);

    socket.emit("welcome", "Ahora estas conectado");

    socket.on("server", data =>{
        console.log(data);
    });
    //emision a todos
    io.emit("everyone", socket.id + " se ha conectado");

    //emision a uno solo
    socket.on("last", messge =>{
        
        const lastSocket = socketOnline[socketOnline.length-1];

        io.to(lastSocket).emit("salute", messge);

    });

    // socket.emit("on", "holiss");
    // socket.emit("on", "holiss");

    // socket.emit("once", "holiss");
    // socket.emit("once", "holiss");

    socket.emit("off", "holiss");

    setTimeout(()=>{
        socket.emit("off", "holi")
    }, 3000)



});


httpServer.listen(3000);