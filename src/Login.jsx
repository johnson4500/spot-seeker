import React, { Fragment } from 'react'
import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './Login.css'
import NavBar from './NavBar'
import { auth } from './firebaseconfig'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Login() {
    const[email, setEmail] = useState()
    const[password, setPassword] = useState()
    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            // console.log(userCredentials)
            const user = userCredentials.user
            navigate('/')
        }).catch((error) => {
            console.log(error)
        })
    }
    
    return (
        <Fragment>
        <NavBar></NavBar>  
        <br></br> 
        <br></br> 
        <br></br> 
        <div className = "Login">
            <div className = "container">
                <h2 id = "logintext">Login</h2>
                <br></br>
                <form onSubmit = {handleSubmit}>
                    <div>
                        <label htmlFor = "email">
                            <strong className = "labels">Email</strong>
                        </label>
                        <br></br>
                        <input
                        className = "inputFields"
                         type = "email"
                         placeholder = "Enter Email"
                         autoComplete = "off"
                         name = "email"
                         onChange = {(e) => setEmail(e.target.value)}/>
                         
                    </div>
                    <br></br>
                    <div>
                        <label htmlFor = "email">
                        <strong className = "labels">Password</strong>
                        </label>
                        <br></br>
                        <input
                        className = "inputFields"
                         type = "password"
                         placeholder = "Enter Password"
                         autoComplete = "off"
                         name = "password"
                         onChange = {(e) => setPassword(e.target.value)}/>
                    </div>
                    <br></br>
                    <button id = 'logButt' className = 'buttons' type = "submit">
                        Login
                    </button>
                </form>
                <br></br>
                <a href = '/register'>
                    <button className = 'buttons' id = 'regButt'>Register</button>
                </a>
            </div>
        </div>
        </Fragment>
    )
}
