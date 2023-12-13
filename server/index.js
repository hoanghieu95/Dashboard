const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mqtt = require("mqtt");
const config = require("./config");
const cors = require("cors");

const Product = require("./models/product/index");
const History = require("./models/history/index");
const Visitor = require("./models/visitors/index");

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

// Socket
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", function (socket) {
  console.log("====================================");
  console.log("Connected socket");
  console.log("====================================");

  socket.on("disconnect", function () {
    console.log("[Socket] A user disconnected");
  });

  var options = {
    clientId: "ESP32",
    port: 12442,
    keepalive: 60,
    username: "dvioemit",
    password: "WJzmH3j7O6kH",
  };
  // Kết nối đến MQTT Broker với tham số biến option đã khai báo
  var client = mqtt.connect("mqtt://soldier.cloudmqtt.com", options);

  // Khai báo Connect callback handler (nếu kết nối thành công sẽ thực thi hàm này)
  client.on("connect", function () {
    // Subscribe đến topic relay/state để nhận dữ liệu cập nhật trạng thái relay
    client.subscribe("sensor_1", function (err) {
      console.log("Subscribed to sensor topic");

      if (err) {
        console.log(err);
      }
    });

    client.subscribe("notification_1", function (err) {
      console.log("Subscribed to notification topic");

      if (err) {
        console.log(err);
      }
    });
  });

  client.on("message", function (topic, message) {
    if (topic == "sensor_1") {
      const msg_str = message.toString();
      const dataObject = JSON.parse(msg_str);

      console.log("[Topic arrived] " + topic);
      console.log("[Message arrived] " + msg_str);

      let newProducts = [];
      let newHistoryData = { idProduct: null, value: [] };

      if (dataObject["typeT"] == 3) {
        newHistoryData.idProduct = dataObject["typeT"];
        newProducts.push(
          new Product({
            id: dataObject["typeT"],
            name: "Cảm biến nhiệt",
            value: dataObject["temp"],
            time: new Date(),
            type: {
              idType: "cbnd1",
              name: "Cảm biến nhiệt độ",
            },
          })
        );
        newHistoryData.value.push(dataObject["temp"]);
      }

      if (dataObject["typeH"] == 2) {
        newHistoryData.idProduct = dataObject["typeH"];
        newProducts.push(
          new Product({
            id: dataObject["typeH"],
            name: "Cảm biến độ ẩm",
            value: dataObject["humi"],
            time: new Date(),
            type: {
              idType: "cbnd1",
              name: "Cảm biến nhiệt độ",
            },
          })
        );
        newHistoryData.value.push(dataObject["humi"]);
      }

      if (dataObject["typeG"] == 1) {
        newHistoryData.idProduct = dataObject["typeG"];
        newProducts.push(
          new Product({
            id: dataObject["typeG"],
            name: "Cảm biến gas",
            value: dataObject["gas"],
            time: new Date(),
            type: {
              idType: "cbkk1",
              name: "Cảm biến không khí",
            },
          })
        );
        newHistoryData.value.push(dataObject["gas"]);
      }

      if (newProducts.length === 0) {
        console.warn("No valid sensor data to save.");
        return;
      }

      // Save all instances of Product
      Product.insertMany(newProducts)
        .then(() => {
          console.log("Inserted data successfully into Product collection");
          io.emit("sensor", msg_str);

          // Save history data
          return History.findOneAndUpdate(
            { idProduct: newHistoryData.idProduct },
            { $push: { value: newHistoryData.value } },
            { upsert: true, new: true }
          );
        })
        .then(() => {
          console.log("Updated history data successfully");
        })
        .catch((err) => {
          console.error("Error inserting or updating data: ", err);
        });
    }

    if (topic == "notification_1") {
      const noti_str = message.toString();
      const dataObject = JSON.parse(noti_str);

      console.log("[Topic arrived] " + topic);
      console.log("[Noti arrived] " + noti_str);
      
      let newNoti = [];

      function createVisitor(idProd, title, message) {
        let randomId;

        return new Promise((resolve, reject) => {
          function generateRandomId() {
            return Math.floor(Math.random() * 1000000);
          }

          function checkAndCreate() {
            randomId = generateRandomId();

            Visitor.exists({ visitors: randomId })
              .then((exists) => {
                if (exists) {
                  checkAndCreate(); // Generate a new ID if it already exists
                } else {
                  resolve(
                    new Visitor({
                      visitors: randomId,
                      productId: idProd,
                      title: title,
                      message: message,
                      time: new Date(),
                    })
                  );
                }
              })
              .catch(reject);
          }

          checkAndCreate();
        });
      }

      function processNotifications() {
        if (!newNoti.length) {
          console.warn("No valid data to save.");
          return Promise.resolve(); // Resolve with no data to save
        }

        return Visitor.insertMany(newNoti)
          .then(() => {
            console.log(
              "Inserted data successfully into Notification collection"
            );
            io.emit("notification", noti_str);
          })
          .catch((err) => {
            console.error("Error inserting data: ", err);
            throw err; // Propagate the error to the next .catch
          });
      }

      createVisitor(
        dataObject["typeG"],
        dataObject["gas"],
        dataObject["warming"]
      )
        .then((visitor) => {
          newNoti.push(visitor);
          return processNotifications();
        })
        .catch((err) => {
          console.error("Error processing notifications: ", err);
        });
    }
  });
});
