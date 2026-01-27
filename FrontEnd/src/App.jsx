import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Shared/home.jsx'
import Login from './components/Shared/login.jsx'
import SignUp from './components/Shared/signup.jsx' 
import Navbar from './components/Shared/navbar.jsx'
import './App.css'

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
