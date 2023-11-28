import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet'
import '../assets/Home.css'
import 'leaflet/dist/leaflet.css'
import {Icon, imageOverlay} from 'leaflet'
import {React, useState, useEffect, useCallback, Fragment} from 'react'
import { Helmet } from 'react-helmet'
import NavBar from '../components/NavBar'
import {ref, listAll, getDownloadURL} from 'firebase/storage'
import {child, ref as dbRef, getDatabase, onValue} from 'firebase/database'
import { imgDB, rtDB, auth } from '../firebaseconfig'
import { onAuthStateChanged } from 'firebase/auth'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

export default function Home() {
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

  const showNextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex < markersData[spotID].uploadedImgURLs.length - 1 ? prevIndex + 1 : 0));
  }, [markersData, spotID]);

  const showLastImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : markersData[spotID].uploadedImgURLs.length - 1));
  }, [markersData, spotID]);

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
  
    // listAll(imageListRef).then((response) => {
    //     response.items.forEach((item) => {
    //       getDownloadURL(item).then((url) => {
    //         setImageList((prev) => [...prev, url])
    //       })
    //     })
    //   })
  }, [])

  function getSpotContent(obj) {
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
    setCurrentIndex(0)
  }

  const customIcon = new Icon({
    iconUrl: "https://cdn2.iconfinder.com/data/icons/activity-5/50/1F6F9-skateboard-512.png",
    iconSize: [64, 64]
  })

  function SetViewOnClick() {
    const map = useMap()
    if (isSpotClicked) {
      map.flyTo([position.latitude, position.longitude], 18,
      {
        animate: true,
        duration: 2
      }) 
    } else {
      map.flyTo([position.latitude, position.longitude], 10)
    }
    return null
  }

  const buttonStyle = {
    width: "3vw",
    height: "3vw",
    background: 'none',
    border: '0px',
};

const properties = {
    canSwipe: true,
    transitionDuration: 500,
    prevArrow: <button className = 'button' style={{ ...buttonStyle }}>&lt;</button>,
    nextArrow: <button className = 'button' style={{ ...buttonStyle }}>&gt;</button>
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
                    <br></br>
                    <div className= 'spotImage'>
                      <Slide {...properties}>
                        {markersData[spotID].uploadedImgURLs.map((data, i) => (
                          <div key = {i + "spotImage"}>
                            <img draggable="false" className = "spotImage" src = {data}></img>
                          </div>
                          )
                        )}
                      </Slide>
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