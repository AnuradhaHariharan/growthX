import mongoose from "mongoose";

export const connectDb= async ()=>{
    await mongoose.connect('mongodb+srv://studentassignment:13101999@cluster0.jfeh1.mongodb.net/food-del-copy').then(()=>console.log("db connected"))
}