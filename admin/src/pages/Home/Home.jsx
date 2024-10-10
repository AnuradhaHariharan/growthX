import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './Home.css';

const Home = () => {
  const [projects, setProjects] = useState([]); // State to store the fetched projects
  const { url, email, token } = useContext(StoreContext); // Using email, token, and url from context
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    try {
      const response = await axios.post(`${url}/api/admin/getproject`, { email });
      console.log(response);

      if (response.data.success) {
        const newProjects = response.data.projects;

        // Filter out duplicate projects based on their _id
        setProjects((prevProjects) => {
          const updatedProjects = newProjects.filter(
            (newProject) => !prevProjects.some((project) => project._id === newProject._id)
          );
          return [...prevProjects, ...updatedProjects];
        });
      } else {
        setError('Failed to fetch projects');
      }
    } catch (err) {
      setError('No projects to display');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setError('Please log in or create an account.');
      setLoading(false);
      setProjects([]);
      return;
    }

    if (token) {
      setError('');
      fetchProjects();
    }
  }, [email, url, token]);

  // Handle approve and reject buttons
  const handleApprove = async (projectId) => {
    try {
      const response = await axios.post(`${url}/api/projects/approveproject`, { projectId });
      if (response.data.success) {
        // Update the project status in the state immediately
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project._id === projectId ? { ...project, projectStatus: 'approved' } : project
          )
        );
      } else {
        setError('Failed to approve project');
      }
    } catch (err) {
      setError('Error approving project');
    }
  };

  const handleReject = async (projectId) => {
    try {
      const response = await axios.post(`${url}/api/projects/rejectproject`, { projectId });
      if (response.data.success) {
        // Update the project status in the state immediately
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project._id === projectId ? { ...project, projectStatus: 'rejected' } : project
          )
        );
      } else {
        setError('Failed to reject project');
      }
    } catch (err) {
      setError('Error rejecting project');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  useEffect(() => {
    // Store projects in local storage if available
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }
  }, []);

  useEffect(() => {
    // Update local storage whenever projects change
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="homepage">
      <h1>Projects for Review</h1>
      <div className="project-list">
        {projects?.length > 0 ? (
          projects.map((project) => (
            <div className="project-card" key={project._id}>
              <h3 className='name'>{project.name}</h3>
              <p className='assignment'>Assignment: {project.assignment}</p>
              <p>Comments: {project.comments}</p>
              <p className='date'>Date: {formatDate(project.createdAt)}</p>
              <p className={`status ${project.projectStatus}`}>Status: {project.projectStatus}</p>

              {/* Always render the buttons */}
              <button
                className="approve-button"
                onClick={() => handleApprove(project._id)}
                disabled={project.projectStatus === 'approved'}
              >
                Approve
              </button>
              <button
                className="reject-button"
                onClick={() => handleReject(project._id)}
                disabled={project.projectStatus === 'rejected'}
              >
                Reject
              </button>
            </div>
          ))
        ) : (
          <p>No projects found</p>
        )}
      </div>
    </div>
  );
};

export default Home;