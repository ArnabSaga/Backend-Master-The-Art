// require('dotenv').config({path: './env})

import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./env"
})

connectDB();













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