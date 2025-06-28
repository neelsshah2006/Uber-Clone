import React from 'react'

const ConfirmRide = ({ ride, setConfirmRidePanel, setVehiclePanelOpen, pickup, destination, setLookingForDriverPanel, createRide }) => {

    return (
        <>
            <div className='flex justify-start items-center text-2xl font-bold w-full gap-3'>
                <img onClick={() => {
                    setConfirmRidePanel(false)
                    setVehiclePanelOpen(true)
                }} className='w-5 invert rotate-180' src="src/assets/arrow.svg" alt="" />
                <p>Confirm your Trip</p>
            </div>
            <div className='flex flex-col gap-2 justify-center items-center w-full py-2'>
                <img className='w-40 py-5' src={ride.image} alt="" />
                <div className='text-xl font-bold'>{ride.vehicleHeading}</div>
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
                    <h4 className='text-base font-bold'>Price: ₹{ride.tripPrice}</h4>
                    <h6 className='text-gray-700 text-xs text-wrap'>Cash</h6>
                </div>
            </div>
            <div className='w-full flex justify-center items-center p-5'>
                <button
                    className='w-[100%] bg-black text-white p-3 text-lg tracking-widest font-bold rounded-lg'
                    onClick={() => {
                        setConfirmRidePanel(false)
                        setLookingForDriverPanel(true)
                        createRide()
                    }}
                >
                    Confirm Trip
                </button>
            </div>
        </>
    )
}

export default ConfirmRide