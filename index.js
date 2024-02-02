const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const PORT = 3001;
require("dotenv").config();
// "mongodb+srv://lemairelliot:lzJnNUSTWDh9iEKl@cluster0.for30t5.mongodb.net/helloworld"
// Connect to MongoDB
mongoose.connect(process.env.TEST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  // Start your Express server or perform other actions here
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});


app.use(express.json());

// app.use((req, res, next) => {
//   const allowedOrigins = [
//     "http://localhost:3000",
//     "https://mymemo-client.vercel.app",
//   ];
//   const origin = req.headers.origin;

//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }

//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   next();
// });

var allowedOrigins = [
  "http://localhost:3000",
  "https://mymemo-client.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

// Solve cors error
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "https://mymemo-client.vercel.app"],
//     methods: ["POST", "GET", "PUT", "DELETE", "UPDATE"],
//   })
// );
// app.all("*", function (req, res, next) {
//   const origin = cors.includes(req.header("origin").toLowerCase())
//     ? req.headers.origin
//     : cors.apply;
//   res.header("Access-Control-Allow-Origin", origin);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use("/api/v1", require("./src/v1/routes"));

// -> localhost:3300/api/v1/register

app.listen(PORT, () => {
  console.log("local server is running");
});

module.exports = app;
