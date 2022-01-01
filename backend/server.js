const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// handling uncaught Exception
process.on("uncaughtException", () => {
    console.log(`Error ${err.message}`);
    console.log(`Sutting down the server due to uncaught Exception`);
    process.exit(1);
});

// config
dotenv.config({ path: "backend/config/config.env" });

// connection database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error ${err.message}`);
    console.log(`Shutting down the server due to uphandled Promiss Rejection`);

    server.close(() => {
        process.exit(1);
    });
});
