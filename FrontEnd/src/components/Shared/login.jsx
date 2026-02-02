import React, { useState } from 'react'
import Navbar from './navbar'
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/Redux/authslice'
import './css/signup.css'

const Login = () => {

  const { Loading } = useSelector(store => store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true,
        });

      console.log("login response:", res);

      const ok = res?.data?.success || res?.data?.sucess;

      if (ok) {
        console.log('login successful, navigating to /');
        navigate("/", { replace: true });
        toast.success(res.data.message || "Logged in");
      } else {
        const msg = res?.data?.message || "Login failed";
        toast.error(msg);
      }

    } catch (error) {
      console.log(error);
      const msg = error?.response?.data?.message || error?.message || "An error occurred";
      toast.error(msg);
    } finally {
      dispatch(setLoading(false))
    }
  }

  console.log(input);

  return (
    <div>
      <Navbar />

      <form onSubmit={submitHandler}>
        <div className="signup-form">
          <h1>Log In</h1>

          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your email"
            />

            <FieldLabel>Password</FieldLabel>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
            />

            {/* RADIO BUTTONS */}
            <FieldLabel>Role</FieldLabel>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                />
                Student
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={input.role === "admin"}
                  onChange={changeEventHandler}
                />
                Admin
              </label>
            </div>
            {
              Loading ? <Button>Please Wait<Loader2 className='mr-2 h-4 w-4 animate-spin'></Loader2></Button> : <Button type="submit">Log In</Button>
            }
            
          </Field>

          <span>
            Don't have account? <Link to="/signup">Register Now</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
