import React from 'react';

const AboutPage = () => {
  return (
    <section id="about" className="py-24 bg-[#F9F8F4]">
      {/* Hero Text Section */}
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-20">
        <div className="md:col-span-4">
          <div className="inline-block mb-3 text-xs font-bold tracking-widest text-[#C5A059] uppercase">About Us</div>
          <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight text-stone-900">
            Where <span className="italic text-[#C5A059]">Tradition</span> Meets Modern Wellness
          </h2>
          <div className="w-16 h-1 bg-[#C5A059] mb-6"></div>
        </div>
        
        <div className="md:col-span-8 text-lg text-stone-600 leading-relaxed space-y-6">
          <p>
            <span className="text-5xl float-left mr-4 mt-[-8px] font-serif text-[#C5A059]">N</span>aila's Spa was born from a personal journey. After experiencing traditional Malaysian postnatal care, our founder Naila created a sanctuary blending time-honored healing practices with modern wellness.
          </p>
          <p>
            What began as a passion for new mothers has grown into a holistic wellness center for all. We've built a space where <strong className="text-stone-900">healing is personalized, compassionate, and rooted in both heritage and innovation</strong>.
          </p>
          <p className="text-stone-500 italic">
            "Our mission: to help you feel whole again."
          </p>
        </div>
      </div>

      {/* Image + Text Blocks */}
      <div className="container mx-auto px-6 md:px-12 space-y-20">
        
        {/* Block 1 - Our Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative group overflow-hidden rounded-3xl shadow-lg h-[400px] order-2 md:order-1">
            <img 
              className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105' 
              src='https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=800' 
              alt='Naila spa interior'
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent"></div>
          </div>

          <div className="space-y-4 order-1 md:order-2">
            <span className="text-xs font-bold tracking-widest text-[#C5A059] uppercase">Our Story</span>
            <h3 className="font-serif text-3xl text-stone-900 leading-tight">
              Built on Compassion, <br />Guided by Experience
            </h3>
            <p className="text-stone-600 leading-relaxed">
              Naila founded this spa after her own postpartum experience revealed a gap in accessible, culturally-grounded care. Drawing on her grandmother's traditional massage knowledge, she trained to blend ancient wisdom with modern techniques.
            </p>
            <p className="text-stone-600 leading-relaxed">
              Today, our certified therapists share Naila's commitment to treating every client with expertise and genuine care.
            </p>
          </div>
        </div>

        {/* Block 2 - Our Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold tracking-widest text-[#C5A059] uppercase">Our Philosophy</span>
            <h3 className="font-serif text-3xl text-stone-900 leading-tight">
              Healing That Honors <br />Your Unique Journey
            </h3>
            <p className="text-stone-600 leading-relaxed">
              We believe wellness isn't one-size-fits-all. Whether you're navigating recovery, managing an injury, or seeking restoration from daily stress, our approach is tailored to you.
            </p>
            <p className="text-stone-600 leading-relaxed">
              At Naila's Spa, you're part of a community that values rest, renewal, and prioritizing your well-being.
            </p>
          </div>

          <div className="relative group overflow-hidden rounded-3xl shadow-lg h-[400px]">
            <img 
              className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105' 
              src='https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800' 
              alt='Wellness and care'
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent"></div>
          </div>
        </div>

      </div>

      {/* Bottom Quote Section */}
      <div className="container mx-auto px-6 md:px-12 mt-24">
        <div className="bg-white rounded-3xl shadow-sm p-12 md:p-16 text-center border border-stone-200">
          <p className="font-serif text-2xl md:text-3xl text-stone-800 mb-6 leading-relaxed italic">
            "We honor the person behind the symptoms. <br className="hidden md:block" />
            Your healing is our purpose."
          </p>
          <p className="text-stone-500 text-sm uppercase tracking-widest">— Naila, Founder</p>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
