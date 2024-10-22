import './index.css'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import OurFood from '../Components/OurFood'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Components/Home'
import About from '../Components/About'
import SignIn from '../Components/SignIn'
import { ViewProvider } from '../Components/Context/Context_view'
import ViewReceipe from '../Components/ViewReceipe'
function App() {
  
  return (
    <ViewProvider>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/About' element={<About />} />
          <Route path='/OurFood' element={<OurFood/>} />
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/ViewReceipe' element={<ViewReceipe/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ViewProvider>
  )
}
export default App


