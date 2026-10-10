require("dotenv").config();
const app = require("./src/app");
const ConnectToDB = require("./src/config/db");

const port = process.env.PORT || process.env.S_PORT || 5000;

const connection = ConnectToDB();

// generateInterviewRreport({resume,selfDescription,jobDescription})

// ConnectToDB();
app.listen(port, async () => {

    await connection;
    console.log(`Server is listening on port ${port}`);
})

