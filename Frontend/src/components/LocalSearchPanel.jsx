import LocationCard from './LocationCard'

const LocalSearchPanel = ({ addressArray, setAddress }) => {
    const addresses = Array.isArray(addressArray) ? addressArray : [];

    if (addresses.length === 0) {
        return (
            <div className='flex justify-center items-center h-full'>
                <p className='text-gray-500'>No locations available</p>
            </div>
        )
    }

    return (
        <div className='px-5 flex flex-col gap-2 justify-center items-center'>
            {addresses.map((address, idx) => (
                <LocationCard key={idx} address={address.description} setAddress={setAddress} />
            ))}
        </div>
    )
}

export default LocalSearchPanel