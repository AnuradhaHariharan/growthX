import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import projectModel from "../models/projectModel.js";

//login user
const adminUser= async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user= await adminModel.findOne({email})
    if(!user){
        return res.json({success:false,message:"User does not exists"})
    }
    const isMatch =await bcrypt.compare(password,user.password)

    if(!isMatch){
     return res.json({success:false,message:"Invalid credentials"})
    }
    const token =createToken(user._id);
    res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser = async (req,res)=>{
    const {name,password,email}=req.body;
    try {
        // checking if user already exists
        const exists=await adminModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }
        //validating email format n strong password
        if(!validator.isEmail(email)){
        return res.json({success:false,message:"Please enter valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Please enter strong password"})
        }
        // hashing user password
        const salt=await bcrypt.genSalt(10) //range from 5 to 15
        const hashedPassword= await bcrypt.hash(password,salt)

        const newUser =new adminModel({
            name:name,
            email:email,
            password:hashedPassword
        })

       const user= await newUser.save()
       const token =createToken(user._id)
       res.json({success:true,token})


    } catch (error) {
        console.log(error);
        res.json({success:false,message:error})
    }
}
// Get all admin users
const getAllAdmins = async (req, res) => {
    try {
      const admins = await adminModel.find({}, '-password'); // Exclude the password from the response
      res.json({ success: true, admins });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Failed to fetch admin users" });
    }
  };

  const updateAdminProjects = async (req, res) => {
    const { email } = req.body; // Get the admin's email from the request body
    try {
        // Fetch all projects
        const projects = await projectModel.find();

        // Find the admin by email
        const admin = await adminModel.findOne({ email });

        // Check if the admin exists
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }

        // Filter projects that match the admin's name and push them to admin's projectData
        const matchedProjects = projects.filter(project => project.admin === admin.name);
        
        if (matchedProjects.length > 0) {
            // Push matched projects to admin's projectData array
            admin.projectData.push(...matchedProjects.map(project => project._id)); // Store only the project IDs
            await admin.save(); // Save the updated admin document
        }

        return res.status(200).json({ success: true, message: "Projects updated successfully" });
    } catch (error) {
        console.error("Error updating admin projects:", error);
        return res.status(500).json({ success: false, message: "Failed to update admin projects" });
    }
  };
  
 export { adminUser, registerUser, getAllAdmins ,updateAdminProjects};