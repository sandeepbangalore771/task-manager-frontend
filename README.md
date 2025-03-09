# Task Manager Application

## Table of Contents
- [Project Overview](#project-overview)
- [Setup and Installation](#setup-and-installation)
- [Running the Project](#running-the-project)
- [Assumptions](#assumptions)
- [Technologies and Libraries Used](#technologies-and-libraries-used)
- [Challenges Faced](#challenges-faced)

## Project Overview
The **Task Manager Application** is a full-stack web application that allows users to create, update, delete, and manage tasks efficiently. The frontend is built using React.js, while the backend is powered by Node.js, Express.js, and MongoDB.

## Setup and Installation
### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v14 or later)
- **MongoDB** (local or MongoDB Atlas)
- **Git**

### Clone the Repository

git clone https://github.com/yourusername/task-manager.git
cd task-manager


### Backend Setup
1. Navigate to the backend folder:
   cd server
  
2. Install dependencies:
  
   npm install
   
3. Create a `.env` file in the `server` directory and configure it with the following environment variables:
   
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
 
4. Start the backend server:
   
   npm start
   

### Frontend Setup
1. Navigate to the frontend folder:
  
   cd ../client
   
2. Install dependencies:
  
   npm install
  
3. Start the React development server:
   
   npm start
   

## Running the Project
Once both frontend and backend servers are running, open your browser and go to:

http://localhost:3000


## Assumptions
- Each user can only see their own tasks.
- User authentication is implemented using JWT.
- Tasks have fields like **title, category, status (pending/completed)**.
- The API expects authorization headers for protected routes.

## Technologies and Libraries Used
### Frontend:
- React.js
- React Router
- Axios (for API calls)
- fortawesome Icons (for UI icons)
- Bootstrap (for styling)

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JWT (for authentication)
- Bcrypt.js (for password hashing)

## Challenges Faced
### 1. **Handling Authentication and Authorization**
   - Issue: Ensuring only authenticated users can access their tasks.
   - Solution: Implemented JWT-based authentication and middleware to protect routes.

### 2. **Filtering and Searching Tasks**
   - Issue: Implementing dynamic filtering based on category and status.
   - Solution: Used React state and filter functions to dynamically update task lists.

### 3. **Connecting Frontend with Backend**
   - Issue: Handling API request errors and token-based authentication.
   - Solution: Used Axios with error handling and stored tokens securely in local storage.
