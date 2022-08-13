import React,{useState,useEffect} from 'react';
import {domain} from '../../env';
import axios from 'axios';
import Navbar from "../../Components/Navbar/Navbar";
import "./Result.scss"
import Category from './../../Components/Category/Category';
import Footer from './../../Components/Footer/Footer';
import AOS from "aos";
import "aos/dist/aos.css";
import { useParams,useHistory} from 'react-router-dom';
import { useGlobalState } from  "../../State/provider"
function Result (props) {
    const [{profile}, dispatch] = useGlobalState();
    const { id } = useParams();
    const history = useHistory()
const final=(props.location.state).data
console.log(final)
useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const addtocart=async(id)=>{
    profile !== null ? (
     await axios({
       method:'post',
       url:`${domain}/api/addtocart/`,
       data:{"id":id},
       headers: {
           Authorization: `token ${window.localStorage.getItem('token')}`
       },
     }).then(response=>{
       
       dispatch({
         type:"ADD_RELOADPAGE_DATA",
         reloadpage:response.data

       })
     })
    ):( history.push("/login"))
   }
    return (
        
   
          <>                
        <div className='Detail'>
          <Navbar/> 
          {final?.map((items,index) => (
                          
                          <>
                          
        <div className='container detailProduct mb-5'>
            <div className='row  border'>
                <div className='col-md-5'>
            
                  <h4 className='title'>{items.ProductName}</h4>
                  <h5 className='detailPrice'>{items.Price}$</h5>
                  <p className='detailText'>{items?.Description}</p>
                    <div class="text-center">
                    <button onClick={()=>addtocart(items.id)} className="btnWhite">Add to cart</button>
                    </div>
                </div>
                <div className='col-md-6 '>
                    <div className='text-center'>
                    <div data-aos="fade-down"
                        data-aos-duration="1500">
                        <img src={items.Image} className="detailImg"/>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>

            <div className="container ">
                
                <div className='row'>
                    <div className='col-md-5'>
                        <div className="text-center">
                        <div data-aos="fade-up"
                      data-aos-duration="1500">
                         <img src={items.ShadeImage} className='rounded-circle detailsRoundImg' alt="..."/>
                        </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                    <h4 className='MoreDetails'>Details</h4>
                        <p className='MoredetailText'>  {items.Detail}
                        <br></br>
                        <b>Shades:</b>
                        
                        <br/>
                        {items.ShadeName}
                        <br/>{items.WeightProduct}</p>
                        </div>
                    
                </div>
            </div>
            <div className='container youtube'>
            <div data-aos="fade-up"
            data-aos-duration="1500">
                <div className='row'>
              
                    <div className='col-md-6 youtubeVideo text-center'>
                    <iframe width="450" height="305"
                        src={items.Video}>
                    </iframe>
                    </div>
                    <div className='col-md-6'>
                      <h4 className='youtubeTitle text-center mb-4'>Tips</h4>
                        <p className='youtubeText text-center'>{items.Tips}</p>
                    </div>
                </div>
                </div>
            </div>

            <Category/>
            <Footer/>
            </>
                              
                              
                              ))}
         </div>   
        
     
         </>

        
    );
};

export default Result;