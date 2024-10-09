import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Home.css';
import { StoreContext } from '../../context/StoreContext';

const Home = () => {
  const { url, token, email } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    name: '',
    email: email || '', // Use the email from context
    assignment: '',
    adminName: '',
    comments: '',
  });
  
  const [adminList, setAdminList] = useState([]); // State to hold the admin names

  // Fetch admin names when the component mounts
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(`${url}/api/admin/get`); // Assuming your API endpoint is /api/admins
        setAdminList(response.data.admins); // Set the fetched admin list
      } catch (error) {
        console.error('Error fetching admin names:', error);
        alert('Failed to load admin names.');
      }
    };
    fetchAdmins();
  }, [url]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user is logged in by verifying the presence of the token
    if (!token) {
      alert('Please log in or sign up first.');
      return; // Prevent further execution if not logged in
    }

    try {
      const response = await axios.post(`${url}/api/projects/create`, formData);
      
      if (response.status === 200) {
        console.log('Assignment submitted successfully');
        // Reset form
        setFormData({
          name: '',
          email: email || '', // Reset to context email
          assignment: '',
          adminName: '',
          comments: '',
        });
      } else {
        console.error('Failed to submit assignment');
        alert('Failed to submit your assignment. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting assignment:', error);
      
      // Check for specific error conditions
      if ( error.response.status === 500) {
        alert('You can only submit your assignment once.');
      } 
    }
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <h2>Submit Your Assignment</h2>

        <div className='form-group'>
          <label htmlFor='name'>Name:</label>
          <input 
            type='text' 
            id='name' 
            name='name'
            value={formData.name} 
            onChange={handleChange} 
            required 
            placeholder="Enter your full name"
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input 
            type='email' 
            id='email' 
            name='email'
            value={formData.email} 
            onChange={handleChange} 
            required 
            placeholder="Enter your email"
            readOnly // Make the email field read-only
          />
        </div>

        <div className='form-group'>
          <label htmlFor='assignment'>Assignment:</label>
          <textarea 
            id='assignment' 
            name='assignment'
            value={formData.assignment} 
            onChange={handleChange} 
            required 
            rows="4"
            placeholder="Enter your assignment here..."
          />
        </div>

        <div className='form-group'>
          <label htmlFor='adminName'>Select Admin:</label>
          <select 
            id='adminName' 
            name='adminName'
            value={formData.adminName} 
            onChange={handleChange} 
            required
          >
            <option value='' disabled>Select an Admin</option>
            {/* Dynamically populate the dropdown with admin names */}
            {adminList.length > 0 ? (
              adminList.map((admin) => (
                <option key={admin._id} value={admin.name}>{admin.name}</option>
              ))
            ) : (
              <option value='' disabled>Loading admins...</option>
            )}
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='comments'>Additional Comments:</label>
          <textarea
            id='comments'
            name='comments'
            value={formData.comments}
            onChange={handleChange}
            rows="4"
            placeholder="Enter any additional details..."
          />
        </div>

        <button type='submit' className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default Home;