import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainSignUp = () => {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [vehicleColour, setVehicleColour] = useState("")
  const [numberPlate, setNumberPlate] = useState("")
  const [vehicleCapacity, setVehicleCapacity] = useState("")
  const [vehicleType, setVehicleType] = useState("")

  const navigate = useNavigate()
  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColour,
        plate: numberPlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
    if (response.status === 201) {
      const data = response.data
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setFirstname('')
    setLastname('')
    setEmail('')
    setPassword('')
    setVehicleColour('')
    setNumberPlate('')
    setVehicleCapacity('')
    setVehicleType('')
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
          <h2 className='text-2xl font-semibold tracking-tight mb-5'>Captain Details</h2>
          <h3 className='text-xl font-semibold tracking-tight mb-2'>What's your Name?</h3>
          <div className="flex gap-5">
            <div className="flex flex-col gap-2 w-1/2">
              <input
                className='bg-[#eeeeee] rounded px-4 py-2 border border-gray-300 w-full mb-4 outline-none focus:border-black text-lg placeholder:text-base' type="text"
                placeholder='First name'
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value)
                }}
                required
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <input
                className='bg-[#eeeeee] rounded px-4 py-2 border border-gray-300 w-full mb-4 outline-none focus:border-black text-lg placeholder:text-base'
                type="text"
                placeholder='Last name'
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value)
                }}
              />
            </div>
          </div>
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
          <hr className="my-6 border-t-2 border-gray-300" />
          <h2 className='text-2xl font-semibold tracking-tight mb-5'>Your Vehicle Details</h2>
          <div className="flex gap-5">
            <div className="flex flex-col gap-2 w-1/2">
              <h3 className='text-xl font-semibold tracking-tight'>Vehicle Colour</h3>
              <input
                className='bg-[#eeeeee] rounded px-4 py-2 border border-gray-300 w-full mb-4 outline-none focus:border-black text-lg placeholder:text-base' type="text"
                placeholder='Colour'
                value={vehicleColour}
                onChange={(e) => {
                  setVehicleColour(e.target.value)
                }}
                required
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <h3 className='text-xl font-semibold tracking-tight'>Number Plate</h3>
              <input
                className='bg-[#eeeeee] rounded px-4 py-2 border border-gray-300 w-full mb-4 outline-none focus:border-black text-lg placeholder:text-base'
                type="text"
                placeholder='GJ07AKXXXX'
                value={numberPlate}
                onChange={(e) => {
                  setNumberPlate(e.target.value)
                }}
              />
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col gap-2 w-1/2">
              <h3 className='text-xl font-semibold tracking-tight'>Vehicle Capacity</h3>
              <input
                className='bg-[#eeeeee] rounded px-4 py-2 border border-gray-300 w-full mb-4 outline-none focus:border-black text-lg placeholder:text-base' type="number"
                placeholder='Colour'
                value={vehicleCapacity}
                onChange={(e) => {
                  setVehicleCapacity(e.target.value)
                }}
                required
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <h3 className='text-xl font-semibold tracking-tight'>Vehicle Type</h3>
              <select
                name="vehicleType"
                id="vehicleType"
                className="bg-[#eeeeee] rounded px-4 py-2 border border-gray-300 w-full mb-4 outline-none focus:border-black text-lg"
                value={vehicleType}
                onChange={(e) => {
                  setVehicleType(e.target.value);
                }}
              >
                <option className="text-lg" value="">Select Vehicle Type</option>
                <option className="text-lg" value="motorcycle">Motorcycle</option>
                <option className="text-lg" value="auto">Auto</option>
                <option className="text-lg" value="car">Car</option>
              </select>
            </div>
          </div>
          <div className='flex justify-center items-center gap-5'>
            <Link className='outline-black outline-2 flex justify-center items-center px-5 py-4' to="/user-login"><img className='w-5 invert rotate-180 scale-125' src="/src/assets/arrow.svg" /></Link>
            <button
              type='submit'
              className='outline-black outline-2 w-full flex gap-5 items-center justify-center text-lg font-semibold bg-black text-white py-3 rounded tracking-widest'>
              Sign Up as Captain
              <img className='w-5' src="/src/assets/arrow.svg" />
            </button>
          </div>
        </form>
        <hr className="border-t-2 border-gray-300" />
        <div className='flex flex-col justify-center items-center'>
          <p className="text-md text-gray-500 font-medium">Already have a account</p>
          <Link
            to='/captain-login'
            className="w-full flex gap-3 items-center justify-center bg-gray-100 hover:bg-gray-200 text-black py-3 rounded border border-gray-300 shadow transition text-lg font-semibold">
            Login as a Captain
            <img className='w-5 invert' src="/src/assets/arrow.svg" />
          </Link>
        </div>
      </div>
    </div>
  )

}

export default CaptainSignUp