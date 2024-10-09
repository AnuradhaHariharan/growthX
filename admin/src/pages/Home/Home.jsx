import React, { useEffect, useState } from 'react';
import './Home.css';

const AdminPanel = ({ adminName }) => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch(`/api/assignments?admin=${adminName}`);  // Adjust endpoint as needed
        const data = await response.json();
        setAssignments(data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchAssignments();
  }, [adminName]);

  const handleAccept = async (id) => {
    // Logic to accept the assignment
    console.log(`Accepted assignment ID: ${id}`);
    // Make a request to the backend to update the assignment status if necessary
  };

  const handleReject = async (id) => {
    // Logic to reject the assignment
    console.log(`Rejected assignment ID: ${id}`);
    // Make a request to the backend to update the assignment status if necessary
  };

  return (
    <div className='admin-panel'>
      <h2>Assignments for {adminName}</h2>
      {assignments.length === 0 ? (
        <p>No assignments submitted yet.</p>
      ) : (
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment.id}>
              <h3>{assignment.name}</h3>
              <p>Email: {assignment.email}</p>
              <p>Assignment: {assignment.assignment}</p>
              <p>Comments: {assignment.comments}</p>
              <button onClick={() => handleAccept(assignment.id)}>Accept</button>
              <button onClick={() => handleReject(assignment.id)}>Reject</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPanel;