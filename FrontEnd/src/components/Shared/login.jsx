import React, { useState } from 'react'
import Navbar from './navbar'
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import './css/signup.css'


function Login() {

  const navigate = useNavigate();

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
      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        input,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }

    } catch (error) {
      console.log(error);
    }
  };

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

            <Button type="submit">Log In</Button>
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
