import React, { useEffect, useRef, useState } from 'react';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const defaultCenter = {
    lat: 0, // fallback: New Delhi
    lng: 0,
};

const LiveTracking = () => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const markerInstance = useRef(null);
    const [loading, setLoading] = useState(true);

    // Wait for GoMaps script to be loaded
    useEffect(() => {
        const checkGoogle = () => {
            if (window.google && window.google.maps) {
                setLoading(false);
            } else {
                setTimeout(checkGoogle, 100);
            }
        };
        checkGoogle();
    }, []);

    // Initialize map when script is loaded
    useEffect(() => {
        if (!loading && mapRef.current && !mapInstance.current) {
            mapInstance.current = new window.google.maps.Map(mapRef.current, {
                center: defaultCenter,
                zoom: 17,
            });
        }
    }, [loading]);

    // Watch user position and update marker
    // Update user position every 10 seconds
    useEffect(() => {
        let intervalId;
        function updatePosition() {
            if (navigator.geolocation && window.google && window.google.maps && mapInstance.current) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
                        mapInstance.current.setCenter(pos);
                        if (markerInstance.current) {
                            markerInstance.current.setPosition(pos);
                        } else {
                            markerInstance.current = new window.google.maps.Marker({
                                position: pos,
                                map: mapInstance.current,
                            });
                        }
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                    },
                    { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 }
                );
            }
        }
        if (!loading) {
            updatePosition();
            intervalId = setInterval(updatePosition, 10000);
        }
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [loading]);

    return (
        <div style={containerStyle}>
            {loading ? (
                <div className='w-screen h-screen flex justify-center items-center'>Loading Map...</div>
            ) : (
                <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
            )}
        </div>
    );
};

export default LiveTracking;