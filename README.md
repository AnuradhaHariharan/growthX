## Student Assignment Submission Portal
This is a web-based application for students to submit their assignments, built with React for the front end, Express.js for the backend, and an Admin Panel for reviewing, accepting, or rejecting assignments.

### Features
Student Portal: Students can create or login to their account and submit their assignments.
Admin Panel: Admins can review submitted assignments, accept or reject them.
Backend: Manages student data, assignment submissions, and admin actions.

### Project Structure
The project contains three main components:

Frontend: The student submission portal, built with React.
Admin Panel: The admin interface to review assignments, also built with React.
Backend: The server side of the application, built with Express.js.
Database: I have used MongoDB. Following are the 3 schemas that I have created:
<img width="1190" alt="Screenshot 2024-10-10 at 8 40 26 PM" src="https://github.com/user-attachments/assets/98f2359c-b9ee-4a36-b4af-6d8cad528f10">
<img width="1190" alt="Screenshot 2024-10-10 at 8 40 10 PM" src="https://github.com/user-attachments/assets/260b0b53-aeb0-4290-91c9-1cd078d50e17">
<img width="1190" alt="Screenshot 2024-10-10 at 8 39 50 PM" src="https://github.com/user-attachments/assets/44726bcc-ccf9-487b-8011-a2f4cf542324">


### How to get the project running locally
Prerequisites
Make sure you have the following installed:

Node.js
npm (Node Package Manager)
Installation

Step 1: Clone the repository
bash
Copy code
git clone https://github.com/AnuradhaHariharan/growthX.git

Step 2: Install dependencies for each component
1. Frontend (Student Portal)
bash
Copy code
cd front-end
npm install

2. Backend 
Copy code
cd backend
npm install

2. Admin Panel
bash
Copy code
cd admin
npm install

Running the Application
1. Frontend (Student Portal) and Admin Panel
To run both the student portal and admin panel in development mode, use:

bash
Copy code
cd front-end
npm run dev

bash
Copy code
cd admin
npm run dev

2. Backend (Express API)
To start the backend server:

bash
Copy code
cd backend
npm run server
The backend will run at http://localhost:4000.

Note:
The frontend will be served on http://localhost:3000.
The admin panel will be served on http://localhost:3001.

### Deploy links (for Frontend)
https://growthx-1-admin.onrender.com/ - ADMIN PANEL
https://growthx-1-portal-student.onrender.com/ - STUDENT PANEL
