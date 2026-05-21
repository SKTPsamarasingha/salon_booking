import Hero from "../../components/HomePage/Hero.jsx";
import Services from "../../components/HomePage/Services.jsx";
import About from "../../components/HomePage/About.jsx";
import Gallery from "../../components/HomePage/Gallery.jsx";
import Team from "../../components/HomePage/Team.jsx";
import Bookingcta from "../../components/HomePage/Bookingcta.jsx";
import Testimonials from "../../components/HomePage/Testimonials.jsx";
import BookingModal from "../../components/common/Bookingmodal.jsx";

import {services, employees, galleryItems, testimonials} from "../../api/constant.js";
import {useState} from "react";


const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false);


    return (<main className={'overflow-hidden'}>
        <Hero setIsOpen={setIsOpen}/>
        <About/>
        <Services
            setIsOpen={setIsOpen}
            services={services}/>

        <Gallery galleryItems={galleryItems}/>
        <Team team={employees}/>
        <Testimonials
            testimonials={testimonials}/>
        <Bookingcta setIsOpen={setIsOpen}/>

        <BookingModal isOpen={isOpen} setIsOpen={setIsOpen}/>

    </main>)
}
export default HomePage
