import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ConfirmRidePopup = ({ setConfirmRidePopupPanel, ride }) => {

    const [otp, setOtp] = useState("")

    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/start-ride`, {
            params: {
                rideId: ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.status === 200) {
            navigate('/captain-riding', { state: { ride: ride } })
        }
    }
    return (
        <div className='h-full w-full flex flex-col items-center'>
            <div className='flex justify-center items-center text-2xl font-bold w-full gap-3'>
                <p>Go to Pickup</p>
            </div>
            <div className='flex justify-start items-center gap-2 w-full my-10'>
                <div>
                    <img className='w-10 h-10 rounded-full' src="/src/assets/user.svg" alt="" />
                </div>
                <div className='flex justify-between grow'>
                    <p className='text-lg font-bold capitalize'>{ride?.user.fullname.firstname + " " + ride?.user.fullname.lastname}</p>
                    <p className='text-base text-gray-700 font-semibold'>2.2 KM</p>
                </div>
            </div>
            <hr className="border-t-2 border-gray-300 w-full" />
            <div className='grid grid-cols-6 justify-start items-center gap-2 w-full text-2xl mb-2'>
                <div className='flex justify-center items-center p-5 '>
                    <img className='w-4' src={`/src/assets/location.svg`} alt="" />
                </div>
                <div className='flex flex-col justify-center items-start col-span-5'>
                    <h4 className='text-base font-bold'>{ride?.pickup}</h4>
                </div>
            </div>
            <div className='grid grid-cols-6 justify-center items-center gap-2 w-full text-2xl mb-2'>
                <div className='flex justify-center items-center p-5  '>
                    <img className='w-4' src={`/src/assets/square.svg`} alt="" />
                </div>
                <div className='flex flex-col justify-center items-start col-span-5'>
                    <h4 className='text-base font-bold'>{ride?.destination}</h4>
                </div>
            </div>
            <hr className="border-t-2 border-gray-300 w-full" />
            <div className='grid grid-cols-6 justify-center items-center gap-2 w-full text-2xl my-10'>
                <div className='flex justify-center items-center p-5 '>
                    <img className='w-5' src={`/src/assets/card.svg`} alt="" />
                </div>
                <div className='flex flex-col justify-start items-start gap-1 col-span-5'>
                    <h4 className='text-base font-bold'>Price: ₹{ride?.fare}</h4>
                    <h6 className='text-gray-700 text-xs text-wrap'>Cash</h6>
                </div>
            </div>
            <hr className="border-t-2 border-gray-300 w-full" />
            <form onSubmit={(e) => {
                submitHandler(e)
            }} className='w-full flex flex-col gap-5 justify-center items-center p-5'>
                <label className='text-2xl font-bold tracking-widest' htmlFor="OTP">Enter Rider OTP: </label>
                <input
                    value={otp}
                    onChange={(e) => {
                        setOtp(e.target.value)
                    }}
                    className='bg-[#eeeeee] text-center rounded-lg text-2xl w-full p-5'
                    type="text"
                    id='OTP'
                    placeholder='******'
                />
                <button
                    type='submit'
                    className='w-full bg-black text-white text-center p-3 text-lg tracking-widest font-bold rounded-lg'
                >
                    Start ride
                </button>
                <button
                    onClick={() => {
                        setConfirmRidePopupPanel(false)
                    }}
                    className='w-[100%] text-black outline-1 bg-white p-3 text-lg tracking-widest font-bold rounded-lg'>
                    Cancel Ride
                </button>
            </form>
        </div>
    )
}

export default ConfirmRidePopup