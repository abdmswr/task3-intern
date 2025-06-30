const io = require("socket.io")(3001, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", socket => {
    console.log("User connected");

    socket.on("send-changes", data => {
        socket.broadcast.emit("receive-changes", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});
