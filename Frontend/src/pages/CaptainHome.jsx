import TopBar from "../components/TopBar";
import CaptainDetails from "../components/CaptainDetails";
import NewRideNotification from "../components/NewRideNotification";
import { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSwipeable } from "react-swipeable";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);

  const ridePanel = useRef(null);
  const confirmRidePanel = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (socket.connected && captain && captain._id) {
      socket.emit("join", { userType: "captain", userId: captain._id });
    } else {
      const handleConnect = () => {
        if (captain && captain._id) {
          socket.emit("join", { userType: "captain", userId: captain._id });
        }
      };
      socket.on("connect", handleConnect);
      return () => socket.off("connect", handleConnect);
    }

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    updateLocation();
    const locationInterval = setInterval(updateLocation, 10000);
    return () => clearInterval(locationInterval);
  }, [socket, captain]);

  socket.on("new-ride", (data) => {
    setRide(data);
    setRidePopupPanel(true);
  });

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePanel.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePanel.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePanel.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanel.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopupPanel]
  );

  const ridePopupPanelDown = useSwipeable({
    onSwipedDown: () => {
      if (ridePopupPanel) {
        setRidePopupPanel(false);
      }
    },
  });

  const confirmRide = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/ride/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {

        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    console.log(response);
  };

  return (
    <div {...ridePopupPanelDown} className="h-screen">
      <TopBar link_icon={'/captain-home'} link_profile={'/captain-profile'} />
      <div className="h-screen w-full">
        <LiveTracking />
      </div>
      <CaptainDetails />
      <div
        ref={ridePanel}
        className="flex flex-col gap-2 justify-center items-start fixed bottom-0 p-5 rounded-lg bg-white w-full translate-y-full"
      >
        <NewRideNotification
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={confirmRidePanel}
        className="flex flex-col gap-2 justify-center items-start fixed top-0 w-full h-full p-5 rounded-lg bg-white translate-y-full"
      >
        <ConfirmRidePopup
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
