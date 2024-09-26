import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add food item

const addFood= async (req,response)=>{
  let image_filename=`${req.file.filename}`;

  const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
  })
  try{
    await food.save();
    response.json({success:true,message:"Food added"})
  }catch(error){
    console.log(error)
    response.json({success:false,message:"Error adding food"})
  }
}

// all food list
const listFood= async (req,response)=>{
    try {
        const foods=await foodModel.find({});
        response.json({success:true,data:foods})
    } catch (error) {
        console.log("error")
        response.json({success:false,mesage:"error"})
    }
}

//remove food item

const removeFood= async (req,response)=>{
  try {
    const food=await foodModel.findById(req.body.id);
    fs.unlink(`uploads/{food.image}`,()=>{})

    await foodModel.findByIdAndDelete(req.body.id);
    response.json({success:true,message:"Food Removed"})
  } catch (error) {
    response.json({success:false,message:"Error"});
  }
}
export {addFood,listFood,removeFood}
