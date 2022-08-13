import React,{useState,useEffect} from 'react';
import './final.scss';
import yellow from '../../Image/yellow.jpg';
import silver from '../../Image/silver.jpg';
import both from '../../Image/both.jpg';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import AOS from "aos";
import "aos/dist/aos.css";
const Finalquestion = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
    return (
        <div>
            <div className='final'>
            
              <div className='container'>
                  <h4>What Jwellery Suits You?</h4>
                  <h6>Choose tone of jewelry do you look best in.</h6>
                  <div className='row'>
                    <div className='col-md-4  '>
                    <div data-aos="fade-up"
            data-aos-duration="1500">
                      <img src={silver} alt='yellow' height={200}/>
                      </div>
                  <div class="form-check mt-3">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
  <label class="form-check-label" for="flexRadioDefault1">
   <p>SILVER/PLATINUM</p>
  </label>
</div>
</div>
<div className='col-md-4'>
<div data-aos="fade-up"
            data-aos-duration="1500">
<img src={yellow} alt='yellow' height={200}/>
</div>
<div class="form-check mt-3">
  <input class="form-check-input " type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
  <label class="form-check-label" for="flexRadioDefault2">
  <p>YELLOW GOLD</p>
  </label>
</div>
</div>

<div className='col-md-4 '>

<div data-aos="fade-up"
            data-aos-duration="1500">
<img src={both} alt='yellow' height={200} width={300}/>
</div>
<div class="form-check mt-3">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
  <label class="form-check-label" for="flexRadioDefault2">
  <p>BOTH</p>
  </label>
</div>
</div>


                    <div className='row container pl-5 pr-5'>
                <div className="col-6 text-center  ">
            <Link to='/shadefinder/step1/' ><i class="bi-chevron-double-left"></i><button className='skinButton btn'>PREVIOUS</button></Link>
            </div>
            <div className="col-6  text-center">
            <Link to='/shadefinder/step3/' ><button className='skinButton btn'>CONTINUE   <i class="bi-chevron-double-right"></i></button></Link>
              </div>
              </div>
                  </div>

                  </div>
                </div>
                <Navbar/>
        </div>
    );
};

export default Finalquestion;