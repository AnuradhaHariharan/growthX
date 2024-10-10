import userModel from "../models/userModel.js";
import projectModel from "../models/projectModel.js";
import { use } from "bcrypt/promises.js";


const createProject = async (req, res) => {
    try {
        // Access the required fields from the request body
        const { email, name, assignment, adminName, comments } = req.body;
        console.log('req.body', req.body);

        // Fetch the user data by their email to associate the project
        const userData = await userModel.findOne({ email });
        console.log('userData', userData);

        // Ensure the user exists
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Create a new project instance
        const newProject = new projectModel({
            name,
            email: userData.email, // Use the user's email from userData
            assignment,
            adminName,
            comments,
            projectStatus:'',
            createdAt: new Date(), // Optionally include created timestamp
        });

        console.log('newProject', newProject);

        // Save the new project to the database
        await newProject.save();

        // Push the new project's ID into the user's projectData array
        userData.projectData.push(newProject); // Store only the ID
        console.log('userData', userData)
        
        await userData.save();

        // Send a success response with the full project details
        res.status(201).json({ success: true, message: "Project created successfully", project: newProject });
    } catch (error) {
        console.error("Error creating project:", error.message);
        res.status(500).json({ success: false, message: "Error creating project", error: error.message }); // Return the error message in the response for debugging
    }
};
const getProjects = async (req, res) => {
    try {
        // Accessing email from req.body, assuming it's sent in the request
        const { email } = req.body;

        // Fetch the user data by their email
        let userData = await userModel.findOne({ email });

        // Ensure the user exists
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Retrieve the user's projects from the 'projectData' field
        const projectsData = await projectModel.find({ _id: { $in: userData.projectData } });

        // Check if there are no projects
        if (!projectsData || projectsData.length === 0) {
            return res.json({ success: true, message: "No projects to display" });
        }

        // Send the projects data in the response
        res.json({ success: true, projects: projectsData });
    } catch (error) {
        console.error("Error fetching projects data:", error);
        res.status(500).json({ success: false, message: "Error fetching projects data" });
    }
};
// Approve a project
const approveProject = async (req, res) => {
    try {
        const { projectId } = req.body;
        console.log("Project ID:", projectId);
        // Update project status to 'approved'
        const project = await projectModel.findByIdAndUpdate(
            projectId,
            { projectStatus: 'approved' },
            { new: true }
        );

        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        res.json({ success: true, message: "Project approved successfully", project });
    } catch (error) {
        console.error("Error approving project:", error);
        res.status(500).json({ success: false, message: "Error approving project" });
    }
};

// Reject a project
// Reject a project
const rejectProject = async (req, res) => {
    try {
        const { projectId } = req.body;

        // Update project status to 'rejected'
        const project = await projectModel.findByIdAndUpdate(
            projectId,
            { projectStatus: 'rejected' },
            { new: true }
        );

        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        res.json({ success: true, message: "Project rejected successfully", project });
    } catch (error) {
        console.error("Error rejecting project:", error);
        res.status(500).json({ success: false, message: "Error rejecting project" });
    }
};


export { getProjects ,createProject,approveProject,rejectProject};