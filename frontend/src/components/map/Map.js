import React from 'react'
import {GoogleMap,withScriptjs,withGoogleMap,Marker} from 'react-google-maps'
import './map.css'


function GoogleAMap(){

const coordinates = [
    {
    'type':'Point',
    'coordinates': [32.0853,34.7818]
    },
    {
    'type':'Point',
    'coordinates': [32.0132,34.7480]
    },
    {
    'type':'Point',
    'coordinates': [32.0684,34.8248]
    },
]
    return(
 <GoogleMap 
    defaultZoom={10} 
    defaultCenter={{lat:32.0853,lng:34.7818}}
    >
    {coordinates.map((store,index) =>(
        <Marker
        key={index}
        position={{
            lat:store.coordinates[1],
            lng:store.coordinates[0]
        }}
        />
    ))}
    </GoogleMap>
    )
}

const WrapperMap = withScriptjs(withGoogleMap(GoogleAMap))

const Map = () => {
    return (
        
   <div className='map-container' style={{widh:'100vw',height: '50vh',marginTop:'75px'}}>
       <WrapperMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDt1R5_bYNoZpcRUzUx_G8jevvR9D8cq3U`}
       loadingElement={<div style={{height:'100%'}}/>}
       containerElement={<div style={{height:'100%'}}/>}
       mapElement={<div style={{height:'100%'}}/>}
       />

   </div>
    
    )    
}



export default Map
