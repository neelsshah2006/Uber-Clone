const SocketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io = null;
const socketIdMap = new Map();

function initializeSocket(server) {
  io = SocketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected with socket ID: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log(
        `User with ID: ${userId} and type: ${userType} joined with socket ID: ${socket.id}`
      );

      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid location" });
      }

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected with socket ID: ${socket.id}`);
      for (const [userId, id] of socketIdMap.entries()) {
        if (id === socket.id) {
          socketIdMap.delete(userId);
          break;
        }
      }
    });
  });
}

function sendMessageToSocketId(socketId, messageObj) {
  if (io) {
    io.to(socketId).emit(messageObj.event, messageObj.data);
  } else {
    console.log("Socket.io not initialized");
  }
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
