import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './Home.css'
const Home = () => {
  const [projects, setProjects] = useState([]); // State to store the fetched projects
  const { url, email, token } = useContext(StoreContext); // Using email, token, and url from context
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if the token is present
    if (!token) {
      setError('Please log in or create an account.');
      setLoading(false);
      return;
    }

    // Fetch projects when the component mounts
    const fetchProjects = async () => {
      try {
       await axios.post(`${url}/api/admin/update`, { email });
       const response= await axios.post(`${url}/api/admin/getprojects`, { email })
        console.log(response)
        if (response.data.success) {
          setProjects(response.data.projects); // Assuming the API returns project data in 'projects'
        } else {
          setError('Failed to fetch projects');
        }
      } catch (err) {
        setError('Error fetching projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [email, url, token]);

  // Handle approve and reject buttons
  const handleApprove = (projectId) => {
    console.log('Approved project ID:', projectId);
    // Add your approve logic here (e.g., call an API)
  };

  const handleReject = (projectId) => {
    console.log('Rejected project ID:', projectId);
    // Add your reject logic here (e.g., call an API)
  };

  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="homepage">
      <h1>Admin Projects</h1>
      <div className="project-list">
        {projects?.length > 0 ? (
          projects.map((project) => (
            <div className="project-card" key={project._id}>
              <h3>{project.name}</h3>
              <p>{project.assignment}</p>
              <p>{project.comments}</p>
              <button className="approve-button" onClick={() => handleApprove(project._id)}>Approve</button>
<button className="reject-button" onClick={() => handleReject(project._id)}>Reject</button>
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
