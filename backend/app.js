const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

// middlewares
const { jsonParser, urlencodedParser } = require("./src/middlewares/bodyParser");
const errorHandler = require("./src/middlewares/errorHandler");
const notFound = require("./src/middlewares/notFoundMiddleware");

// routes
const authRoutes  = require("./src/routes/authRoutes");
const bookRoutes  = require("./src/routes/bookRoutes");
const returnRoutes = require("./src/routes/returnRoutes");
//const userRoutes = require("./routes/userRoutes");

// Body Parsers
app.use(jsonParser);       
app.use(urlencodedParser); 

// allow requests from the React frontend
app.use(
  cors({
    origin:  "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.send("Library Management System backend is running");
});



// Auth  →  /api/v1/auth/register
//          /api/v1/auth/login
//          /api/v1/auth/refresh
app.use("/api/v1/auth", authRoutes);

// Books →  /api/v1/books
//          /api/v1/books/:id
app.use("/api/v1/books", bookRoutes);

// Issues → /api/v1/issues
//          /api/v1/issues/:id/return
app.use("/api/v1/return", returnRoutes);

//to get the user names
//           /api/v1/users
//app.use("/api/v1/users", userRoutes);

// 5. 404 Handler

app.use(notFound);

// 6. Global Error Handler
app.use(errorHandler);

module.exports = app;