import React from 'react'
import { useState } from 'react'
import NavBar from '../Components/NavBar'
import HeroSection from '../Components/HeroSection'
import About from '../Components/About'
import ToolGrid from '../Components/ToolGrid'
import Testimonials from '../Components/Testimonials'
import Footer from '../Components/Footer';
import Contact from '../Components/Contact'
import SlideInDemo from '../Components/SlideInDemo'
const Home = () => {
  const [showDemo, setShowDemo] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <NavBar  onDemoClick={() => setShowDemo(true)}/>
      <HeroSection/>
      <ToolGrid/>
      <About/>
      <Testimonials/>
      <Contact/>
      <Footer/>
       <SlideInDemo isOpen={showDemo} onClose={() => setShowDemo(false)} />

    </div>
  )
}

export default Home