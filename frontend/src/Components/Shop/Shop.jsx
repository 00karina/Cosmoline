
import Navbar from "../Navbar/Navbar"
import './shop.scss';
import axios from "axios";
import React, { useState,useEffect } from 'react';
import AllProduct from "../../Common/AllProduct";
import Footer from '../Footer/Footer'
function Shop() {
    const[category, setCategory]=useState([""])
    
    useEffect(() => {
      const getCategory = async () => {
        await axios({
          url: `http://127.0.0.1:8000/api/categoryProduct/`,
          method: "GET",
          
          
        })
          .then((response) => {
            console.log(response.data);
            console.log(response.data[0]);
            setCategory(response.data);
          })
          .catch((error) => {
            console.log("CategoryProduct", error);
          });
      };
      getCategory();
    }, []);

  const[data,setData]=useState()   
   const filterResult=(catItem)=>{
     const result=category.filter((curData)=>{
       return curData==catItem;
     });
     setData(result);
   }

    

    return (
        <>
      
        <div className='shop'>
            <div className='container  ShopProduct'>
                <h2 className='shopText'>Our Best Selling Makeup Products</h2>
                <div className='container-fluid '>
                    <div className='col-md-6  text-center '>
                        <h4 className='shopHeading text-center'> Categories</h4>
                      
                        {category?.map((category,index) => (
                          
                           
                        <button type="button" class="btn btnShop" onClick={()=>filterResult(category)}> {category.name} </button>
                        
                        
                        
                        ))}
                        </div>
                        </div>
                        
            <div className="container">
            <div className="row " >
            {data?.map((items, i) => (
                
                    <AllProduct products={items?.products} ></AllProduct>
                    


            ))}
                </div>
         
            
              </div>
                       
               
                </div>
            

            
             </div>   
            
            <Navbar/>
           
            
       
        
        </>
        
    );
}

export default Shop;