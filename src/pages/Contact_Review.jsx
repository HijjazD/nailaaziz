import {useEffect, useState} from 'react'
import gsap from 'gsap';
import { Star } from 'lucide-react';

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

import { useClientBookingStore } from '../store/clientstore/clientBookingStore';

import emailjs from "@emailjs/browser"

const Contact_Review = () => {
    const { reviews, fetchReviews } = useClientBookingStore()
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phone: '',
        message: ''
    });

    const [isSending, setIsSending] = useState(false);


    useEffect(() => {
        fetchReviews()
    }, [])

    useEffect(() => {
        if (window.innerWidth < 768) return; 
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

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            alert("Please fill in all fields!");
            return;
        }

        setIsSending(true);

        // Send email via EmailJS
        emailjs.send(
            "service_t87axeh",      // <-- replace with your service ID
            "template_ww4xkwg",     // <-- replace with your template ID
            {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                time: new Date().toLocaleString(),
                message: formData.message,
            },
            "Mc6RCxHVmpzOb1c5M"       // <-- replace with your public key
        )
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            alert("Message sent successfully!");
            // Reset form
            setFormData({ email: '', name: '', phone: '', message: '' });
        })
        .catch((err) => {
            console.error('FAILED...', err);
            alert("Oops! Something went wrong. Please try again.");
        })
        .finally(() => setIsSending(false));
    };


  return (
    <section id='contact-review'>
        {/* CARD 1 - REVIEWS */}
        <div id='card-1' className="card-contact-review">
            <div className="card-inner bg-[#F9F8F4]">
                <div className="card-info flex justify-center items-center w-full h-[80px]">
                    <p className='text-xs font-bold tracking-widest text-[#C5A059] uppercase'>Client Testimonials</p>
                </div>
                <div className="card-title pt-12 px-6 text-center">
                    <h1 className='text-4xl md:text-5xl font-serif text-stone-900 leading-tight'>
                        The Reviews Speak <span className='italic text-[#C5A059]'>for Themselves</span>
                    </h1>
                </div>
                <div className="card-description pt-6 px-6 max-w-2xl mx-auto text-center">
                    <p className='text-stone-600 text-lg leading-relaxed'>
                        Your reviews help us grow and continue delivering exceptional care. Every word you share makes a difference in our journey together.
                    </p>
                </div>

                <div className='ratings flex justify-center items-center gap-x-6 mt-8'>
                    <p className='text-3xl font-serif font-bold text-stone-900'>4.8<span className='text-stone-400'>/5</span></p>
                    <div className='flex gap-1'>
                        <Star size={20} fill='#C5A059' color='#C5A059'/>
                        <Star size={20} fill='#C5A059' color='#C5A059'/>
                        <Star size={20} fill='#C5A059' color='#C5A059'/>
                        <Star size={20} fill='#C5A059' color='#C5A059'/>
                        <Star size={20} fill='#C5A059' color='#C5A059'/>
                    </div>
                    <p className='text-stone-500 text-sm'>500+ Reviews</p>
                </div>
                
                <div className="flex justify-center items-center py-10 pt-16 sm:pt-10 md:pt-20 lg:pt-16">
                    <div className="w-full">
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={20}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 4000, disableOnInteraction: false }}
                            breakpoints={{
                                0: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 2 },
                                1250: { slidesPerView: 3 },
                            }}
                        >
                            {reviews.length > 0 ? (
                            reviews.map((r) => (
                                <SwiperSlide key={r.id}>
                                    <div className='review bg-white rounded-3xl shadow-md hover:shadow-xl transition-shadow p-8 w-[380px] mx-auto relative border border-stone-200'>
                                        <div className='absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C5A059] rounded-full w-12 h-12 flex items-center justify-center shadow-md'>
                                            <p className='text-3xl text-white font-serif'>"</p>
                                        </div>
                                        <p className='text-stone-600 mt-8 text-base leading-relaxed text-center'>
                                            {r.review}
                                        </p>
                                        <div className='flex justify-center items-center gap-1 mt-5'>
                                            {[...Array(r.rating)].map((_, i) => (
                                                <Star key={i} size={16} fill='#C5A059' color='#C5A059' />
                                            ))}
                                        </div>
                                        <p className='text-stone-900 font-serif font-semibold text-center mt-4'>
                                            {r.clientName ? r.clientName : 'Anonymous'}
                                        </p>
                                        <p className='text-sm text-[#C5A059] text-center uppercase tracking-wider'>
                                            {r.serviceName}
                                        </p>
                                    </div>
                                </SwiperSlide>
                            ))
                            ) : (
                            <SwiperSlide>
                                <div className='bg-white rounded-3xl shadow-md p-8 w-[380px] mx-auto border border-stone-200'>
                                    <p className='text-stone-600 text-center'>
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

        {/* CARD 2 - CONTACT */}
        <div id='card-2' className="card-contact-review">
            <div className="card-inner bg-white">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="text-center mb-12">
                        <p className='text-xs font-bold tracking-widest text-[#C5A059] uppercase mb-3'>Get in Touch</p>
                        <h1 className='text-4xl md:text-5xl font-serif text-stone-900 mb-6 leading-tight'>
                            Begin Your <span className='italic text-[#C5A059]'>Wellness Journey</span>
                        </h1>
                        <p className='text-stone-600 text-lg max-w-2xl mx-auto'>
                            Ready to experience care that honors your unique needs? Reach out to schedule your appointment or learn more about our services.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-serif text-2xl text-stone-900 mb-6">Visit Us</h3>
                                <div className="space-y-4 text-stone-600">
                                    {/* <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-[#F9F8F4] rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-[#C5A059]">📍</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-stone-900 mb-1">Location</p>
                                            <p>123 Wellness Boulevard<br />Kuala Lumpur, Malaysia</p>
                                        </div>
                                    </div> */}

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-[#F9F8F4] rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-[#C5A059]">📞</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-stone-900 mb-1">Phone</p>
                                            <p>010-961-2343</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-[#F9F8F4] rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-[#C5A059]">✉️</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-stone-900 mb-1">Email</p>
                                            <p>lesser_trochanter@yahoo.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-[#F9F8F4] rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-[#C5A059]">🕐</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-stone-900 mb-1">Hours</p>
                                            <p>Mon - Sat: 9:00 AM - 7:00 PM<br />Book Your Appointment Today</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#F9F8F4] rounded-3xl p-6 border border-stone-200">
                                <p className="text-stone-600 italic text-center">
                                    "We respond to all inquiries within 24 hours. Your journey to wellness begins with a simple message."
                                </p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-[#F9F8F4] rounded-3xl p-8 border border-stone-200">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                
                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-semibold text-stone-900 mb-2">Email Address</label>
                                    <input 
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="your@email.com"
                                        className="w-full bg-white border border-stone-300 rounded-xl p-4 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#C5A059] transition-all"
                                        required
                                    />
                                </div>

                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-stone-900 mb-2">Full Name</label>
                                    <input 
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Your name"
                                        className="w-full bg-white border border-stone-300 rounded-xl p-4 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#C5A059] transition-all"
                                        required
                                    />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className="block text-sm font-semibold text-stone-900 mb-2">Phone Number</label>
                                    <input 
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="010-123-4567"
                                        className="w-full bg-white border border-stone-300 rounded-xl p-4 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#C5A059] transition-all"
                                        required
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-sm font-semibold text-stone-900 mb-2">Message</label>
                                    <textarea 
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Tell us how we can help you..."
                                        className="w-full bg-white border border-stone-300 rounded-xl p-4 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#C5A059] transition-all resize-none"
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <button 
                                    type="submit"
                                    disabled={isSending}
                                    className="w-full py-4 bg-[#C5A059] text-white font-bold tracking-widest uppercase rounded-full hover:bg-stone-900 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSending ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        </div>


                    </div>
                </div>
            </div>
        </div>

        {/* CARD 3 & 4 - Left as placeholders */}
        <div id='card-3' className="card-contact-review">
         
        </div>

      
    </section>
  )
}

export default Contact_Review
