import Hero from '@/Components/Hero'
import React from 'react'
import Services from './services'
import ContactForm from './contact'
import Projects from './portfolio'

function index() {
  return (
    <div>
      <Hero/>
      <Services/>
      <Projects/>
      <ContactForm/>
    </div>
  )
}

export default index