import React, { useState,useEffect } from 'react';
import Carousel from "react-grid-carousel";
import "./Card.scss";
import axios from "axios"
import AOS from "aos";
import "aos/dist/aos.css";
import { Link,useHistory } from "react-router-dom";
import {domain,header} from "../../env"
import { useGlobalState } from  "../../State/provider"
const Card=()=> {
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
          url: `http://127.0.0.1:8000/api/AllProduct/`,
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
        <div class="CardsSeller">
            <div className='container'>
            <h6 className='BestSeller text-center'>Shop All</h6>
       
           
            <div data-aos="fade-up"
                        data-aos-duration="1500">
               <Carousel cols={3} rows={1} gap={6} loop>
               {category?.map((itemss, i) => (
        
          <Carousel.Item>
  
            <div className="item">
                            <div className="img-box">
                            <Link to={`singleproduct/${itemss.id}`}> <img src={itemss?.Image} alt=" " /></Link>
                            </div>
                            <div className="details">
                                <h2>{itemss?.ProductName}<br/><span>Karina Collection</span></h2>
                                <div className="price">{itemss?.Price}$</div>
                                <button onClick={()=>addtocart(itemss.id)} className="Cart">Add to cart</button>
                            </div>
                        </div>
      
        </Carousel.Item>
      
           ))}
  
        </Carousel>
        </div>

   </div>
   </div>

 );

};
    
    export default Card;