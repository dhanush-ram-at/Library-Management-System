const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

// middlewares
const { jsonParser, urlencodedParser } = require("./middlewares/bodyParser");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFoundMiddleware");

// routes
const authRoutes  = require("./routes/authRoutes");
const bookRoutes  = require("./routes/bookRoutes");
const issueRoutes = require("./routes/issueRoutes");
const userRoutes = require("./routes/userRoutes");

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
app.use("/api/v1/issues", issueRoutes);

//to get the user names
//           /api/v1/users
app.use("/api/v1/users", userRoutes);

// 5. 404 Handler

app.use(notFound);

// 6. Global Error Handler
app.use(errorHandler);

module.exports = app;