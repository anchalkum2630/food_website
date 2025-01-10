import './index.css'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import OurFood from '../Components/pages/OurFood'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Components/pages/Home'
import About from '../Components/pages/About'
import SignIn from '../Components/pages/SignIn'
import { ViewProvider } from '../Components/Context/Context_view'
import ViewReceipe from '../Components/pages/ViewReceipe'
import UserProfile from '../Components/pages/UserProfile'
import Register from '../Components/pages/Register'
function App() {
  
  return (
    <BrowserRouter>
      <ViewProvider>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/About' element={<About />} />
          <Route path='/OurFood' element={<OurFood/>} />
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/ViewReceipe' element={<ViewReceipe/>} />
          <Route path='/UserProfile' element={<UserProfile/>} />
          <Route path='/register' element={<Register/>}/>
        </Routes>
        <Footer />
      </ViewProvider>
    </BrowserRouter>
    
  )
}
export default App


