import React from 'react'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { auth } from '../firebaseconfig'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useAuth } from '../pages/AuthContext'

export default function NavBar() {
  const navigate = useNavigate()
  const { authUser, setAuthUser } = useAuth();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    })

    return () => {
        listen()
    }
  }, [authUser])

  const userSignOut = () => {
    signOut(auth).then(() => {
        console.log('Sign out successful.')
        setAuthUser(null)
    }).catch(err => console.log(err))
  }

  return (
    <nav className = 'nav'>
        <div>
        <a href = '/spot-seeker/' className = 'titleSite'>Spot Seeker</a>
        <img className = "board" src = "https://firebasestorage.googleapis.com/v0/b/skatespots-56bd6.appspot.com/o/images%2Foutput-onlinepngtools.png?alt=media&token=e3691113-45bb-43f7-969b-f8acab958cc2"></img>
      </div>
      <ul>
        <li>
          <a href = "/spot-seeker/#submit">
            <button className = "navButtons" id = "submitButton">Submit</button>
          </a>
        </li>
        <li>
          {authUser !== null ? (<div>
            <button className = "navButtons" onClick = {userSignOut} id = "submitButton">Logout</button>  
              </div>
            ) : (
              <ul>
                <a href = "/spot-seeker/#login">
                  <button className = "navButtons" id = "loginButton">Login</button>
                </a>
                <a href = "/spot-seeker/#register">
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