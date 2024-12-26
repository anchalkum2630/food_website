import './index.css'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import OurFood from '../Components/pages/OurFood'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Components/pages/Home'
import About from '../Components/pages/About'
import SignIn from '../Components/pages/SignIn'
import { ViewProvider } from '../Components/Context/Context_view'
import ViewReceipe from '../Components/pages/ViewReceipe'
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


