import 'bootstrap/dist/css/bootstrap.min.css'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './Layout'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import Test from './Test'
import Submit from './Submit'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/skateSpots" element={<Home />}></Route>
        <Route path = 'skateSpots/register' element = {<Signup/>}></Route>
        <Route path = 'skateSpots/login' element = {<Login/>}></Route>
        {/* <Route path = 'skateSpots/home' element = {<Home/>}></Route> */}
        <Route path = 'skateSpots/test' element = {<Test/>}></Route>
        <Route path = 'skateSpots/submit' element = {<Submit/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
