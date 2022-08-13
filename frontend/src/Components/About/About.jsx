import React,{useEffect} from 'react';
import karina from '../../Image/karina.png'
import AOS from "aos";
import "aos/dist/aos.css";
import './About.scss'
const About = (props) => {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);
    
    return(
            <>
            <div className='container about'>
                <div className='row'>
                    <div className='col-md-6 '>
                    <div data-aos="fade-up" data-aos-duration="1500">
                        <img src={karina} className="rounded-circle img-circle" alt="Cinque Terre" /> 
                    </div>
                    </div>
                    <div className='col-md-6 text-center'>
                    <div data-aos="fade-up" data-aos-duration="1500">
                        <h4>Why Choose Cosmoline?</h4>
                        <p>Cosmoline is breaking down unrealistic standards of perfection. This is makeup made to feel good in, without hiding what makes you unique—because Rare Beauty is not about being someone else, but being who you are.</p>
                    </div>
                    </div>
                </div>
            </div>
            </>
)};

export default About;