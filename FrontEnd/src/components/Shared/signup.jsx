import React from 'react'
import Navbar from './navbar'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import './css/signup.css'

function signUp() {
  return (
    <div>
      <Navbar />
      <form>
        <div className="signup-form">
          <h1 className=''>Sign Up</h1>
          <Field>
            <FieldLabel >Name</FieldLabel>
            <Input
              id="input-field-username"
              type="text"
              placeholder="Enter your username"
            />
            <FieldLabel >Email</FieldLabel>
            <Input
              type="email"
              placeholder="Enter your email"
            />
            <FieldLabel >Password</FieldLabel>
            <Input
              type="password"
              placeholder="Enter your password"
            />
            <FieldLabel>Picture</FieldLabel>
            <Input id="picture" type="file" />

            <RadioGroup defaultValue="comfortable" className="w-fit">
              <FieldLabel >Role</FieldLabel>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2">Student</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="compact" id="r3" />
              <Label htmlFor="r3">Admin</Label>
            </div>
          </RadioGroup>
        </Field>
    </div>
      </form >
    </div>
  )
}

export default signUp