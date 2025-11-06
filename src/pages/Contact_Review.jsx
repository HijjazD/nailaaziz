import {useEffect, useRef} from 'react'
import gsap from 'gsap';
import { Star } from 'lucide-react';

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

import { useClientBookingStore } from '../store/clientstore/clientBookingStore';

const Contact_Review = () => {
    const { reviews, fetchReviews } = useClientBookingStore()

    useEffect(() => {
        fetchReviews()
    }, [])


    useEffect(() => {

        let ctx = gsap.context(() => {
            const cards = gsap.utils.toArray(".card-contact-review")

            cards.forEach((card, index) => {
                if(index < cards.length - 1){
                    const cardInner = card.querySelector(".card-inner")

                    gsap.fromTo(cardInner, 
                    {
                        x: "0%",
                        z: 0,
                        rotationX: 0
                    }, 
                    {
                        x: "-50%",
                        z: -250,
                        rotateY: 45,
                        scrollTrigger: {
                            trigger: cards[index + 1],
                            start: "top 55%",
                            end: "top -75%",
                            scrub: true,
                            pin: card,
                            pinSpacing: false,

                        }
                    })

                    gsap.to(cardInner, {
                        "--after-opacity": 1,
                        scrollTrigger: {
                            trigger: cards[index + 1],
                            start: "top 45%",
                            end: "top -25%",
                            scrub: true
                        }
                    })
                }
            })
        })
        return () => ctx.revert();
    },[])
  return (
    <section id='contact-review'>
        <div id='card-1' className="card-contact-review ">
            <div className="card-inner bg-purple-500">
                <div className="card-info flex justify-center items-center w-full h-[80px]">
                    <p className='text-3xl'>REVIEWS</p>
                </div>
                <div className="card-titl pt-20">
                    <h1 className='text-5xl font-bold'>The Review speak for itself</h1>
                </div>
                <div className="card-description pt-3.5">
                    <p>Your reviews matter — they help us grow, improve, and continue delivering the best experiences possible. 
                        Every word you share makes a difference!</p>
                </div>

                <div className='ratings flex justify-center items-center gap-x-5'>
                    <p>4.8/5</p>
                    <div className='flex'>
                        <Star size={24} color='gold'/>
                        <Star size={24} color='gold'/>
                        <Star size={24} color='gold'/>
                        <Star size={24} color='gold'/>
                        <Star size={24} color='gold'/>
                    </div>
                    <p>500+ Reviews</p>
                </div>
                
                <div className="flex justify-center items-center py-10 pt-20 sm:pt-10 md:pt-60 lg:pt-40">
                    <div className="w-full ">
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={0}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1, // mobile
                                },
                                768: {
                                    slidesPerView: 2, // tablet
                                },
                                1024: {
                                    slidesPerView: 2, // large screens
                                },
                                1250: {
                                    slidesPerView: 3, // large screens
                                },
                        }}

                        >
                            {reviews.length > 0 ? (
                            reviews.map((r) => (
                                <SwiperSlide key={r.id}>
                                    <div className='review bg-white rounded-2xl shadow-xl p-8 w-[380px] mx-auto relative'>
                                        <div className='absolute -top-6 left-1/2 -translate-x-1/2 bg-cyan-100 rounded-full p-3 shadow-md'>
                                            <p className='text-3xl text-cyan-600'>“</p>
                                        </div>
                                        <p className='text-gray-700 mt-6 text-[1rem] leading-relaxed text-center'>
                                            {r.review}
                                        </p>
                                        <div className='flex justify-center items-center gap-1.5 mt-4'>
                                            {[...Array(r.rating)].map((_, i) => (
                                                <Star key={i} size={20} color='gold' fill='gold' />
                                            ))}
                                        </div>
                                        <p className='text-gray-800 font-medium text-center mt-3'>
                                        {r.clientName ? r.clientName : 'Anonymous'}
                                        </p>
                                        <p className='text-sm text-gray-500 text-center'>
                                        {r.serviceName}
                                        </p>
                                    </div>
                                </SwiperSlide>
                            ))
                            ) : (
                            <SwiperSlide>
                                <div className='bg-white rounded-2xl shadow-xl p-8 w-[380px] mx-auto'>
                                <p className='text-gray-700 text-center'>
                                    No reviews yet — be the first to share your experience!
                                </p>
                                </div>
                            </SwiperSlide>
                            )}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>



        <div id='card-2' className="card-contact-review">
            <div className="card-inner bg-blue-300">
                <div className="card-info">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <div className="card-title">
                    <h1>Reverie</h1>
                </div>
                <div className="card-description">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae molestias iure veniam! Assumenda ab incidunt, rem excepturi, esse asperiores reiciendis laboriosam, officiis repellendus illo laborum!</p>
                </div>
                <div className="card-img">
                    <img className='w-full h-full object-cover' src='/images/menu.png' alt=''/>
                </div>
            </div>
        </div>




        <div id='card-3' className="card-contact-review">
            <div className="card-inner bg-green-300">
                <div className="card-info">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <div className="card-title">
                    <h1>Reverie</h1>
                </div>
                <div className="card-description">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae molestias iure veniam! Assumenda ab incidunt, rem excepturi, esse asperiores reiciendis laboriosam, officiis repellendus illo laborum!</p>
                </div>
                <div className="card-img">
                    <img className='w-full h-full object-cover' src='/images/menu.png' alt=''/>
                </div>
            </div>
        </div>



        <div id='card-4' className="card-contact-review">
            <div className="card-inner bg-purple-400">
                <div className="card-info">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <div className="card-title">
                    <h1>Reverie</h1>
                </div>
                <div className="card-description">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae molestias iure veniam! Assumenda ab incidunt, rem excepturi, esse asperiores reiciendis laboriosam, officiis repellendus illo laborum!</p>
                </div>
                <div className="card-img">
                    <img className='w-full h-full object-cover' src='/images/menu.png' alt=''/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Contact_Review