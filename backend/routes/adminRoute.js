import express from "express"
import { adminUser,registerUser,getAllAdmins,updateAndGetAdminProjects } from "../controllers/adminController.js"

const adminRouter=express.Router();

adminRouter.post("/register",registerUser)
adminRouter.post("/login",adminUser)
adminRouter.get("/get",getAllAdmins)
adminRouter.post("/getproject",updateAndGetAdminProjects)


export default adminRouter;