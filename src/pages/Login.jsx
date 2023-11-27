import React, { Fragment } from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import '../assets/Login.css'
import NavBar from '../components/NavBar'
import { auth } from '../firebaseconfig'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Login() {
    const[email, setEmail] = useState()
    const[password, setPassword] = useState()
    const[validLogin, setValidLogin] = useState('inputFields')
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
            setValidLogin('invalid')

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
                        className = {validLogin}
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
                         type = "password"
                         placeholder = "Enter Password"
                         autoComplete = "off"
                         name = "password"
                         className = {validLogin}
                         onChange = {(e) => setPassword(e.target.value)}/>
                    </div>
                    <br></br>
                    {validLogin == 'invalid' ? (
                        <div>Invalid email and/or password!</div>
                    ) : (
                        <div></div>
                    )}
                    <button id = 'logButt' className = 'buttons' type = "submit">
                        Login
                    </button>
                </form>
                <a href = '/skateSpots/#register'>
                    <button className = 'buttons' id = 'regButt'>Register</button>
                </a>
            </div>
        </div>
        </Fragment>
    )
}
