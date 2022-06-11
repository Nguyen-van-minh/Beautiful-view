import React, { useState, useEffect } from "react";
import { Modal, Button } from 'antd';
import GoogleMapReact from "google-map-react";
import MyMarker from "./Marker";

const UserLocation = () => {
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        userAddress: null
    })

    useEffect(() => {
        getLocation()
    }, [])
    const [isModalVisible, setIsModalVisible] = useState(false); const showModal = () => {
        setIsModalVisible(true);
        // getAddress()
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError)
        } else {
            console.log("Geolocation is not supported by this browser.")
        }
    }

    const showPosition = (position) => {
        setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }

    // const getAddress = () => {
    //     fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&sensor=false&key=AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8`)
    //         .then(res => res.json())
    //         .then(data => console.log(data?.results[2].formatted_address))
    //         .catch(error => console.log(error))
    // }

    const showError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.")
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.")
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.")
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.")
                break;
            default:
                alert("An unknown error occurred")

        }
    }

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Xem vị trí hiện tại
            </Button>
            <Modal title="Vị trí hiện tại của bạn" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    {
                        location.latitude && location.longitude ?
                            <div style={{ height: '50vh', width: '100%' }}>
                                <GoogleMapReact
                                    bootstrapURLKeys="AIzaSyA66KwUrjxcFG5u0exynlJ45CrbrNe3hEc"
                                    defaultCenter={{ lat: location.latitude, lng: location.longitude }}
                                    defaultZoom={15}
                                >
                                    <MyMarker
                                        lat={location.latitude}
                                        lng={location.longitude}
                                        text="o"
                                    />
                                </GoogleMapReact>
                            </div>
                            :
                            <span>Không tìm thấy vị trí của bạn!</span>
                    }
                </div>
            </Modal>
        </div>
    )

}

export default UserLocation