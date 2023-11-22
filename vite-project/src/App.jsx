import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import Test from './Test'
import Submit from './Submit'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/register' element = {<Signup/>}></Route>
        <Route path = '/login' element = {<Login/>}></Route>
        <Route path = '/home' element = {<Home/>}></Route>
        <Route path = '/test' element = {<Test/>}></Route>
        <Route path = '/submit' element = {<Submit/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
