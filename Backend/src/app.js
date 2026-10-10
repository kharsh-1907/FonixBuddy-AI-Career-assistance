const express = require("express");
const mongoose = require('mongoose')
const cors = require("cors")
const route = require("./routes/auth")
const interview_route = require("./routes/interview_routes")
const cookieParser = require("cookie-parser")
const resume_route = require("./routes/resume_routes")

const app = express();

// API/MongoDb faliure!
app.get("/api/health", (req, res) => {
    const dbConnected = mongoose.connection.readyState === 1;

    res.status(dbConnected ? 200 : 503).json({
        backend: "running",
        database: dbConnected ? "connected" : "disconnected"
    });
});

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin:  process.env.FRONTEND_URL||"http://localhost:5173",
        credentials: true
    }))


app.use("/api/auth", route)
app.use("/api/interview", interview_route)
app.use("/api/resume", resume_route);

module.exports = app;