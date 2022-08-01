import React, {useState, useEffect} from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Map = () => {
    const [searchIP, setSearchIP] = useState({
        IPaddress : "",

    })
    const [geoAPI, setGeoAPI] = useState([])
    const API = `https://geo.ipify.org/api/v2/country,city?apiKey=at_8GYwFgPif5Fekxinsvi3D7Ew0D9lg&ipAddress=${searchIP.IPaddress}
    `
    useEffect(()=>{
        fetch(API)
        .then(res => res.json())
        .then(data => setGeoAPI(data))
        console.log(geoAPI)

    },[searchIP])
    const styles = {
        backgroundImage: `url('/pattern-bg.png')`
    }

    const handleChange = (event)=>{
        const {name, value, type, checked} = event.target

        setSearchIP(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
    const handleClick = (e)=>{
        e.preventDefault()
        setSearchIP(prevFormData => {
            return {
                ...prevFormData,
                IPaddress: null,
                
            }
        })
        

    }
    const foodIcon = new L.icon({
        iconUrl: require('./location.png'),
        iconSize: [35,45]
    })


  return (
    <div className='map md:w-10/12 md:pt-24 md:m-auto relative'>
        <div className='bg-image flex flex-col items-center' style={styles}>
            <h2 className='text-white text-2xl font-bold m-8' >
                IP Address Tracker
            </h2>
            <div className='w-full flex justify-center mb-36'>
            <input type="text" placeholder='Search for any IP address or domain' className='border p-4 rounded-l-lg w-8/12 md:w-6/12 font-lg' name='IPaddress' onChange={handleChange} />
            <button className='bg-black text-white font-bold w-1/12 rounded-r-lg' onClick={handleClick}>RESET</button>
            </div>
            

        </div>
        <div className='ipdetails flex flex-col gap-8 md:flex-row md:justify-around w-10/12 rounded-lg border-2 m-auto bg-white p-8 font-bold absolute top-48 right-8 visible z-50 md:top-80 md:left-10'>
            <div className='IP text-center'>
                <h5 className='details-header text-gray-400 text-xs'>IP ADDRESS</h5>
                <h2 className='details'>{geoAPI?.ip}</h2>
            </div>
            <div className='IP text-center'>
                <h5 className='details-header text-gray-400 text-xs'>LOCATION</h5>
                <h2 className='details'>{geoAPI?.location?.region}, {geoAPI?.location?.country} {geoAPI?.location?.postalCode}</h2>
            </div>
            <div className='IP text-center'>
                <h5 className='details-header text-gray-400 text-xs'>TIMEZONE</h5>
                <h2 className='details'>{geoAPI?.location?.timezone}</h2>
            </div>
            <div className='IP text-center'>
                <h5 className='details-header text-gray-400 text-xs'>ISP</h5>
                <h2 className='details'>{geoAPI?.isp}</h2>
            </div>

        </div>
        <div className='map-location w-12/12 relative z-10'>
       {geoAPI.location && <MapContainer center={[geoAPI?.location?.lat, geoAPI?.location?.lng]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[geoAPI?.location?.lat, geoAPI?.location?.lng]} icon={ foodIcon }>
    <Popup>
      Current Location
    </Popup>
  </Marker>
</MapContainer>
}
        </div>

  
        
    </div>
  )
}
export default Map
