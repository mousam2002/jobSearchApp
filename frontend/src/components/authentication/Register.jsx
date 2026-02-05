import React from 'react'
import Navbar from '../components_lite/Navbar'
import { Label } from '../ui/label'

function Register() {
  return (
    <div>
      <Navbar />

      <div>
        <form action="">
          <h1 className=' font-bold text-xl mb-5'>Register</h1>
          <Label htmlFor="email">Your email address</Label>
        </form>
      </div>
    </div>
  )
}

export default Register
