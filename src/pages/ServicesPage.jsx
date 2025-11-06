import {useEffect} from 'react'
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/all'
import SplitType from "split-type"; 
import { Pin } from 'lucide-react';

import { servicesCopy } from '../constants/services';

gsap.registerPlugin(ScrollTrigger);


const ServicesPage = () => {
    useEffect(() => {
    let ctx = gsap.context(() => {
        const stickySection = document.querySelector(".container1");
        const stickyHeight = window.innerHeight * 5;
        const services = document.querySelectorAll(".service");
        const indicator = document.querySelector(".indicator");
        const currentCount = document.querySelector("#current-count");
        const serviceImg = document.querySelector(".service-img");
        const serviceCopy = document.querySelector(".service-copy p");


        const isMobile = window.innerWidth <= 470;
        const serviceHeight = isMobile ? 25 : 38;
        const imgHeight = 250;

        if (indicator) {
        indicator.style.height = `${serviceHeight}px`;
      }


      
        let currentSplitText = new SplitType(serviceCopy, { types: "lines" });

        const measureContainer = document.createElement("div");
        measureContainer.style.cssText = `
            position: absolute;
            visibility: hidden;
            height: auto;
            width: auto;
            white-space: nowrap;
            font-family: "PP NeueBit";
            font-size: 30px;
            font-weight: 600;
            text-transform: uppercase;
        `;

        document.body.appendChild(measureContainer)

        const serviceWidths = Array.from(services).map((service) => {
            measureContainer.textContent = service.querySelector("p").textContent;
            return measureContainer.offsetWidth + 5 ;
        });

        document.body.removeChild(measureContainer);

        gsap.set(indicator, {
            width: serviceWidths[0],
            xPercent: -50,
            left: "50%",
        })

        const scrollPerService = window.innerHeight;
        let currentIndex = 0;

        const animateTextChange = (index) => {
            return new Promise((resolve) => {
                gsap.to(currentSplitText.lines, {
                    opacity: 0,
                    y: -20,
                    duration: 0.5,
                    stagger: 0.03,
                    ease: "power3.inOut",
                    onComplete: () => {
                        currentSplitText.revert();

                        const newText = servicesCopy[index][0];
                        serviceCopy.textContent = newText;

                        currentSplitText = new SplitType(serviceCopy, {
                            types: "lines",
                        });

                        gsap.set(currentSplitText.lines, {
                            opacity: 0,
                            y: 20,
                        });

                        gsap.to(currentSplitText.lines, {
                            opacity: 1,
                            y: 0,
                            duration: 0.5,
                            stagger: 0.03,
                            ease: "power3.out",
                            onComplete: resolve,
                        });

                        
                    },
                });
            });
        };

        ScrollTrigger.create({
            trigger: stickySection,
            start: "top top",
            end: () => `+=${stickyHeight}`,
            pin: true,
            onUpdate: async (self) => {
                gsap.set('.progress', { scaleY: self.progress })

                const activeIndex = Math.floor(self.progress * services.length)
                const clampedIndex = Math.min(services.length - 1, activeIndex)

                if (clampedIndex !== currentIndex) {
                    currentIndex = clampedIndex ;

                    services.forEach((s) => s.classList.remove('active'))
                    services[clampedIndex].classList.add('active')

                    await Promise.all([
                        gsap.to(indicator, {
                            y: clampedIndex * serviceHeight,
                            width: serviceWidths[clampedIndex],
                            duration: 0.5,
                            ease: "power3.inOut",
                            overwrite: true,
                        }),

                        gsap.to(serviceImg, {
                            y: -(clampedIndex * imgHeight),
                            duration: 0.5,
                            ease: "power3.inOut",
                            overwrite: true,
                        }),

                        gsap.to(currentCount, {
                            innerText: clampedIndex + 1,
                            snap: {innerText: 1},
                            duration: 0.3,
                            ease: "power3.out",
                        }),

                        animateTextChange(clampedIndex)
                    ]);
                }
            }
        })

        const handleResize = () => ScrollTrigger.refresh()
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        ScrollTrigger.getAll().forEach((st) => st.kill())
      }
    });

    return () => ctx.revert(); // Cleanup on unmount
}, [])
  return (
    <section id='services' className='container1 flex'>
        <div className="col flex-1 flex flex-col justify-center items-center">
            <div className="services relative flex flex-col items-center">
                <div className="indicator absolute top-0 left-0 w-full h-[38px] translate-y-0 bg-black z-[-1]"></div>
                <div className="service active"><p>Our Services</p></div>
                <div className="service"><p>Spa and Wellness</p></div>
                <div className="service" ><p>Confinement care</p></div>
                <div className="service"><p>Confinement food</p></div>
                <div className="service"><p>Sport Therapy</p></div>
            </div>
        </div>
        <div className="col flex-1 flex flex-col justify-center items-center gap-8">
            <div className="service-img-wrapper relative w-[60%] h-[250px] overflow-hidden">
                <div className="service-img w-full h-[2000px] translate-y-0 will-change-transform">
                    <div className="img w-full h-[250px]"><img className='w-full h-full object-cover' src='/images/menu.png' alt=''/></div>
                    <div className="img w-full h-[250px]"><img className='w-full h-full object-cover' src='/images/menu.png' alt=''/></div>
                    <div className="img w-full h-[250px]"><img className='w-full h-full object-cover' src='/images/menu.png' alt=''/></div>
                    <div className="img w-full h-[250px]"><img className='w-full h-full object-cover' src='/images/menu.png' alt=''/></div>
                </div>
            </div>
            <div className="service-copy w-[60%]">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium iste sequi sapiente assumenda ullam in repudiandae, a tempora neque exercitationem maxime eum nemo fugiat!</p>
            </div>
        </div>

        <div className="progress-bar absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2.5px] h-[60%] bg-[#d5d5d5] ">
            <div className="progress absolute top-0 left-0 w-full h-full bg-black origin-top scale-y-0 will-change-transform"></div>
        </div>

        <div className="index">
            <span id='current-count'>1</span>
            <span className='separator'></span>
            <span className='total-count'>5</span>
        </div>
    </section>
    
  )
}

export default ServicesPage