import React, { useEffect } from 'react'

const WaitingForDrivers = ({ ride, finalRide, pickup, destination }) => {
    let vehicleHeading = null;
    if (finalRide) {
        vehicleHeading = finalRide?.captain.vehicle.vehicleType;
        if (vehicleHeading === 'car') {
            vehicleHeading = 'UberGo'
        } else if (vehicleHeading === 'auto') {
            vehicleHeading = 'UberAuto'
        } else {
            vehicleHeading = 'UberMoto'
        }
    }

    return (
        <>
            <div className='flex justify-between items-center text-2xl font-bold w-full gap-3'>
                <p className='w-full text-center'>Meet At the pickup point</p>
                <div className='bg-black px-2 py-3 flex flex-col justify-center items-center text-white text-sm font-light text-nowrap tracking-widest'>
                    <span>{ride.time} mins</span>
                    <span>away</span>
                </div>
            </div>
            <div className='grid grid-cols-2 gap-2 justify-center items-center w-full py-2'>
                <img className='w-28 mx-auto py-5' src={ride.image} alt="" />
                <div className='flex flex-col justify-self-end items-end'>
                    <h2 className='text-lg font-semibold capitalize'>{finalRide?.captain.fullname.firstname + ' ' + finalRide?.captain.fullname.lastname}</h2>
                    <h3 className='text-xl font-bold tracking-wider'>{finalRide?.captain.vehicle.plate}</h3>
                    <h4 className='text-base font-medium tracking-tighter'>{vehicleHeading ? vehicleHeading : " "}</h4>
                    <h2 className='text-lg font-semibold capitalize'>{finalRide?.otp}</h2>
                </div>
            </div>
            <hr className="border-t-2 border-gray-300 w-full" />
            <div className='grid grid-cols-6 justify-start items-center gap-2 w-full text-2xl'>
                <div className='flex justify-center items-center p-5 '>
                    <img className='w-4' src={`/src/assets/location.svg`} alt="" />
                </div>
                <div className='flex flex-col justify-center items-start col-span-5'>
                    <h4 className='text-base font-bold'>{pickup}</h4>
                </div>
            </div>
            <hr className="border-t-2 border-gray-300 w-full" />
            <div className='grid grid-cols-6 justify-center items-center gap-2 w-full text-2xl'>
                <div className='flex justify-center items-center p-5  '>
                    <img className='w-4' src={`/src/assets/square.svg`} alt="" />
                </div>
                <div className='flex flex-col justify-center items-start col-span-5'>
                    <h4 className='text-base font-bold'>{destination}</h4>
                </div>
            </div>
            <hr className="border-t-2 border-gray-300 w-full" />
            <div className='grid grid-cols-6 justify-center items-center gap-2 w-full text-2xl'>
                <div className='flex justify-center items-center p-5 '>
                    <img className='w-5' src={`/src/assets/card.svg`} alt="" />
                </div>
                <div className='flex flex-col justify-start items-start gap-1 col-span-5'>
                    <h4 className='text-base font-bold'>Price: ₹{finalRide?.fare}</h4>
                    <h6 className='text-gray-700 text-xs text-wrap'>Cash</h6>
                </div>
            </div>
        </>
    )
}

export default WaitingForDrivers