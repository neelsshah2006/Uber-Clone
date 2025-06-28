import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className='bg-[url("/bgimage.jpg")] bg-center bg-cover  h-screen w-full flex justify-between flex-col'>
        <img className='w-1/4 mt-5 ml-5' src="/Uber_logo_2018.png" alt="" />
        <div className="bg-white px-10 text-center py-5 rounded-t-2xl shadow-lg  mt-20 flex flex-col gap-5 items-center">
          <h2 className='text-3xl font-semibold'>Get Started with Uber</h2>
          <Link to="/user-login" className='w-full flex gap-5 items-center justify-center texl-2xl font-semibold bg-black text-white py-3 rounded mt-2 tracking-widest' >Continue <img className='w-5' src="/src/assets/arrow.svg" /></Link>
        </div>
      </div>
    </div>
  )
}

export default Start