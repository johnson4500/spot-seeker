import React from 'react'
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet'
import './Home.css'
import 'leaflet/dist/leaflet.css'
import {Icon, imageOverlay} from 'leaflet'
import { Fragment } from 'react'
import {useState, useEffect} from 'react'
import NavBar from './NavBar'
import {ref, listAll, getDownloadURL} from 'firebase/storage'
import {child, ref as dbRef, getDatabase, onValue} from 'firebase/database'
import { imgDB, rtDB, auth } from './firebaseconfig'
import { onAuthStateChanged } from 'firebase/auth'
import SpotWindow from './SpotWindow'



export default function Home() {
  let testbool = true;
  const spots = []
  const markers = []
  const [spotID, setSpotID] = useState(0)
  const [testBool, setTestBool] = useState(false)
  const [markersData, setMarkersData] = useState()
  const [imageList, setImageList] = useState([])
  const [authUser, setAuthUser] = useState(null)
  const imageListRef = ref(imgDB, 'images/')
  const databaseRef = dbRef(rtDB, 'spots/')
  const [currentIndex, setCurrentIndex] = useState(0);

  function showNextImage(length) {
    if (currentIndex < length - 1){
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  function showLastImage(length) {
    if (currentIndex > 0){
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(length - 1);
    }
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user)
      } else {
      setAuthUser(null)
      }
    })

    onValue(databaseRef, (snapshot) => {
      snapshot.forEach(childSnapShot => {
        spots.push(childSnapShot.val())
      })
      setMarkersData(spots)
    })
  
    listAll(imageListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageList((prev) => [...prev, url])
          })
        })
        
      })
  }, [])
      
  function getSpotContent(obj) {
    // setSpotID(obj)
    setTestBool(true)
    setSpotID(obj.currentTarget.id)
  }

  function markerClick(id) {
    setTestBool(true)
    setSpotID(id)
  }

  function boolChange() {
    setTestBool(false)
  }

  const customIcon = new Icon({
    iconUrl: "https://cdn2.iconfinder.com/data/icons/activity-5/50/1F6F9-skateboard-512.png",
    iconSize: [64, 64]
  })

  return (
    <Fragment>
      <NavBar></NavBar>
      <div className = 'bigContainer'>
      <MapContainer center={[43.747474670410156, -79.49417877197266]} zoom={12} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markersData ? (
        <div>
        {markersData.map((spot, i) => (
          <Marker 
            id = {i} 
            position = {[spot.lat, spot.long]} 
            icon = {customIcon}
            eventHandlers={{
              click: (e) => {
                console.log('marker clicked', e)
                markerClick(e.target.options.id)
              }}}
          >
            <Popup>
              {spot.spotDescription}
            </Popup>
          </Marker>
          ))
         }
        </div> 
      ):(
        <div></div>
      )}
      </MapContainer>

      { testBool ? (
        <div  className = "spotWindow">
        {markersData ? (
              <div className = "spotInfoContainer">
                <br></br>
                  <div className = "imageContainer">
                    <img className = "spotImage" src = {markersData[spotID].uploadedImgURLs[currentIndex]}></img>
                    <br></br>
                    <div className = "button-container left">
                    <button className = "button" onClick={() => showLastImage(markersData[spotID].uploadedImgURLs.length)}>&lt;</button>
                    </div>
                    <div className = "button-container right">
                    <button className = "button" onClick={() => showNextImage(markersData[spotID].uploadedImgURLs.length)}>&gt;</button>
                  </div>
                </div>
                <br></br>
                <strong id = "spotTitleText">Spot Name: {markersData[spotID].spotName}</strong>
                <p id = "spotAddress">Address: {markersData[spotID].spotAddress}</p>
                <div className = "spotDescription">
                  <p id = "spotDescriptionText">{markersData[spotID].spotDescription}</p>
                </div>
                <br></br>
                <button id = "backButton" onClick = {boolChange}> Back</button>
              </div>
        ) : (
          <div></div>
        )}
        </div>
      ):(
        <div className = "spotContainer">
            {markersData ? (
              <div className = "spotContainer">
                <h2 id = "text1" >View Skate Spots!</h2>
                {markersData.map((data, i) => (
                  <div id = {i} className="element-container" onClick={getSpotContent}>
                    <img src = {data.uploadedImgURLs[0]} className = 'image'/>  
                    <div className="overlay">
                      <div className = "element-text">
                      {markersData[i].spotName}
                      </div>
                      <div className = "element-textAddress">
                        {markersData[i].spotAddress}
                      </div>
                    </div>
                  </div>
                )
                )}
              </div>
              ) : (
                <p className = "errorText">Loading spots....</p>
              )
            }
          </div>
      )}
      </div>
    </Fragment>
  )
}