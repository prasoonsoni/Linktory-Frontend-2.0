import React from 'react'
import Footer from '../components/Home/Footer'
import Hero from '../components/Home/Hero'
import Navbar from '../components/Home/Navbar'
import SEO from '../components/SEO'

const Home = () => {
  return (
    <>
      <SEO title="Home" />
      <Navbar />
      <Hero />
      <Footer />
    </>
  )
}

export default Home