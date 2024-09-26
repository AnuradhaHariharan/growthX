import mongoose from "mongoose";

export const connectDb= async ()=>{
    await mongoose.connect('mongodb+srv://anuradhahariharannov5:13101999@cluster0.bvu0u.mongodb.net/food-del').then(()=>console.log("db connected"))
}