import {useEffect} from 'react'
import gsap from 'gsap';

const Tryhard = () => {
    useEffect(() => {
        let ctx = gsap.context(() => {
            const cards = gsap.utils.toArray(".tryhard")

            cards.forEach((card, index) => {
                if(index < cards.length - 1) {
                    const cardInner = card.querySelector(".tryhard-inner")

                    gsap.fromTo(cardInner, 
                    {
                        y: "0%",
                        z: 0,
                        rotationX: 0
                    }, 
                    {
                        y: "-50%",
                        z: -500,
                        rotateX: -45,
                        scrollTrigger: {
                            trigger: cards[index + 1],
                            start: "top 85%",
                            end: "top -75%",
                            scrub: true,
                            pin: card,
                            pinSpacing: false
                        }
                    })
                }
            })
        })
        return () => ctx.revert();
    },[])
  return (
    <section className='relative w-screen min-h-screen'>
        <div className='tryhard' id='tryhard-1'>
            <div className="tryhard-inner bg-blue-300">
                <div className="tryhard-info">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <div className="tryhard-title">
                    <h1>Reverie</h1>
                </div>
                <div className="tryhard-description">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae molestias iure veniam! Assumenda ab incidunt, rem excepturi, esse asperiores reiciendis laboriosam, officiis repellendus illo laborum!</p>
                </div>
                <div className="tryhard-img">
                    <img className='w-full h-full object-cover' src='/images/menu.png' alt=''/>
                </div>
            </div>
        </div>


        <div className='tryhard' id='tryhard-2'>
            <div className="tryhard-inner bg-green-300">
                <div className="tryhard-info">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <div className="tryhard-title">
                    <h1>Reverie</h1>
                </div>
                <div className="tryhard-description">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae molestias iure veniam! Assumenda ab incidunt, rem excepturi, esse asperiores reiciendis laboriosam, officiis repellendus illo laborum!</p>
                </div>
                <div className="tryhard-img">
                    <img className='w-full h-full object-cover' src='/images/menu.png' alt=''/>
                </div>
            </div>
        </div>


        <div className='tryhard' id='tryhard-3'>
            <div className="tryhard-inner bg-pink-300">
                <div className="tryhard-info">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <div className="tryhard-title">
                    <h1>Reverie</h1>
                </div>
                <div className="tryhard-description">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae molestias iure veniam! Assumenda ab incidunt, rem excepturi, esse asperiores reiciendis laboriosam, officiis repellendus illo laborum!</p>
                </div>
                <div className="tryhard-img">
                    <img className='w-full h-full object-cover' src='/images/menu.png' alt=''/>
                </div>
            </div>
        </div>


        <div className='tryhard' id='tryhard-4'>
            <div className="tryhard-inner bg-purple-300">
                <div className="tryhard-info">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <div className="tryhard-title">
                    <h1>Reverie</h1>
                </div>
                <div className="tryhard-description">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae molestias iure veniam! Assumenda ab incidunt, rem excepturi, esse asperiores reiciendis laboriosam, officiis repellendus illo laborum!</p>
                </div>
                <div className="tryhard-img">
                    <img className='w-full h-full object-cover' src='/images/menu.png' alt=''/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Tryhard