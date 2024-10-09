import mongoose from 'mongoose';

// Define the project schema
const projectSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Project name
    email: { type: String, required: true }, // Email of the project creator
    assignment: { type: String, required: true }, // Assignment details
    adminName: { type: String, required: true }, // Admin's name
    comments: { type: String, required: false }, // Comments are optional
    createdAt: { type: Date, default: Date.now }, // Automatically set the creation date
}, { minimize: false }); // 'minimize: false' ensures that empty objects are saved

// Create or retrieve the project model
const projectModel = mongoose.models.projects || mongoose.model("projects", projectSchema);

// Export the model
export default projectModel;