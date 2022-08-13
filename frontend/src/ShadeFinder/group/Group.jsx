import React,{useState,useEffect} from 'react';
import './group.scss';
import Navbar from '../../Components/Navbar/Navbar'
import blue from '../../Image/blue.png';
import orange from '../../Image/orange.png';
import purple from '../../Image/purple.png';
import { Link } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
const Group = (props) => {
    const [image1,setimage1]=useState("");
    console.log(image1)
    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);
    return(
          <>
         
          <div className='group'>
          <div className='container'>
          <div data-aos="fade-up"
            data-aos-duration="1500">
          <h4>What's your Undertone?</h4>
          <h6>Choose the group that best represents your skin tone.</h6>
          </div>
          <div className='row mt-5'>
              <div className='col-md-4  mt-4'>
                  <img src={orange} alt=''/>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value='tags'

                    />
                            <label class="form-check-label" for="flexRadioDefault1" value='jpt'>
                                WARM
                            </label>
                        <p>On the yellow-peach-golden side.</p>
                    </div>
               </div>
               <div className='col-md-4 mt-4 '>   
               <img src={blue} alt=''/>    
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                        <label class="form-check-label" for="flexRadioDefault2">
                            NEUTRAL
                        </label>
                      <p>Not too pink,not too yellow - kind of both</p>
                    </div>
                </div>
                <div className='col-md-4 mt-4'>   
               <img src={purple} alt=''/>    
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                        <label class="form-check-label" for="flexRadioDefault2">
                            COOL
                        </label>
                        <p>On the pink,red,blue side</p>
                    </div>
                </div>
             {image1}
            </div>
            <div className='text-center mt-2'>
                   <Link to='/shadefinder/step2/' ><button className='skinButton btn'>Continue<i class="bi-chevron-double-right"></i></button></Link>
                    </div>
              </div>
              <Navbar/>
          </div>
          </>  
    );
}

export default Group;