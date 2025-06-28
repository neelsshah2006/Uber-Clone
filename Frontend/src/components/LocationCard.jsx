import React from 'react'

const LocationCard = ({ address, setAddress }) => {
    return (
        <div
            onClick={() => setAddress(address)}
            className='flex items-center justify-start rounded-lg p-2 gap-3 bg-gray-100 border-gray-50 w-full active:outline'
        >
            <div className='min-w-10'>
                <div className='bg-gray-200 rounded-xl px-3 py-2'>
                    <img className='w-4' src="/src/assets/location.svg" alt="" />
                </div>
            </div>
            <div className='flex flex-col justify-center items-start'>
                <h4 className='text-base font-bold'>{address}</h4>
            </div>
        </div>
    )
}

export default LocationCard