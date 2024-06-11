import React from 'react'
import {FaExclamationTriangle} from 'react-icons/fa'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <div>

        <div className='my-4 flex flex-col justify-center items-center gap-6'>
        <FaExclamationTriangle className='w-full text-8xl text-red-600'/>
        <p className='text-2xl text-center'>Sorry, This page is not found </p>
        <div>
        <Link to={'/'} className='text-xl text-white bg-red-600 p-3 rounded-lg '>Go Back</Link> 
        </div>
        </div>
    </div>
  )
}

export default NotFound