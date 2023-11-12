const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mqtt = require("mqtt");
const config = require("./config");
const cors = require("cors");

console.log("config = " + config.DATABASE);

// Connect to MongoDB using Mongoose
mongoose
  .connect(config.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

// Khởi tạo server
const server = require("http")
  .createServer(app)
  .listen(3001, function () {
    console.log("[Server] Running on http://localhost:" + 3001);
  });

// Add Access Control Allow Origin headers
app.use(cors());
// app.use('/photos', express.static('photos'));

// API màn hình chính hiển thị
// app.get('/', (req, res)=> {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.sendFile(__dirname + "/index.html");
// });

// Socket
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  }
  });

io.on("connection", function (socket) {
  console.log("====================================");
  console.log("Connected socket");
  console.log("====================================");

  socket.on("disconnect", function () {
    console.log("[Socket] A user disconnected");
  });

  var options = { clientId: "ESP32", port: 1883, keepalive: 60 };
  // Kết nối đến MQTT Broker với tham số biến option đã khai báo
  var client = mqtt.connect("mqtt://test.mosquitto.org", options);
  
  // Khai báo Connect callback handler (nếu kết nối thành công sẽ thực thi hàm này)
  client.on("connect", function () {
    // Subscribe đến topic relay/state để nhận dữ liệu cập nhật trạng thái relay
    client.subscribe("sensor", function (err) {
      console.log("Subscribed to sensor topic");
    
      if (err) {
        console.log(err);
      }
    });
  });

  client.on("message", function (topic, message) {
    // Nhận dữ liệu và lưu vào biến msg_str
    var msg_str = message.toString();
    // In ra console để debug
    console.log("[Topic arrived] " + topic);
    console.log("[Message arrived] " + msg_str);
    socket.emit("data", [12, 12]);
  
  });

});
//   socket.emit("data", [12, 12]);

//   var listInfo = [];
// });

// var options = { clientId: "ESP32", port: 1883, keepalive: 60 };
// // Kết nối đến MQTT Broker với tham số biến option đã khai báo
// var client = mqtt.connect("mqtt://test.mosquitto.org", options);

// // Khai báo Connect callback handler (nếu kết nối thành công sẽ thực thi hàm này)
// client.on("connect", function () {
//   // Subscribe đến topic relay/state để nhận dữ liệu cập nhật trạng thái relay
//   client.subscribe("sensor", function (err) {
//     console.log("Subscribed to sensor topic");
  
//     if (err) {
//       console.log(err);
//     }
//   });
// });

// Khai báo Subscribe Callback Handler (Khi nhận được dữ liệu từ các topic đã subscribe sẽ thực thi hàm này)
// client.on("message", function (topic, message) {
//   // Nhận dữ liệu và lưu vào biến msg_str
//   var msg_str = message.toString();
//   // In ra console để debug
//   console.log("[Topic arrived] " + topic);
//   console.log("[Message arrived] " + msg_str);

//   io.on("connection", function (socket) {
//     console.log("====================================");
//     console.log("Connected socket");
//     console.log("====================================");
  
//     socket.on("disconnect", function () {
//       console.log("[Socket] A user disconnected");
//     });
//     socket.emit("data", [12, 12]);
  
//     socket.disconnect();
//   });

//   // var dataObject = JSON.parse(msg_str);

//   // Assuming you have a Mongoose model named 'IOTSensor'
//   // const iotSensorData = new IOTSensor({
//   //   DeviceID: dataObject["ID"],
//   //   heat: dataObject["temp"],
//   //   humi: dataObject["humi"],
//   //   gas: dataObject["gas"],
//   //   time: new Date(),
//   // });

//   // iotSensorData
//   //   .save()
//   //   .then(() => {
//   //     console.log("Inserted data successfully");
//   //     io.emit("sensor", msg_str);
//   //   })
//   //   .catch((error) => {
//   //     console.error("Error inserting data into MongoDB: ", error);
//   //   });
// });
