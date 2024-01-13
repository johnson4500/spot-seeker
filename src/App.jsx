import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from './pages/AuthContext'
import {HashRouter, Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Test from './Test'
import Submit from './pages/Submit'

function App() {

  return (
    <AuthProvider>
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
    </AuthProvider>
  )
}

export default App
