import {useState, useEffect, useRef} from 'react'


import AboutSVG from '../constants/AboutSVG'

import gsap from 'gsap'
import { DrawSVGPlugin, ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(DrawSVGPlugin)
const AboutPage = () => {
    
    const aboutSVG = useRef()
     useEffect(() => {


    const svg = aboutSVG.current
    if (!svg) return

    // Select all paths inside the SVG
    const paths = svg.querySelectorAll('path')

    // Animate drawing for each path
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#about',
        start: 'top top',         // start drawing when the section hits top of viewport
        end: 'bottom bottom',     // finish when bottom hits bottom
        scrub: true,              // tie to scroll
      },
    })

    timeline.fromTo(
      paths,
      { drawSVG: '0%' },
      { drawSVG: '100%', ease: 'none', stagger: 0.1 } // animate sequentially
    )

    return () => {
      timeline.kill()
    }
  }, [])
  return (
    <section id='about' className=''>
        
        <div 
            ref={aboutSVG}
            className="svg-overlay absolute inset-0 w-full h-[100px]"
        >
            <AboutSVG/>
        </div>
        <h1>About Us</h1>
        <div className="wrapper">
            <div className="about-img-wrapper">
                <img className='w-full h-full object-cover' src='/images/menu.png' alt=''/>
            </div>

            <div className="about-text-wrapper">

                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed, facere!</p>
            </div>
        </div>

        <div className="wrapper">
            <div className="about-img-wrapper2">
                <img className='w-full h-full object-cover' src='/images/menu.png' alt=''/>
            </div>

            <div className="about-text-wrapper">
               
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed, facere!</p>
            </div>

        </div>
    </section>
  )
}

export default AboutPage