import React from 'react'
import VehicleHeading from './VehicleHeading'

const VehicleCard = (props) => {
    let now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: 'h24' })
    now = now.split(':');
    now[1] = parseInt(now[1], 10) + props.time
    if (now[1] / 10 != 0) {
        now = now.join(':')
    } else {
        now[1] = "0" + now[1]
        now = now.join(':')
    }

    let vehicleType;
    if (props.vehicleHeading === 'UberGo') {
        vehicleType = 'car'
    } else if (props.vehicleHeading === 'UberMoto') {
        vehicleType = 'motorcycle'
    } else {
        vehicleType = 'auto'
    }

    return (
        <div onClick={() => {
            props.setConfirmRidePanel(true)
            props.setVehiclePanelOpen(false)
            props.setRide({
                vehicleHeading: props.vehicleHeading,
                vehicleCapacity: props.vehicleCapacity,
                tripPrice: props.tripPrice,
                image: props.image,
                time: props.time,
                willReach: now
            })
            props.setVehicleType(vehicleType)
        }} className='flex justify-between items-center gap-3 rounded-lg bg-gray-100 active:outline w-full px-2 py-4 ' >
            <div className='flex justify-start items-center gap-2'>
                <img className='w-20' src={props.image} alt="" />
                <div className='flex flex-col gap-0 justify-center items-start'>
                    <VehicleHeading vehicleHeading={props.vehicleHeading} vehicleCapacity={props.vehicleCapacity} />
                    <div className="flex justify-start items-center gap-0.5 text-md">
                        <p>{props.time} mins away</p>
                        <p className='text-2xl font-bold'>&middot;</p>
                        <p>{now}</p>
                    </div>
                    <p className='text-gray-500 text-xs'>{props.customText}</p>
                </div>
            </div>
            <div className='text-xl font-bold'>&#8377;{props.tripPrice}</div>
        </div >
    )
}

export default VehicleCard