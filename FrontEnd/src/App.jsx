import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Shared/home.jsx'
import Login from './components/Shared/login.jsx'
import SignUp from './components/Shared/signup.jsx' 
import Job from './components/Shared/job.jsx'
import Browse from './components/Shared/browse.jsx'
import './App.css'
import Profile from './components/Shared/profile.jsx';
import JobDescription from './components/Shared/jobdescription.jsx';

const appRouter = createBrowserRouter([
  {
    "path": "/",
    "element": <Home />
  },
  {
    "path": "/login",
    "element": <Login />
  },
  {
    "path": "/signup",
    "element": <SignUp />
  },
  {
    "path": "/job",
    "element": <Job />
  },
  {
    "path": "/browse",
    "element": <Browse />
  },
  {
    "path": "/profile",
    "element": <Profile />
  },
  {
    "path": "/description/:id",
    "element": <JobDescription />
  }
]);

function App() {

  return (
    <>
      <RouterProvider router={appRouter} />
      
    </>
  )
}

export default App
