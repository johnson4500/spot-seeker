import 'bootstrap/dist/css/bootstrap.min.css'

import {HashRouter, Routes, Route} from 'react-router-dom'
import Layout from './Layout'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import Test from './Test'
import Submit from './Submit'

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path = '/register' element = {<Signup/>}></Route>
        <Route exact path = '/login' element = {<Login/>}></Route>
        {/* <Route path = 'skateSpots/home' element = {<Home/>}></Route> */}
        <Route exact path = '/test' element = {<Test/>}></Route>
        <Route exact path = '/submit' element = {<Submit/>}></Route>
      </Routes>
    </HashRouter>
  )
}

export default App
