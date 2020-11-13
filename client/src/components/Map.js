import React, {useState,useEffect} from 'react';
import { GoogleMap, useLoadScript,Marker,InfoWindow } from '@react-google-maps/api';
import MapStyles from "../MapStyles"
const dotenv_1 = require("dotenv");
dotenv_1.config();

 
const libraries =["places"];
const mapContainerStyle = {
  width:'100%',
  height:'600px'
}
const options = {
  styles: MapStyles,
  disableDefaultUI: true,
  zoomControl: true
}

const center = {
  lat: 39.9612,
  lng: -82.9988
}

const clickEvent = () => {
  console.log("moo");
}

const breakupArray = (size, data) =>{
  var data_copy = [...data]
  var arrays = [];
  while (data_copy.length > 0)
    arrays.push(data_copy.splice(0, size));
  return arrays;
}


// var test = [["71.246.84.134","137.169.128.127"],["173.100.252.8","117.6.46.233"],["71.76.211.202"]]

export default function Map(props){
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  useEffect(()=>{
    fetch('/api/IPAddresses')
      .then(res => res.json())
      .then(data => {
        var IPs = []
          data.map(row =>{
            IPs.push(row.IPAddress);
          })
          return IPs
        }).then((IPs) =>{
          return (
            fetch('http://ip-api.com/batch',{
              method: 'POST',
              body: JSON.stringify(IPs)})
          )
        })
        .then((res) => res.json())
        .then(data => {
          var markerInfo=[]
          data.map(m =>{
            markerInfo.push({lat:m.lat,
              lng: m.lon,
              IPAdd:m.query,
              country:m.country,
              regionName:m.regionName,
              city: m.city,
              isp: m.isp,
              org: m.org
              })
          })
          setMarkers(markerInfo);
        })
  },[]);
  const {isLoaded,loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    libraries
  });
  if(loadError) return "Error loading maps";
  if(!isLoaded) return "Loading map";
  
  return(
    <div>
      <GoogleMap mapContainerStyle={mapContainerStyle}
        zoom={4} 
        center = {center} 
        options = {options}>
        {markers.map(marker =>(
            <Marker 
              key={marker.IPAdd}
              position= {{lat: marker.lat, lng: marker.lng}}
              icon = {{url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"}}
              onClick = {() =>{
                setSelected(marker);
              }}
            />
          )
        )}
        <Marker position= {{lat:39.9612, lng: -82.9988}}/>
          {selected ? (
          <InfoWindow 
            position = {{lat: selected.lat, 
            lng: selected.lng}}
            onCloseClick = {()=>{
              setSelected(null);
            }}
            >
            <div>
              <h2>{selected.IPAdd}</h2>
              <div>
                <strong style= {{display:'inline '}}>Location:</strong>
                <span>{` ${selected.city}, ${selected.regionName}, ${selected.country}`}</span>
              </div>
              <div>
                <strong style= {{display:'inline '}}>Cordinates:</strong>
                <span>{` ${selected.lat},${selected.lng}`}</span>
              </div>
              <div>
                <strong style= {{display:'inline '}}>ISP: :</strong>
                <span>{`${selected.isp}`}</span>
              </div>
            </div>
          </InfoWindow>
        ): null}  
      </GoogleMap>
    </div>)
}
