// require('dotenv').config({path: './env})

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./.env"
})

connectDB()
.then(() => {
    const port = process.env.PORT || 8000;
    app.on("Error", (err) => {
        console.error("Error: ", err);
        throw err;
    });
    app.listen(port, () => {
        console.log(`Server is running at ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.error("ERROR is connecting to Express: ", error);
});













/* 1st approach with if-e
import express from "express";
const app = express()

;( async () => {
    try {
        await mongoose.connect(`${proccce.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("Express error: ", error);
            throw error;
        });

        app.listen(proccce.env.PORT, () => {
            console.log(`App is listening on ${proccce.env.PORT}`);
        });

    } catch (error) {
        console.error("ERROR is connecting to Mongoose", error);
        throw error;
    }
} ) ()
*/