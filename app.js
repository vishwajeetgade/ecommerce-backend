require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const errorMiddleware = require("./middleware/error");

const app = express();

// uncaught Exception handler
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaughtException`);
  process.exit(1);
});

app.use(express.json());

app.use("/api/v1/products", require("./routes/productRoute"));

// Middleware for error
app.use(errorMiddleware);

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log(`Mongodb connected with server: ${res.connection.host}`);
    app.listen(process.env.PORT || 8080, () => {
      console.log(`server is running at PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
