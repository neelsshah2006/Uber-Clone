import { useContext, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LocalSearchPanel from '../components/LocalSearchPanel'
import VehicleCard from '../components/VehicleCard'
import TopBar from '../components/TopBar'
import { useSwipeable } from 'react-swipeable';
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDrivers from '../components/WaitingForDrivers'
import axios from 'axios'
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'


const Home = () => {

    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [panelOpen, setPanelOpen] = useState(false)
    const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
    const [confirmRidePanel, setConfirmRidePanel] = useState(false)
    const [ride, setRide] = useState({})
    const [addressArray, setAddressArray] = useState([])
    const [lookingForDriverPanel, setLookingForDriverPanel] = useState(false)
    const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false)
    const [fareData, setFareData] = useState(null)
    const [fareLoading, setFareLoading] = useState(false)
    const [fareError, setFareError] = useState(false)
    const [vehicleType, setVehicleType] = useState("")
    const [finalRide, setFinalRide] = useState(null)

    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
    const vehiclePanel = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const lookingForDriverPanelRef = useRef(null)
    const waitingForDriverPanelRef = useRef(null)
    const pickupInputRef = useRef(null)
    const destinationInputRef = useRef(null)

    const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)
    const navigate = useNavigate()

    const panelUp = useSwipeable({
        onSwipedUp: () => {
            if (!panelOpen) {
                setPanelOpen(true)
            }
        },
    });

    const panelDown = useSwipeable({
        onSwipedDown: () => {
            if (panelOpen) {
                setPanelOpen(false)
            }
        }
    })

    const vehiclePanelDown = useSwipeable({
        onSwipedDown: () => {
            if (vehiclePanelOpen) {
                setVehiclePanelOpen(false)
                setPanelOpen(true)
                setPickup('')
                setDestination('')
            }
        },
        trackTouch: true,
        trackMouse: true
    })

    const confirmRidePanelDown = useSwipeable({
        onSwipedDown: () => {
            if (confirmRidePanel) {
                setConfirmRidePanel(false)
                setVehiclePanelOpen(true)
            }
        },
        trackTouch: true,
        trackMouse: true
    })


    useGSAP(() => {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                duration: 1,
                height: '80%',
                opacity: 1,
                ease: "power2.out"
            });
            gsap.to(panelCloseRef.current, {
                duration: 0.5,
                opacity: 1,
            });
        } else {
            gsap.to(panelRef.current, {
                duration: 1,
                height: '0%',
                opacity: 0,
                ease: "power2.out"
            });
            gsap.to(panelCloseRef.current, {
                duration: 0.5,
                opacity: 0,
            });
        }
    }, [panelOpen]);

    useGSAP(() => {
        if (vehiclePanelOpen) {
            gsap.to(vehiclePanel.current, {
                duration: 1,
                translateY: '0%'
            })
        } else {
            gsap.to(vehiclePanel.current, {
                duration: 1,
                translateY: '100%'
            })
        }
    }, [vehiclePanelOpen])

    useGSAP(() => {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                duration: 1,
                translateY: '0%'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                duration: 1,
                translateY: '100%'
            })
        }
    }, [confirmRidePanel])

    useGSAP(() => {
        if (lookingForDriverPanel) {
            gsap.to(lookingForDriverPanelRef.current, {
                duration: 1,
                translateY: '0%',
                opacity: 1,
                pointerEvents: 'auto'
            })
        } else {
            gsap.to(lookingForDriverPanelRef.current, {
                duration: 1,
                translateY: '100%',
                opacity: 0,
                pointerEvents: 'none'
            })
        }
    }, [lookingForDriverPanel])

    useGSAP(() => {
        if (waitingForDriverPanel) {
            gsap.to(waitingForDriverPanelRef.current, {
                duration: 1,
                translateY: '0%',
                opacity: 1,
                pointerEvents: 'auto'
            })
        } else {
            gsap.to(waitingForDriverPanelRef.current, {
                duration: 1,
                translateY: '100%',
                opacity: 0,
                pointerEvents: 'none'
            })
        }
    }, [waitingForDriverPanel])

    // Input field focus management
    const [focusField, setFocusField] = useState(null)

    // Fetch address suggestions for pickup or destination
    useEffect(() => {
        const input = focusField === 'pickup' ? pickup : destination
        if (input && input.length > 3) {
            axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }).then((res) => { setAddressArray(Array.isArray(res.data) ? res.data : []) })
                .catch((err) => { console.log('Error fetching suggestions:', err); setAddressArray([]) })
        } else {
            setAddressArray([])
        }
    }, [pickup, destination, focusField])

    useEffect(() => {
        if (socket.connected && user && user._id) {
            socket.emit('join', { userType: 'user', userId: user._id });
        } else {
            // Listen for socket connect, then emit
            const handleConnect = () => {
                if (user && user._id) {
                    socket.emit('join', { userType: 'user', userId: user._id });
                }
            };
            socket.on('connect', handleConnect);
            return () => socket.off('connect', handleConnect);
        }
    }, [socket, user]);

    // Fetch fare prices when both pickup and destination are set
    useEffect(() => {
        if (pickup && destination) {
            setFareLoading(true)
            setFareError(false)
            setFareData(null)
            axios.get(`${import.meta.env.VITE_BASE_URL}/ride/get-fare`, {
                params: { pickup, destination },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
                .then(res => {
                    setFareData(res.data)
                    setFareLoading(false)
                })
                .catch((err) => {
                    setFareError(true)
                    setFareLoading(false)
                })
        }
    }, [pickup, destination])

    // Handle address selection from LocalSearchPanel
    const handleAddressSelect = (address) => {
        if (focusField === 'pickup') {
            setPickup(address)
            setPanelOpen(false)
            setVehiclePanelOpen(destination ? true : false)
            if (!destination) {
                setFocusField('destination')
                setTimeout(() => destinationInputRef.current && destinationInputRef.current.focus(), 0)
            }
        } else if (focusField === 'destination') {
            setDestination(address)
            setPanelOpen(false)
            setVehiclePanelOpen(pickup ? true : false)
            if (!pickup) {
                setFocusField('pickup')
                setTimeout(() => pickupInputRef.current && pickupInputRef.current.focus(), 0)
            }
        }
    }

    // Input change handlers
    const handlePickupChange = (e) => {
        setPickup(e.target.value)
        setPanelOpen(true)
        setFocusField('pickup')
    }
    const handleDestinationChange = (e) => {
        setDestination(e.target.value)
        setPanelOpen(true)
        setFocusField('destination')
    }

    // Input click handlers
    const handlePickupClick = () => {
        setPanelOpen(true)
        setFocusField('pickup')
    }
    const handleDestinationClick = () => {
        setPanelOpen(true)
        setFocusField('destination')
    }

    const createRide = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/create`, {
                pickup, destination, vehicleType
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setRide({ ...ride, ...response.data })
            console.log(ride);
            console.log(response.data);
        } catch (error) {
            console.error('Error creating ride:', error)
        }
    }

    // Enter key handlers
    const handlePickupKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            if (!destination) {
                setFocusField('destination')
                setTimeout(() => destinationInputRef.current && destinationInputRef.current.focus(), 0)
            } else if (pickup && destination) {
                setPanelOpen(false)
                setVehiclePanelOpen(true)
            }
        }
    }
    const handleDestinationKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            if (!pickup) {
                setFocusField('pickup')
                setTimeout(() => pickupInputRef.current && pickupInputRef.current.focus(), 0)
            } else if (pickup && destination) {
                setPanelOpen(false)
                setVehiclePanelOpen(true)
            }
        }
    }

    socket.on('ride-confirmed', ride => {
        setLookingForDriverPanel(false)
        setWaitingForDriverPanel(true)
        setFinalRide(ride)
    })

    socket.on('ride-started', ride => {
        navigate('/riding', { state: { ride: ride } })
    })

    return (
        <div {...vehiclePanelDown} className='relative h-screen'>
            <TopBar link_icon="/home" link_profile="/user-profile" />
            <div className='h-screen w-full'>
                <LiveTracking />
            </div>
            <div
                {...panelUp} className='h-screen w-full flex flex-col justify-end  absolute bottom-0'>
                <div {...panelDown} className='bg-white w-full p-5 flex flex-col gap-5 relative rounded-t-2xl'>
                    <div className='flex items-center justify-between'>
                        <h4 className='text-2xl font-semibold'>Find Trip</h4>
                        <img ref={panelCloseRef} className='w-5 opacity-0' src="/src/assets/down.svg" onClick={() => setPanelOpen(false)} />
                    </div>
                    <form className='flex flex-col gap-3'>
                        <div className="line absolute h-16 w-1 top-[48%] left-10 bg-gray-700 rounded-full"></div>
                        <input
                            ref={pickupInputRef}
                            value={pickup}
                            onChange={handlePickupChange}
                            onClick={handlePickupClick}
                            onKeyDown={handlePickupKeyDown}
                            className='bg-[#eeeeee] px-12 py-2 rounded-lg text-base w-full'
                            type="text"
                            placeholder='Add a pick-up location'
                        />
                        <input
                            ref={destinationInputRef}
                            value={destination}
                            onChange={handleDestinationChange}
                            onClick={handleDestinationClick}
                            onKeyDown={handleDestinationKeyDown}
                            className='bg-[#eeeeee] px-12 py-2 rounded-lg text-base w-full'
                            type="text"
                            placeholder='Enter your destination'
                        />
                    </form>
                </div>
                <div ref={panelRef} className='bg-white h-0 opacity-0 pt-2 overflow-y-scroll'>
                    <LocalSearchPanel
                        addressArray={addressArray}
                        setAddress={handleAddressSelect}
                    />
                </div>
            </div>
            <div
                ref={vehiclePanel}
                className='flex flex-col gap-2 justify-center items-start fixed bottom-0 p-5 rounded-lg bg-white w-full translate-y-full'>
                <div className='flex justify-between items-center text-2xl font-bold w-full'>
                    <p>Choose your Vehicle</p>
                    <img onClick={() => {
                        setVehiclePanelOpen(false)
                        setPanelOpen(true)
                        setPickup('')
                        setDestination('')
                    }} className='w-5' src="src/assets/down.svg" alt="" />
                </div>
                <VehicleCard
                    setRide={setRide}
                    setVehicleType={setVehicleType}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehiclePanelOpen={setVehiclePanelOpen}
                    image='/src/assets/car.png'
                    vehicleHeading="UberGo"
                    vehicleCapacity={4}
                    time={8}
                    customText="Comfortable Rides"
                    tripPrice={
                        fareLoading
                            ? "..."
                            : fareError
                                ? "-"
                                : (fareData && fareData.car)
                                    ? Math.round(fareData.car)
                                    : "-"
                    }
                />
                <VehicleCard
                    setRide={setRide}
                    setVehicleType={setVehicleType}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehiclePanelOpen={setVehiclePanelOpen}
                    image='/src/assets/auto.png'
                    vehicleHeading="UberAuto"
                    vehicleCapacity={3}
                    time={5}
                    customText="Affordable Rides"
                    tripPrice={
                        fareLoading
                            ? "..."
                            : fareError
                                ? "-"
                                : (fareData && fareData.auto)
                                    ? Math.round(fareData.auto)
                                    : "-"
                    }
                />
                <VehicleCard
                    setRide={setRide}
                    setVehicleType={setVehicleType}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehiclePanelOpen={setVehiclePanelOpen}
                    image='/src/assets/moto.png'
                    vehicleHeading="UberMoto"
                    vehicleCapacity={1}
                    time={5}
                    customText="Affordable, Motorcycle Rides"
                    tripPrice={
                        fareLoading
                            ? "..."
                            : fareError
                                ? "-"
                                : (fareData && fareData.motorcycle)
                                    ? fareData.motorcycle
                                    : "-"
                    }
                />
            </div>
            <div
                {...confirmRidePanelDown}
                ref={confirmRidePanelRef}
                className='flex flex-col gap-2 justify-center items-start fixed bottom-0 p-5 rounded-xl bg-white w-full translate-y-full'>
                <ConfirmRide
                    ride={ride}
                    createRide={createRide}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehiclePanelOpen={setVehiclePanelOpen}
                    pickup={pickup}
                    destination={destination}
                    setLookingForDriverPanel={setLookingForDriverPanel}
                />
            </div>
            <div
                ref={lookingForDriverPanelRef}
                style={{ opacity: 0, pointerEvents: 'none' }}
                className='flex flex-col gap-2 justify-center items-start fixed bottom-0 p-5 rounded-xl bg-white w-full translate-y-full'>
                <LookingForDriver
                    ride={ride}
                    pickup={pickup}
                    destination={destination}
                />
            </div>
            <div
                ref={waitingForDriverPanelRef}
                style={{ pointerEvents: 'none' }}
                className='flex flex-col gap-2 justify-center items-start fixed bottom-0 p-5 rounded-xl bg-white w-full translate-y-full'>
                <WaitingForDrivers
                    ride={ride}
                    finalRide={finalRide}
                    pickup={pickup}
                    destination={destination}
                />
            </div>
        </div>
    )
}

export default Home