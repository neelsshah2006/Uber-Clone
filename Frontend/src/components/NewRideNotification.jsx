
const NewRideNotification = ({ setRidePopupPanel, setConfirmRidePopupPanel, ride, confirmRide }) => {
    return (
        <>
            <div className='flex justify-center items-center text-2xl font-bold w-full gap-3'>
                <p>New Ride Available</p>
            </div>
            <div className='flex justify-start items-center gap-2 w-full my-3'>
                <div>
                    <img className='w-10 h-10 rounded-full' src="/src/assets/user.svg" alt="" />
                </div>
                <div className='flex justify-between grow'>
                    <p className='text-lg font-bold'>{ride?.user.fullname.firstname + ' ' + ride?.user.fullname.lastname}</p>
                    <p className='text-base text-gray-700 font-semibold'>2.2 KM</p>
                </div>
            </div>
            <hr className="border-t-2 border-gray-300 w-full" />
            <div className='grid grid-cols-6 justify-start items-center gap-2 w-full text-2xl'>
                <div className='flex justify-center items-center p-5 '>
                    <img className='w-4' src={`/src/assets/location.svg`} alt="" />
                </div>
                <div className='flex flex-col justify-center items-start col-span-5'>
                    <h4 className='text-base font-bold'>{ride?.pickup}</h4>
                </div>
            </div>
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
            <div className='w-full flex flex-col gap-3 justify-center items-center p-5'>
                <button
                    onClick={() => {
                        setRidePopupPanel(false)
                        setConfirmRidePopupPanel(true)
                        confirmRide()
                    }}
                    className='w-[100%] bg-black text-white p-3 text-lg tracking-widest font-bold rounded-lg'
                >
                    Accept
                </button>
                <button
                    onClick={() => {
                        setRidePopupPanel(false)
                    }}
                    className='w-[100%] text-black outline-1 bg-white p-3 text-lg tracking-widest font-bold rounded-lg'>
                    Ignore
                </button>
            </div>
        </>
    )
}

export default NewRideNotification