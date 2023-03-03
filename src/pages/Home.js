import React from 'react'
import Footer from '../components/Home/Footer'
import Hero from '../components/Home/Hero'
import Navbar from '../components/Home/Navbar'
import SEO from '../components/SEO'
import { Spacer, VStack } from '@chakra-ui/react'

const Home = () => {
  return (
    <VStack h="100vh" pb={2}>
      <SEO title="Home" />
      <Navbar />
      <Hero />
      <Spacer />
      <Footer />
    </VStack>
  )
}

export default Home