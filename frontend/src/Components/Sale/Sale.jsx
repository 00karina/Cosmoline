import React, { useState,useEffect } from 'react';
import axios from "axios";
import Navbar from '../Navbar/Navbar'
import AOS from "aos";
import "aos/dist/aos.css";
import { Link,useHistory } from "react-router-dom";
import {domain,header} from "../../env"
import { useGlobalState } from  "../../State/provider";
import Footer from '../Footer/Footer';
import './Sale.scss'
import background from './background.jpg'
function Sale(){
    const [{profile}, dispatch] = useGlobalState();
    const[category,setProducts]=useState([])
    const history = useHistory()
   const addtocart=async(id)=>{
    profile !== null ? (
     await axios({
       method:'post',
       url:`${domain}/api/addtocart/`,
       data:{"id":id},
       headers:header
     }).then(response=>{
       console.log(response.data,"111add to cart1111")
       dispatch({
         type:"ADD_RELOADPAGE_DATA",
         reloadpage:response.data

       })
     })
    ):( history.push("/login"))
   }
    useEffect(() => {
      const getProducts = async () => {
        await axios({
          url: `http://127.0.0.1:8000/api/discountProduct/`,
          method: "GET",
          
          
        })
          .then((response) => {
            console.log(response.data);
            setProducts(response.data);
          })
          .catch((error) => {
            console.log("CategoryProduct", error);
          });
      };
      getProducts();
    }, []);
    useEffect(() => {
      AOS.init();
      AOS.refresh();
    }, []);

        return (
            <div>
                 <div className="sale">
                  
                   <div className='container'>
                   <div data-aos="fade-up"
            data-aos-duration="1500">
            <div className="row " style={{marginTop:"80px"}}>
          
            {category?.map((itemss, i) => (
                    <div className="col-md-4 mt-5">
                    <div className="item">
                            <div className="img-box">
                         <img src={itemss?.Image} alt=" " />
                            </div>
                            <div className="details">
                                <h2>{itemss?.ProductName}<br/><span>Karina Collections</span></h2>
                                <div className="price">{itemss?.Price}$</div>
                                <div className="discount">{itemss?.discount}$</div>
                                <button onClick={()=>addtocart(itemss.id)} className="Cart">Add to cart</button>
                            </div>
                        </div>
                   </div>

            ))}
            </div>
         
            </div>
            </div>
              <Navbar/>
               
              </div>
              <div className='container'>
              <hr/>
              </div>
              <Footer/>
            </div>
           
        );
    }


export default Sale;