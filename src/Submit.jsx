import React, {useEffect, useState, Fragment} from 'react'
import axios from 'axios';
import NavBar from './NavBar'
import {useNavigate} from 'react-router-dom'
import {Icon} from 'leaflet'
import {MapContainer, TileLayer, Marker, useMap, Popup} from 'react-leaflet'
import {GeoSearchControl, OpenStreetMapProvider} from 'leaflet-geosearch'
import './Submit.css'
import 'leaflet-geosearch/dist/geosearch.css'
import {v4} from 'uuid'
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {set, ref as dbRef, update} from 'firebase/database'
import { auth, rtDB, imgDB } from './firebaseconfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';



export default function Submit() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate()
    const[spotName, setSpotName] = useState()
    const[lat, setLat] = useState()
    const[long, setLong] = useState()
    const[address, setAddress] = useState()
    const[previewFiles, setPreviewFiles] = useState([])
    const[spotDescription, setSpotDescription] = useState()
    const[isAuthorized, setIsAuthorized] = useState(false)
    const[emailVerified, setEmailVerified] = useState(false)
    const[searchResults, setSearchResults] = useState()  
    const[imageUpload, setImageUpload] = useState(null)
    const spotRef = dbRef(rtDB, 'spots/' + spotName)

    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user && user.emailVerified) {
          setIsAuthorized(true)
          setEmailVerified(true)
          mapLoad()
        } else if (user && !user.emailVerified) {
          setIsAuthorized(true)
          setEmailVerified(false)
        } else {
          setIsAuthorized(false)
          setEmailVerified(false)
        }  
      })
    }, []);

    const nextStep = () => {
      setStep(step + 1);
      document.getElementById('map2').style.height = '0px'
    };
  
    const prevStep = () => {
      setStep(step - 1);
      document.getElementById('map2').style.height = '50vh'
    };

    const handleSubmit = (e) => {
      e.preventDefault()

      // Add image to firebase storage
      
      var uploadedImgURLs = ['test']
      function imgUpload() {
        // Create an array to store promises
        const uploadPromises = [];
      
        for (let i = 0; i < imageUpload.length; i++) {
          const imageRef = ref(imgDB, `images/${imageUpload[i].name + v4()}`);
          const uploadPromise = uploadBytes(imageRef, imageUpload[i])
            .then(snapshot => getDownloadURL(ref(imgDB, snapshot.metadata.fullPath)))
            .then(url => {
              uploadedImgURLs[i] = url;
            });
      
          uploadPromises.push(uploadPromise);
        }
      
        // Wait for all promises to resolve before logging and updating
        Promise.all(uploadPromises)
          .then(() => {
            update(spotRef, { uploadedImgURLs: uploadedImgURLs });
          })
          .catch(error => {
            console.error("Error uploading images:", error);
          });
      }

      // Add spot to firebase realtime db
      set(spotRef, {
        spotName: spotName,
        spotDescription, spotDescription,
        lat: lat,
        long: long,
        spotAddress: address,
        uploadedImgURLs: ['']
      }).then(() => {
        console.log("Spot added.")
        navigate('/')
      })

      imgUpload()
  }

  function displayFiles(files) {
    let previewFilesArray = [];
    for (let i = 0; i < files.length; i++) {
      previewFilesArray[i] = URL.createObjectURL(files[i]);
    }
    
    setPreviewFiles(previewFilesArray);
  }

  function mapLoad() {
    const map2 = L.map('map2').setView([43.747474670410156, -79.49417877197266], 10)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map2)

    const customIcon = new Icon({
      iconUrl: "https://cdn2.iconfinder.com/data/icons/activity-5/50/1F6F9-skateboard-512.png",
      iconSize: [64, 64]
    })  

    const searchControl = new GeoSearchControl({
      provider: new OpenStreetMapProvider(),
      style: 'bar',
      showMarker: false,
      marker: {
        icon: customIcon,
        draggable: false,
      }
    });

    map2.addControl(searchControl)

    var iconOptions = {
      clickable:true,
      icon: customIcon
    }

    var marker = L.marker(new L.LatLng(0, 0), iconOptions)
    marker.addTo(map2)
    map2.on('click', function(e) {
      var coord = e.latlng
      var coordlat = coord.lat
      var coordlng = coord.lng
      var newLatLng = new L.LatLng(coordlat, coordlng)
      marker.setLatLng(newLatLng)
      setLat(coordlat)
      setLong(coordlng)
      getAddress(coordlat, coordlng)
    })

    function getAddress(coordlat, coordlng) {
      axios.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + coordlat + '&lon=' + coordlng)
      .then(result => {
        console.log(result.data)
        let addressData = result.data.address
        setAddress((addressData.house_number ? addressData.house_number + " " : "") + addressData.road + ", " + addressData.city
        + ", " + addressData.state + " " + addressData.postcode + ", " + addressData.country)
      })
      .catch(error => {
        console.log(error)})
      }

    map2.on('geosearch/showlocation', function(e) {
      var coordlat = e.location.y
      var coordlng = e.location.x
      setLat(coordlat)
      setLong(coordlng)
      var newLatLng = new L.LatLng(coordlat, coordlng)
      marker.setLatLng(newLatLng)
      getAddress(coordlat, coordlng)
    })
  }

    return (
      <Fragment>
        <NavBar></NavBar>
        {isAuthorized == true ? (
          <div>
            {emailVerified == true ? (
              <div></div>
            ) : (
              <p className = "verText">Please verify your email!</p>
            )}
          </div>
        ) : (
            <p className = "verText">Please login to submit!</p>
          )
        }
        
        <div className = "map-container">
          {emailVerified == true && step == 1 ? (
            <div>
              <h2 id = 'topText'>Add Your Own Skatespot!</h2>
              <p id = 'text2'>Enter an address using the search bar, then drop a pin at the approximate location.</p>
              
            </div>
              ) : (
              <div></div>
          )}
          
          <div id = 'map2'></div>
          
          {emailVerified == true && step == 1 ? (
            <div>
              <br></br>
              <div>
                {lat != null ? (
                  <div>
                  <p className = 'fade-in selectText'>Your coordinates are {lat}, {long}</p>
                  </div>
                  ) : (
                    <div></div>
                )}
                {address != null ? (
                  <p className = 'fade-in selectText'>The address of this location is {address}</p>
                ) : (
                  <div></div>
                )}
                {address != null && lat != null ? (
                  <div className = 'fade-in'>
                    <button id = "logButt" onClick = {nextStep} className = "buttons">
                      Next!
                    </button>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div> 
        { step == 2 ? (
        <div className = 'bigahcontainer'>
          <div>
              <div className = "container">
                  <br></br>
                  <form onSubmit = {handleSubmit}>
                      <div>
                          <label htmlFor = "name">
                              <strong>Name</strong>
                          </label>
                          <br></br>
                          <input
                          className = "inputFields"
                          type = "text"
                          placeholder = "Enter Spot Name"
                          autoComplete = "off"
                          id = "name"
                          accept=".png, .jpg, .jpeg, .webp, .mp4"
                          onChange = {(e) => setSpotName(e.target.value)}/>
                      </div>
                      <br></br>       
                      <div>
                          <label htmlFor = "files">
                          <strong>Upload Images</strong>
                          </label>
                          <br></br>
                          <input
                          className = "inputFields"
                          type = "file"
                          placeholder = "Upload Images"
                          autoComplete = "off"
                          id = "image"
                          multiple
                          onChange = {(e) => {setImageUpload(e.target.files); displayFiles(e.target.files);}}/>
                          {previewFiles.length > 0 ? (
                            <div className = "filePreviewContainer">
                              {previewFiles.map((image, i) => (
                                <img key = {i} id = "fileImage" src={previewFiles[i]}/>
                              ))}
                            </div>
                          ):(
                            <div></div>
                          )}
                      </div>
                      <div>
                          <label htmlFor = "spotDescription">
                          <strong>Description</strong>  
                          </label>
                          <br></br>
                          <input
                          className = "inputFields"
                          type = "text"
                          placeholder = "Enter a Description"
                          autoComplete = "off"
                          id = "spotDescription"
                          onChange = {(e) => setSpotDescription(e.target.value)}/>
                      </div>
                      <br></br>
                      <button id = "logButt" type = "submit" className = "buttons">
                          Submit!
                      </button>
                      <br></br>
                      <button id = "backButt" onClick = {prevStep} className = "buttons">
                          Back
                      </button>
                  </form>
              </div>
          </div>          
        </div>
        ) : (
          <div></div>
        )}
        </Fragment>
    );
  }
