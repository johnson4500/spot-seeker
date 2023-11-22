import React from 'react'
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet'
import './Home.css'
import 'leaflet/dist/leaflet.css'
import {Icon, imageOverlay} from 'leaflet'
import { Fragment } from 'react'
import {useState, useEffect} from 'react'
import NavBar from './NavBar'
import {ref, listAll, getDownloadURL} from 'firebase/storage'
import {ref as dbRef, getDatabase, onValue} from 'firebase/database'
import { imgDB, rtDB, auth } from './firebaseconfig'
import { onAuthStateChanged } from 'firebase/auth'



export default function Home() {
  const [data, setData] = useState('');
  const markers = []
  const [imageList, setImageList] = useState([])
  const [authUser, setAuthUser] = useState(null)
  const imageListRef = ref(imgDB, 'images/')
  const databaseRef = dbRef(rtDB, 'spots/')
  


  // useEffect(() => {const token = localStorage.getItem('token')
  //   if (token) {
  //     setIsLoggedIn(true)
  // }})

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user)
      } else {
      setAuthUser(null)
      }

      onValue(databaseRef, (snapshot) => {
        const data = snapshot.val()
        console.log(data)
    })

        listAll(imageListRef).then((response) => {
        response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
            setImageList((prev) => [...prev, url])
        })
      })
    })
  })

  }, [])
  //   axios.get('http://localhost:3001/home')
  //   .then(res => {
  //       console.log(res.data)
  //       setData(res.data)
        
  //   })
  //   .catch(err => console.log(err))

  //   listAll(imageListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //           setImageList((prev) => [...prev, url])
  //       })
  //     })
  //   })
  // }, [])

  // function handleLogout() {
  //   localStorage.removeItem('token')
  //   setIsLoggedIn(false)
  // }

  for (let i = 0; i < data.length; i++) {
    let geocode = 
    {
      geocode: [data[i].lat, data[i].long],
      description: data[i].spotDescription
    }
    markers[i] = geocode
  }


  const customIcon = new Icon({
    iconUrl: "https://cdn2.iconfinder.com/data/icons/activity-5/50/1F6F9-skateboard-512.png",
    iconSize: [64, 64]
  })

  return (
    <Fragment>
      <NavBar></NavBar>
      <div className = 'bigContainer'>
      <MapContainer center={[43.747474670410156, -79.49417877197266]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.map(marker => (
          <Marker position = {marker.geocode} icon = {customIcon}>
            <Popup>
              {marker.description}
            </Popup>
          </Marker>
        ))
      }
      </MapContainer>
      <div className = "spotContainer">
        <h2 id = "text1" >View Skate Spots!</h2>
        <div>
          {imageList ? (
            <div>
              {imageList.map(url => (
                <div className="element-container">
                  <img src = {url} className = 'image'/>
                  {/* <div className = "element-text">
                    {element.spotName}
                  </div> */}
                </div>
              )
              )}
            </div>
            ) : (
              <p className = "errorText">No spots are currently available.</p>
            )
            }
            
        </div>  
      </div>
      </div>
    </Fragment>
  )
}