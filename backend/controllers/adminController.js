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

  const updateAndGetAdminProjects = async (req, res) => {
    const { email } = req.body; // Get the admin's email from the request body

    try {
        // Fetch all projects
        const projects = await projectModel.find();
        console.log("All Projects:", projects); // Debugging to ensure projects are fetched

        // Find the admin by email
        const admin = await adminModel.findOne({ email });
        
        // Check if the admin exists
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }

        console.log("Admin found:", admin.name); // Debugging to ensure admin is fetched

        // Filter projects that match the admin's name (case-insensitive comparison)
        const matchedProjects = projects.filter(
            project => project.adminName === admin.name
        );

        console.log("Matched Projects:", matchedProjects); // Debugging to ensure project matching is correct

        if (matchedProjects.length > 0) {
            // Filter out projects that are already in the admin's projectData
            const newProjects = matchedProjects.filter(
                newProject => !admin.projectData.some(existingProject => existingProject._id.equals(newProject._id))
            );

            if (newProjects.length > 0) {
                // Push the new project objects to the admin's projectData array
                admin.projectData.push(...newProjects);

                // Save the updated admin document
                await admin.save()
                    .then(() => console.log("Admin document saved successfully"))
                    .catch(error => console.error("Error saving admin:", error));
            } else {
                console.log("No new projects to add."); // Debugging if no new projects
            }
        }

        // Assuming the projects are stored in the admin object
        const allProjects = admin.projectData; // Adjust this based on your actual schema

        // Return the projects along with a success message
        return res.status(200).json({ success: true, message: "Projects updated and retrieved successfully", projects: allProjects });
        
    } catch (error) {
        console.error("Error updating and retrieving admin projects:", error);
        return res.status(500).json({ success: false, message: "Failed to update and retrieve admin projects" });
    }
};

 export { adminUser, registerUser, getAllAdmins ,updateAndGetAdminProjects};