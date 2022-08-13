import React from 'react';
import './Starter.scss';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { Link } from 'react-router-dom';
import faq from '../../src/Image/faq.png'
function Starter(props) {
    return (
        <>
      
        <div className='Starter'>
           
        <Navbar/>
        
       <Link to='/shadefinder/step1/'><button className='btn btn buttons'>FIND MY SHADE</button></Link>
       <Link to='/shop'><button className='btn btn buttonss'>I KNOW MY SHADE</button></Link>
       <Link to='/pages/faqs'><img src={faq} alt='faq' className='icons' height={70}/></Link>
        </div>
        
        
        <Footer/>
        </>
    );
}

export default Starter;