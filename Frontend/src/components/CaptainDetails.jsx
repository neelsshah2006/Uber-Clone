import { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainDetails = () => {

    const { captain } = useContext(CaptainDataContext)

    return (
        <div className="absolute w-screen bottom-0 p-5 rounded-xl border flex flex-col justify-center gap-3 bg-white">
            <div className='flex justify-between items-center'>
                <div className='flex justify-center items-center gap-2'>
                    <img className='w-16 p-2' src="/src/assets/user.svg" alt="" />
                    <h3 className='text-xl font-semibold tracking-widest capitalize'>{captain.fullname.firstname + ' ' + captain.fullname.lastname}</h3>
                </div>
                <div>
                    <h4 className='text-xl font-bold'>₹295</h4>
                    <h6 className='text-lg font-light'>Earned</h6>
                </div>
            </div>
            <div className='grid grid-cols-3 justify-center items-center bg-gray-50 py-2 rounded-lg'>
                <div className='text-center p-3 flex flex-col justify-center items-center gap-3'>
                    <img className='text-xl font-thin w-5' src="/src/assets/user.svg" alt="" />
                    <div>
                        <h5 className='text-lg font-md'>10.5</h5>
                        <p className='text-sm text-gray-600'>Hours Online</p>
                    </div>
                </div>
                <div className='text-center p-3 flex flex-col justify-center items-center gap-3'>
                    <img className='text-xl font-thin w-5' src="/src/assets/user.svg" alt="" />
                    <div>
                        <h5 className='text-lg font-md'>10.5</h5>
                        <p className='text-sm text-gray-600'>Hours Online</p>
                    </div>
                </div>
                <div className='text-center p-3 flex flex-col justify-center items-center gap-3'>
                    <img className='text-xl font-thin w-5' src="/src/assets/user.svg" alt="" />
                    <div>
                        <h5 className='text-lg font-md'>10.5</h5>
                        <p className='text-sm text-gray-600'>Hours Online</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails