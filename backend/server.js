import express from "express"
import cors from "cors"
import { connectDb } from "./Config/db.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import adminRouter from "./routes/adminRoute.js"
import projectRouter from "./routes/projectRoute.js"


//app config

const app = express()
const port = process.env.PORT||4000;

//middleware

app.use(express.json())
app.use(cors())

//db connection
connectDb();

//api endpoint
app.use("/api/user",userRouter)
app.use("/api/admin",adminRouter)
app.use("/api/projects",projectRouter)


app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log("Running")
})

