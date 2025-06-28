import React from 'react'
import { Link } from 'react-router-dom'

const TopBar = ({ link_profile, link_icon }) => {
    return (
        <div className='flex items-center justify-between px-7 py-5 absolute top-0 w-screen z-10'>
            <Link to={link_icon} className='h-fit w-fit'><img className='w-[55px]' src="/Uber_logo_2018.png" alt="" /></Link>
            <Link to={link_profile} className='h-fit w-fit'><img src='/src/assets/user.svg' className='w-5' alt="" /></Link>
        </div>
    )
}

export default TopBar