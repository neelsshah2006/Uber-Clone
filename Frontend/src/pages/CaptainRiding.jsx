import { useRef, useState } from 'react'
import TopBar from '../components/TopBar'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {

  const [finishRidePanel, setFinishRidePanel] = useState(false)

  const finishRide = useRef(null)

  const navigate = useNavigate()
  const location = useLocation()

  const rideData = location.state?.ride

  const finishRideHandler = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/end-ride`, {
      rideId: rideData._id
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (response.status === 200) {
      navigate('/captain-home')
    }
  }

  useGSAP(function () {
    if (finishRidePanel) {
      gsap.to(finishRide.current, {
        transform: 'translateY(-80%)'
      })
    } else {
      gsap.to(finishRide.current, {
        transform: 'translateY(0)'
      })
    }
  }, [finishRidePanel])

  return (
    <div className='w-screen h-screen'>
      <div className='h-4/5'>
        <LiveTracking />
      </div>
      <div ref={finishRide} className='h-screen bg-yellow-400 relative'>
        <div className='h-1/5 p-6 flex items-center justify-between'>
          {!finishRidePanel ? <><h4 className='text-2xl font-semibold'>4 KM away</h4>
            <button onClick={() => {
              setFinishRidePanel(true)
            }} className='bg-green-600 text-white text-2xl font-semibold py-3 rounded-lg px-5'>Complete Ride</button></> : <><div className=' flex gap-5 justify-center items-center text-3xl font-bold text-center w-full'><img className='w-7' src={`/src/assets/location.svg`} alt="" />Reached Destination</div></>}
        </div>
        <div>
          <div className='flex flex-col w-full justify-center items-center gap-5 text-2xl'>
            <div className='flex justify-start items-center gap-2 w-full p-10'>
              <div>
                <img className='w-10 h-10 rounded-full' src="/src/assets/user.svg" alt="" />
              </div>
              <div className='flex justify-center items-center grow'>
                <p className='text-lg font-bold capitalize'>{rideData?.user.fullname.firstname + " " + rideData?.user.fullname.lastname}</p>
              </div>
            </div>
            <div className='flex justify-center items-center p-5 '>
              <img className='w-50' src={`/src/assets/card.svg`} alt="" />
            </div>
            <div className='flex flex-col justify-center items-center gap-1'>
              <h4 className='text-3xl font-bold'>Payable Amount: ₹{rideData?.fare}</h4>
              <p className='px-10 py-5 text-sm text-gray-700 font-bold tracking-widest'>*Click on Finish Ride button only after payment is completed.</p>
            </div>
            <button onClick={() => {
              finishRideHandler()
            }} className='bg-green-600 text-white text-2xl font-semibold py-3 w-[90%] rounded-lg px-5 fixed bottom-10'>Finish Ride</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaptainRiding