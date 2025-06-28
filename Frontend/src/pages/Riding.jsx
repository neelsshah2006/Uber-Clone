import { useLocation, useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'
import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';

const Riding = () => {

  const { socket } = useContext(SocketContext)
  const navigate = useNavigate()
  const location = useLocation();
  const ride = location.state?.ride

  let vehicleHeading = ride?.captain.vehicle.vehicleType;
  if (vehicleHeading === 'car') {
    vehicleHeading = 'UberGo'
  } else if (vehicleHeading === 'auto') {
    vehicleHeading = 'UberAuto'
  } else {
    vehicleHeading = 'UberMoto'
  }

  socket.on('ride-ended', () => {
    navigate('/home')
  })
  return (
    <div className='h-screen'>
      <div className='h-1/2'>
        <LiveTracking />
      </div>
      <div className="h-1/2">
        <div className='flex justify-between items-center text-2xl font-bold w-full gap-3'>
          <p className='w-full text-center'>Ride Started</p>

        </div>
        <div className='grid grid-cols-2 gap-2 justify-center items-center w-full py-2'>
          <img className='w-28 mx-auto py-5' src={""} alt="" />
          <div className='flex flex-col justify-self-end items-end'>
            <h2 className='text-lg font-semibold capitalize'>{ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname}</h2>
            <h3 className='text-xl font-bold tracking-wider'>{ride?.captain.vehicle.plate}</h3>
            <h4 className='text-base font-medium tracking-tighter'>{vehicleHeading}</h4>
          </div>
        </div>
        <hr className="border-t-2 border-gray-300 w-full" />
        <hr className="border-t-2 border-gray-300 w-full" />
        <div className='grid grid-cols-6 justify-center items-center gap-2 w-full text-2xl'>
          <div className='flex justify-center items-center p-5  '>
            <img className='w-4' src={`/src/assets/square.svg`} alt="" />
          </div>
          <div className='flex flex-col justify-center items-start col-span-5'>
            <h4 className='text-base font-bold'>{ride?.destination}</h4>
          </div>
        </div>
        <hr className="border-t-2 border-gray-300 w-full" />
        <div className='grid grid-cols-6 justify-center items-center gap-2 w-full text-2xl'>
          <div className='flex justify-center items-center p-5 '>
            <img className='w-5' src={`/src/assets/card.svg`} alt="" />
          </div>
          <div className='flex flex-col justify-start items-start gap-1 col-span-5'>
            <h4 className='text-base font-bold'>Price: ₹{ride?.fare}</h4>
            <h6 className='text-gray-700 text-xs text-wrap'>Cash</h6>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Riding