import React from 'react'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { auth } from '../firebaseconfig'
import { onAuthStateChanged, signOut } from 'firebase/auth'

export default function navBar() {
  const navigate = useNavigate()
  const [authUser, setAuthUser] = useState(null)

  // function handleLogout() {
  //   localStorage.removeItem('token')
  //   navigate('/home')
  // }
  
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user)
      } else {
      setAuthUser(null)
      }
    })

    return () => {
        listen()
    }
  }, [])

  const userSignOut = () => {
    signOut(auth).then(() => {
        console.log('Sign out successful.')
        setAuthUser(null)
    }).catch(err => console.log(err))
  }


  return (
    <nav className = 'nav'>
        <a href = '/skateSpots/' className = 'titleSite'>jonathan gooning</a>
        <ul>
          <li>
            <a href = "/skateSpots/#submit">
              <button className = "navButtons" id = "submitButton">Submit a Spot</button>
            </a>
          </li>
          <li>
        {authUser !== null ? (<div>

              <button className = "navButtons" onClick = {userSignOut} id = "submitButton">Logout</button>  
              </div>
            ) : (
               <ul>
            <a href = "/skateSpots/#login">
              <button className = "navButtons" id = "loginButton">Login</button>
            </a>
            <a href = "/skateSpots/#register">
            <button className = "navButtons" id = "regButton">Register</button>
            </a>
            </ul>
                )
            }
          </li>
        </ul>
      </nav>
  )
}