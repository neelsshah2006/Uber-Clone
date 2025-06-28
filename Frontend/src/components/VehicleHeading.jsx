import React from 'react'

const VehicleHeading = ({ vehicleCapacity, vehicleHeading }) => {
    return (
        <div className='flex justify-center items-center gap-2 text-xl font-bold '>
            <p>{vehicleHeading}</p>
            <img className='w-3' src="/src/assets/user.svg" alt="" />
            <p>{vehicleCapacity}</p>
        </div>
    )
}

export default VehicleHeading