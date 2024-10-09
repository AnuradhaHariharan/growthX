import express from "express"
import { adminUser,registerUser,getAllAdmins,updateAdminProjects,getAdminAllProjects } from "../controllers/adminController.js"

const adminRouter=express.Router();

adminRouter.post("/register",registerUser)
adminRouter.post("/login",adminUser)
adminRouter.get("/get",getAllAdmins)
adminRouter.post("/update",updateAdminProjects)
adminRouter.post("/getprojects",getAdminAllProjects)

export default adminRouter;