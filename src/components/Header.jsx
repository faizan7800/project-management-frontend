import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo_mgmt_app.png'
const Header = () => {
  return (
    <nav className='flex my-1 justify-start items-center gap-4'>
        <div className='flex justify-between items-center '>
            <img src={logo} alt="logo" className='w-[200px] h-[100px] object-cover'/>
        </div>
       <div>
        <Link to={'/'} className='font-bold text-pink-500 hover:text-cyan-500 transition-all duration-500'>Home</Link>
       </div>
       <div>
        <Link to={'/clients'} className='font-bold text-pink-500 hover:text-cyan-500 transition-all duration-500'>Clients</Link>
       </div>
       <div>
        <Link to={'/projects'} className='font-bold text-pink-500 hover:text-cyan-500 transition-all duration-500'>Projects</Link>
       </div>
    </nav>
  )
}

export default Header