import { useState } from 'react'
import {Toaster} from "react-hot-toast"
import { useAppContext } from './context/AppContext'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import DashBoardLayout from './pages/DashboardLayout'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Career from './pages/Career'
import Project from './pages/projectForm'
import CustomerForm from './pages/CustomerForm'
import Projects from './pages/Projects'
import Customers from './pages/Customers'
import SliderForm from './pages/SliderForm'
import Sliders from "./pages/Sliders"


function App() {

  const {isAdmin} = useAppContext();

  return (
    <div className=' text-default min-h-screen text-gray-700 bg-white'>
    <Toaster/>
    <Routes>
      <Route path='/dashboard' element={<DashBoardLayout/>}>
      <Route path='contact' element={<ContactUs/>}/>
      <Route path='career' element={<Career/>}/>
      <Route path='about-form' element={<AboutUs/>}/>
      <Route path='project-form' element={<Project/>}/>
      <Route path='customer-form' element={<CustomerForm/>}/>
      <Route path='project' element={<Projects/>}/>
      <Route path='customers' element={<Customers/>}/>
      <Route path='sliders-form' element={<SliderForm/>}/>
      <Route path='sliders' element={<Sliders/>}/>
      </Route>
    </Routes> 
    </div>
  )


}

export default App
