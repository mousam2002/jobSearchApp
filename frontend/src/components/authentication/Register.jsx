import React, { useState } from 'react'
import Navbar from '../components_lite/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_ENDPOINT } from '@/utils/data.js'

function Register() {
  const [input, setInput] = useState({
    fullname:"",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    file: ""
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    setInput({...input, file: e.target.files?.[0]});
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials:true,
      });
      if (res.data.success) {
        navigate("/login")
        toast.success(res.data.message)
      }
      
    } catch (error) {
      console.log(error);

      const errorMessage = error.response ? error.response.data.message : "An unexpected error occurred";
      toast.error(errorMessage);

    }

  }

  return (
    <div>
      <Navbar />

      <div className=' flex items-center justify-center max-w-200 mx-auto'>
        <form onSubmit={submitHandler} className=' w-1/2 border border-gray-300 shadow-sm rounded-md p-4 my-8'>
          <h1 className=' font-bold text-xl mb-5 text-center'>Register</h1>
          <div className=' my-2'>
            <Label htmlFor="name">Name</Label>
            <Input 
              type="name" 
              placeholder="Enter name" 
              className=" mt-2"
              value={input.fullname} 
              name="fullname"
              onChange={changeEventHandler} />
          </div>
          <div className=' my-2'>
            <Label htmlFor="email">Email</Label>
            <Input 
              type="email" 
              placeholder="Enter email" 
              className=" mt-2"
              value={input.email} 
              name="email"
              onChange={changeEventHandler}             />
          </div>
          <div className=' my-2'>
            <Label htmlFor="phonenumber">Phone Number</Label>
            <Input 
              type="text" 
              placeholder="Enter phone number" 
              className=" mt-2"
              value={input.phoneNumber} 
              name="phoneNumber"
              onChange={changeEventHandler}             />
          </div>
          <div className=' my-2'>
            <Label htmlFor="password">Password</Label>
            <Input 
              type="password" 
              placeholder="Enter password" 
              className=" mt-2"
              value={input.password} 
              name="password"
              onChange={changeEventHandler}              />
          </div>
          <div className=' '>
            <Label htmlFor="role">Role</Label>
            <RadioGroup 
              defaultValue="Student" 
              className=" flex items-center gap-4 my-3"
              value={input.role}
              onValueChange={(value) =>
                setInput({...input, role: value})
              } 
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value="Student" 
                  id="Student"
                  checked={input.role === "Student"} 
                  // name="role"
                  // onChange={changeEventHandler}
                />

                <Label htmlFor="Student">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem 
                  value="Recruiter" 
                  id="Recruiter"
                  checked={input.role === "Recruiter"} 
                  // name="role"
                  // onChange={changeEventHandler}                  
                />
                <Label htmlFor="Recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <div className=' my-2'>
            <Label>Profile Photo</Label>
            <Input 
              type="file" 
              accept="image/*" 
              className=" cursor-pointer mt-2"
              // value={input.file} 
              // name="file"
              onChange={changeFileHandler}              />
          </div>

          <Button type="submit" className="bg-[#F83002] hover:bg-[#ff481f] text-white block w-full my-4">Register</Button>

          <p className=' text-gray-500 text-center text-sm my-2'>
            Already have an account? 
            <Link to="/login" className=' hover:text-[#F83002]' > Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register
