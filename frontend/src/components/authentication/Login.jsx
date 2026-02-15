import React, { useState } from 'react'
import Navbar from '../components_lite/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_ENDPOINT } from '@/utils/data.js'

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: ""
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]: e.target.value });
  }

  // const changeFileHandler = (e) => {
  //   setInput({...input, file: e.target.files?.[0]});
  // }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);

    const formData = new FormData();
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);

    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials:true,
      });
      if (res.data.success) {
        navigate("/")
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
          <h1 className=' font-bold text-xl mb-5 text-center'>Login</h1>
          <div className=' my-2'>
            <Label htmlFor="email">Email</Label>
            <Input 
              type="email" 
              placeholder="Enter email" 
              className=" mt-2"
              value={input.email} 
              name="email"
              onChange={changeEventHandler}              
            />
          </div>
          <div className=' my-2'>
            <Label htmlFor="password">Password</Label>
            <Input 
              type="password" 
              placeholder="Enter password" 
              className=" mt-2"
              value={input.password} 
              name="password"
              onChange={changeEventHandler}              
            />
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
                  type="radio"
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

          <Button type="submit" className="bg-[#F83002] hover:bg-[#ff481f] text-white block w-full my-4">Login</Button>
        
          {/* No account then register */}
          <p className=' text-gray-500 text-center text-sm my-2'>
            Create a new account? 
            <Link to="/register" className=' hover:text-[#F83002]' > Register</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
