import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    const userData = {
      email: email,
      password: password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
    if (response.status === 200) {
      const data = response.data
      localStorage.setItem('token', data.token)
      navigate('/home')
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-7'>
      <div className='flex flex-col gap-10 align-center justify-center'>
        <img className='w-1/4 mx-auto' src="/Uber_logo_2018.png" alt="" />
        <form
          onSubmit={(e) => {
            submitHandler(e)
          }}
        >
          <h3 className='text-xl font-semibold tracking-tight mb-2'>
            What's your email?
          </h3>
          <input
            className='bg-[#eeeeee] rounded px-4 py-2 border border-gray-300 w-full mb-4 outline-none focus:border-black text-lg placeholder:text-base'
            type='email'
            placeholder='email@example.com'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            required />
          <h3 className='text-xl font-semibold tracking-tight mb-2'>
            What's your password?
          </h3>
          <input
            className='bg-[#eeeeee] rounded px-4 py-2 border border-gray-300 w-full mb-4 outline-none focus:border-black text-lg placeholder:text-base'
            type='password'
            placeholder='********'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required />
          <button
            type='submit'
            className='w-full flex gap-5 items-center justify-center text-lg font-semibold bg-black text-white py-3 rounded mt-2 tracking-widest'>
            Login User
            <img className='w-5' src="/src/assets/arrow.svg" />
          </button>
        </form>
      </div>
      <hr className="my-6 border-t-2 border-gray-300" />
      <div className='flex flex-col justify-center items-center'>
        <p className="text-md text-gray-500 font-medium">Not a User?</p>
        <Link to="/captain-login" className="w-full flex gap-3 items-center justify-center bg-gray-100 hover:bg-gray-200 text-black py-3 rounded mt-4 border border-gray-300 shadow transition">
          <p className="text-lg font-semibold">Login as a Captain
          </p>
          <img className='w-5 invert' src="/src/assets/arrow.svg" />
        </Link>
      </div>
      <hr className="my-6 border-t-2 border-gray-300" />
      <div className='flex flex-col justify-center items-center'>
        <p className="text-md text-gray-500 font-medium">New to Us?</p>
        <Link to="/user-signup" className="w-full flex gap-3 items-center justify-center bg-gray-100 hover:bg-gray-200 text-black py-3 rounded mt-4 border border-gray-300 shadow transition text-lg font-semibold">Sign Up as a User<img className='w-5 invert' src="/src/assets/arrow.svg" /></Link>
        <Link to='/captain-signup' className="w-full flex gap-3 items-center justify-center bg-gray-100 hover:bg-gray-200 text-black py-3 rounded mt-4 border border-gray-300 shadow transition text-lg font-semibold">Sign Up as a Captain<img className='w-5 invert' src="/src/assets/arrow.svg" />
        </Link>
      </div>

    </div>
  )
}

export default UserLogin