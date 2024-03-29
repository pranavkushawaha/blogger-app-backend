const express = require("express")
const app = express()
const sanitizeHTML = require("sanitize-html")
const jwt = require("jsonwebtoken")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/", require("./router"))

const server = require("http").createServer(app)
const { Server } = require("socket.io");

const io = new Server(server, {
  pingTimeout: 30000,
  cors: {
    origin: ["http://localhost:3000","https://blog-app-grp10.netlify.app"]
  }
})

// const io = require("socket.io")()


io.on("connection", function(socket) {
  // console.log("connection ban gaya")
  // socket.broadcast.emit("chatFromServer", { message: "main test mssg hu", username: "test hu", avatar: "jvsljksfjslfj" })
  socket.on("chatFromBrowser", function(data) {
    try {
      let user = jwt.verify(data.token, process.env.JWTSECRET)
      // console.log(data.message);
      socket.broadcast.emit("chatFromServer", { message: sanitizeHTML(data.message, { allowedTags: [], allowedAttributes: {} }), username: user.username, avatar: user.avatar })
    } catch (e) {
      console.log("Not a valid token for chat.")
    }
  })
})

module.exports = server
