require("dotenv").config();
require("./controller/db").connect();
const port = process.env.PORT || 5556
const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const { routers, mainRouter } = require("./routers");
const { validToken } = require("./jwt");
const { sendErrorSocket } = require("./errController");
const familyService = require("./services/family.services.js");
app.use(express.json());
app.use(cors());


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["*",'https://save-fast.vercel.app','http://localhost:5173'],
  },
});

app.use("/api", mainRouter);
app.use("/upload", express.static('./upload'));

io.on("connection", async (socket) => {
  try{
    const userData = await validToken(socket.handshake.headers.authorization);
    if (!userData) throw "jwt";
    const family = await familyService.getFamily({_id:userData.familyId})
    socket.join([userData.familyId,family.teamChallenge]);
    routers(io, socket);
    socket.emit("connects")
  }catch(err){
    sendErrorSocket(socket, err);
  }
});

server.listen(port, () => {
  console.log("Server is running : listening to port " + port);
});