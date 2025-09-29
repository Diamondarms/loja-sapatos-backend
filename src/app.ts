import express from "express"
import router from "./routes";
import dbConnect from "./db"

async function createApp(){
    const app = express()

    await dbConnect();
    
    app.use(express.json());
    app.use("/", router)

    return app;
}

export default createApp;