import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link } from 'react-router-dom';
 
function Navbar() {
  const user = false;
  return (
    <div className=' bg-white'>
      <div className=' flex items-center justify-between mx-auto max-w-7xl h-16 px-16'>
        <div>
          <h1 className=' text-2xl font-bold'>
            Job <span className=' text-[#F83002]'>Portal</span>
          </h1>
        </div>
  
        <div className=' flex items-center gap-10'>
          <ul className=' flex font-medium items-center gap-6'>
            <li>Home</li>
            <li>browse</li>
            <li>Job</li>
          </ul>

          {
            !user ? (
              <div className=' flex items-center gap-2'>
                <Link to={"/login"}>
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to={"/register"}>
                  <Button className="bg-[#F83002] hover:bg-[#ff481f] text-white">Register</Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    {/* <AvatarFallback>CN</AvatarFallback> */}
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-2 space-y-2" >
                  <div className=' flex items-center gap-3 space-y-2'>
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>  
                    <div>
                      <h3 className=' font-medium'>Mousam Tamrakar</h3>
                      <p className=' text-sm text-justify text-muted-foreground'>Full-stack developer skilled in React, Node.js, 
                        and MongoDB. 
                      </p>
                    </div>
                  </div>
                  <div className=' flex flex-col text-gray-600'>
                    <div className=' flex w-fit items-center gap-2 cursor-pointer'>
                      <User2></User2>
                      <Button variant="link">View Profile</Button>
                    </div>
                    <div className=' flex w-fit items-center gap-2 cursor-pointer'>
                      <LogOut></LogOut>
                      <Button variant="link">Logout</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover> 
            ) 
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar;