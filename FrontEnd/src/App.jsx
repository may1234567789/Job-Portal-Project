import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Shared/home.jsx'
import Login from './components/Shared/login.jsx'
import SignUp from './components/Shared/signup.jsx'
import Job from './components/Shared/job.jsx'
import Browse from './components/Shared/browse.jsx'
import './App.css'
import Profile from './components/Shared/profile.jsx';
import JobDescription from './components/Shared/jobdescription.jsx';
import Companies from './components/Admin/companies.jsx';
import CreateCompany from './components/Admin/comapnycreate.jsx';
import CompanySetup from './components/Admin/CompanySetup.jsx';
import AdminJobs from './components/Admin/jobs.jsx';
import CreateJob from './components/Admin/jobcreate.jsx';


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
    "path": "/description/:id",
    "element": <JobDescription />
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
  },
  {
    "path":"/admin/companies",
    "element":<Companies/>
  },
  { "path":"/admin/company/create",
    "element":<CreateCompany/>
  },
  {"path":"/admin/companies/:id",
   "element":<CompanySetup/>
  },
  {"path":"/admin/jobs",
   "element":<AdminJobs/>
  },
  {"path":"/admin/job/create",
   "element":<CreateJob/>
  },
  {"path":"/admin/jobs/:id/edit",
   "element":<CreateJob/>
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
