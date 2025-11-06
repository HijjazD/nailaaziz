import {useEffect} from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";



import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

const HeroPage = () => {

    useEffect(() => {
        const tl = gsap.timeline({
            delay: 0.3,
            defaults: {
                ease: "hop",
            }
        })

        const counts = document.querySelectorAll(".count");

        counts.forEach((count, index) => {
            const digits = count.querySelectorAll(".digit h1")

            tl.to(
                digits,
                {
                    y: "0%",
                    duration: 1,
                    stagger: 0.075,
                },
                index * 1
            )

            if (index < counts.length){
                tl.to(
                    digits,
                    {
                        y: "-200%",
                        duration: 1,
                        stagger: 0.075,
                    },
                    index * 1 + 1
                )
            }
        })

        tl.to(".spinner", {
            opacity: 0,
            duration: 0.3,
        })

        tl.to(".word h1",
            {
                y: "0%",
                duration: 1,
            },
            "<"
        )

        tl.to(".divider", {
            scaleY: "100%",
            duration: 1,
            onComplete: () =>
                gsap.to(".divider", {opacity: 0, duration: 0.4, delay:0.3})
        })

        tl.to("#word-1 h1", {
            y: "100%",
            duration: 1,
            delay: 0.3,
        })

        tl.to("#word-2 h1", {
            y: "100%",
            duration: 1,
        }, "<")

        tl.to(".block", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1,
            stagger: 0.1,
            delay: 0.75,
            onStart: () => gsap.to(".hero-img", { scale: 1, duration: 2, ease: "hop" }),
        });

        tl.to(".loader", {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
            const loader = document.querySelector(".loader");
            if (loader) {
                loader.style.display = "none"; // hides it completely
            }
            },
        });
    },[])

  return (
    <section id='hero'>
        <div className="loader fixed top-0 left-0 w-screen h-screen z-[50]">
            <div className="overlay absolute top-0 w-full h-full flex">
                <div className="block w-full h-full bg-gray-600"></div>
                <div className="block w-full h-full bg-gray-600"></div>
            </div>

            <div className="intro-logo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1">
                <div className="word relative -left-18 pr-1" id='word-1'>
                    <h1>
                        <span className='font-gabrielle text-white text-5xl'>Naila's</span>
                    </h1>
                </div>
                <div className="word " id='word-2'>
                    <h1 className='text-4xl text-white'>spa</h1>
                </div>
            </div>

            <div className="divider absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white"></div>

            <div className="spinner-container absolute bottom-[10%] left-1/2 -translate-x-1/2">
                <div className="spinner w-[50px] h-[50px] border-white border-[1.4px] border-t-transparent rounded-full animate-spin"></div>
            </div>

            <div className="counter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2]">
                <div className="count flex">
                    <div className="digit"><h1>0</h1></div>
                    <div className="digit"><h1>0</h1></div>
                </div>
                {/* <div className="count flex">
                    <div className="digit"><h1>2</h1></div>
                    <div className="digit"><h1>7</h1></div>
                </div>
                <div className="count flex">
                    <div className="digit"><h1>6</h1></div>
                    <div className="digit"><h1>5</h1></div> 
                </div>
                <div className="count flex">
                    <div className="digit"><h1>9</h1></div>
                    <div className="digit"><h1>8</h1></div>
                </div>
                <div className="count flex">
                    <div className="digit"><h1>9</h1></div>
                    <div className="digit"><h1>9</h1></div>
                </div> */}
            </div>
        </div>
        
        <div className="container relative w-screen h-screen overflow-hidden">
            <div className="hero-img absolute top-0 w-full h-full overflow-hidden z-[-1]">
                <img 
                    className='w-full h-full object-cover'
                    src='/images/menu.png'
                />
            </div>


            <div className="header w-full h-full pt-[25svh] flex flex-col items-center gap-6">
                <div className="hero-copy">
                    <div className="line">
                        <h1 className='text-white'><span className='text-white'>Rooted</span> in care,</h1>
                    </div>
                    <div className="line">
                        <h1 className='text-white'>grown with <span className='text-white'>kindness</span></h1>
                    </div>
                </div>
                
            </div>

            <div className="cta absolute left-1/2 bottom-[3em] -translate-x-1/2 flex items-center justify-center gap-6 w-fit px-8 py-3 bg-white/90 backdrop-blur-md rounded-full shadow-md">
                <FaFacebook size={28} className="text-[#1877F2] hover:scale-110 transition-transform duration-200 cursor-pointer" />
                <FaInstagram size={28} className="text-[#E4405F] hover:scale-110 transition-transform duration-200 cursor-pointer" />
                <FaLinkedin size={28} className="text-[#0A66C2] hover:scale-110 transition-transform duration-200 cursor-pointer" />
                <FaTwitter size={28} className="text-[#1DA1F2] hover:scale-110 transition-transform duration-200 cursor-pointer" />
            </div>

        </div>
    </section>
  )
}

export default HeroPage