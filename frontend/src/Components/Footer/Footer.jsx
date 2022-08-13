import React,{useEffect} from "react";
import './Footer.scss';
import {Link} from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";
function Footer(props) {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className='Footers'>
      <div className='container col-md-10'>
        <div className='row'>
          <div className='col-md-4 text-center'>
           <h2>COSMOLINE</h2>
           <div data-aos="fade-up"
            data-aos-duration="1500">
        <i className="bi-facebook icon"></i><i className="bi-instagram icon"></i><i className="bi-twitter icon"></i><i className="bi-youtube icon"></i>
           </div>
          </div>
          <div className='col-md-4 text-center '>
            <h6>Links</h6>
           <Link to='/shop'> <p>Shop All</p></Link>
           <Link to='/sale'> <p>Sale</p></Link>
           
           <Link to='/shadefinder'><p>Shade Finder</p></Link>
         
            
          </div>
          <div className='col-md-4 text-center'>
          <h6>Customer Service</h6>
          <Link to='/pages/faqs'> <p>FAQ</p></Link>
          </div>
        </div>
        <hr/>
      </div>
      
      <p className='text-center'>
© 2022 Cosmoline all rights reserved </p>
    </div>
  );
}

export default Footer;