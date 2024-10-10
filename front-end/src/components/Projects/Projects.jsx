import React, { useContext, useEffect, useState } from 'react';
import './Projects.css'; // Import your CSS file for styling
import { StoreContext } from '../../context/StoreContext'; // Import the context
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]); // State to hold projects
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error messages
  const { url, token, email } = useContext(StoreContext); // Access context values

  // Fetch projects from API
  const fetchProjects = async () => {
    setLoading(true);
    setError(null); // Reset error state before making the request

    try {
      const response = await axios.post(`${url}/api/projects/getprojects`, {
        email, // Pass email in the request body
      });

      // Log the API response for debugging
      console.log("API Response:", response.data);

      // Check if the response indicates success
      if (response.data.success) {
        setProjects(response.data.projects || []); // Set projects from response
      } else {
        setError(response.data.message); // Set error message
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(err.response?.data?.message || "Failed to fetch projects."); // Set a general error message
    } finally {
      setLoading(false); // Set loading to false after request
    }
  };

  useEffect(() => {
    // Fetch projects when token becomes available
    if (token) {
      fetchProjects(); // Fetch projects when token is available
    } else {
      setProjects([]); // Clear projects if token is not present
    }
  }, [token, email]); // Run effect when token or email changes

  // If token is not present, do not render the projects section
  if (!token) {
    return null; // or return a message like <p>Please log in to see your projects.</p>
  }

  return (
    <div className="projects-container" id='projects'>
      <h2 className="projects-heading">Submitted Assignments</h2>
      {loading && <p>Loading projects...</p>} {/* Show loading message */}
      {error && <p className="error-message">{error}</p>} {/* Show error message if any */}
      <div className="projects-grid">
        {Array.isArray(projects) && projects.length > 0 ? (
          projects.map((project) => (
            <div className="project-card" key={project._id}> {/* Assuming each project has a unique _id */}
              <h3>{project.name || 'Untitled Project'}</h3> {/* Use project name */}
              <p>{project.assignment || 'No description available.'}</p> {/* Use assignment as description */}
              <p><strong>Admin:</strong> {project.adminName}</p> {/* Display admin name */}
              <p><strong>Comments:</strong> {project.comments || 'No comments available.'}</p> {/* Display comments */}
              <div className="status-container">
                <h4 className="status-heading">Status of Assignment:</h4>
                <div
                  className={`status-badge ${project.projectStatus === 'Accepted' ? 'accepted' : project.projectStatus === 'Rejected' ? 'rejected' : ''}`}
                >
                  {project.projectStatus || 'No status available'}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No projects to display.</p> // Message when no projects are found
        )}
      </div>
    </div>
  );
};

export default Projects;
