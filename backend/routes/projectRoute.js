import express from "express"
import { getProjects ,createProject,approveProject,rejectProject} from "../controllers/projectController.js"

const projectRouter=express.Router();

projectRouter.post("/getprojects",getProjects)
projectRouter.post("/create",createProject)
projectRouter.post("/approveproject",approveProject)
projectRouter.post("/rejectproject",rejectProject)

export default projectRouter;