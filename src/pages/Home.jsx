import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet'
import '../assets/Home.css'
import 'leaflet/dist/leaflet.css'
import {Icon, imageOverlay} from 'leaflet'
import {React, useState, useEffect, Fragment} from 'react'
import { Helmet } from 'react-helmet'
import NavBar from '../components/NavBar'
import {ref, listAll, getDownloadURL} from 'firebase/storage'
import {child, ref as dbRef, getDatabase, onValue} from 'firebase/database'
import { imgDB, rtDB, auth } from '../firebaseconfig'
import { onAuthStateChanged } from 'firebase/auth'


export default function Home() {
  let testbool = true;
  const spots = []
  const [position, setPosition] = useState({latitude: 43.747474670410156, longitude: -79.49417877197266});
  const [spotID, setSpotID] = useState(0)
  const [isSpotClicked, setIsSpotClicked] = useState(false)
  const [markersData, setMarkersData] = useState()
  const [imageList, setImageList] = useState([])
  const [authUser, setAuthUser] = useState(null)
  const imageListRef = ref(imgDB, 'images/')
  const databaseRef = dbRef(rtDB, 'spots/')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobileWidth, setIsMobileWidth] = useState(false)

  let autoResize = () => {
    if (window.innerWidth < 700 ){
        setIsMobileWidth(true)
        
    } else {
        setIsMobileWidth(false)
    }
}

  useEffect(() => {
      window.addEventListener('resize', autoResize)
      autoResize();  
  }, [])

  

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

  function hideMap() {
    document.getElementById('mapcontainuh').style.display = 'none'
  }

  function showMap() {
    document.getElementById('mapcontainuh').style.display = 'block'
  }

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
    setIsSpotClicked(true)
    setSpotID(obj.currentTarget.id)
    setPosition({latitude: markersData[obj.currentTarget.id].lat, longitude: markersData[obj.currentTarget.id].long})
  }

  function markerClick(id) {
    setIsSpotClicked(true)
    setSpotID(id)
    setPosition({latitude: markersData[id].lat, longitude: markersData[id].long})
  }

  function spotClick() {
    setIsSpotClicked(false)
  }

  const customIcon = new Icon({
    iconUrl: "https://cdn2.iconfinder.com/data/icons/activity-5/50/1F6F9-skateboard-512.png",
    iconSize: [64, 64]
  })

  function SetViewOnClick() {
    const map = useMap()
    if (isSpotClicked) {
      map.flyTo([position.latitude, position.longitude], 15)
    } else {
      map.flyTo([position.latitude, position.longitude], 10)
    }
    return null
  }

  return (
    <Fragment>
      <NavBar></NavBar>
      <div className = 'bigContainer'>
      <MapContainer id = "mapcontainuh" center={[position.latitude, position.longitude]} zoom={12} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SetViewOnClick/>
        {markersData ? (
          <div>
          {markersData.map((spot, i) => (
            <>
            <Marker
              id = {i} 
              position = {[spot.lat, spot.long]} 
              icon = {customIcon}
              eventHandlers={{
                click: (e) => {
                  markerClick(e.target.options.id)
                }
              }}
            > 
            </Marker>
            
            </>
            ))
          }
          </div> 
        ):(
          <div></div>
        )}
      </MapContainer>

        
      { isSpotClicked ? (
        <div  className = "spotWindow">
        {isMobileWidth ? (
          <>
            {/* {hideMap()} */}
          </>
        ):(
          <></>
        )}

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
                <button id = "backButton" onClick = {() => {spotClick(); showMap()}}> Back</button>
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
                  <a href = "#">
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
                  </a>
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