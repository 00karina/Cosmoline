import React, { useEffect, useState } from 'react';
import {domain} from "../../env"
import Navbar from '../Navbar/Navbar';
import "./Details.scss"
import axios from 'axios';
import { useParams,useHistory} from 'react-router-dom';
import { useGlobalState } from  "../../State/provider"
import Footer from './../Footer/Footer'
import Category from './../Category/Category'
import Carousel from "react-grid-carousel";
import { Link } from 'react-router-dom';
import "aos/dist/aos.css";
import AOS from "aos";
const Details = () => {
    const[singleproduct,setsingleProduct]=useState([])
    const [categoryproduct, setCategoryproduct] = useState([])
    const [{profile}, dispatch] = useGlobalState();
    const { id } = useParams();
    const history = useHistory()
    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);
    const getsingleProduct= async ()=> {
        const{ data }=await axios.get(`http://127.0.0.1:8000/api/product/${id}/`)
        console.log(data)
        setsingleProduct(data)
        console.log(data.category)
        getcatdata(data.category)
       
        
    }
  
    const getcatdata = async (id) => {
        await axios({
            method: "get",
            url: `${domain}/api/category/${id}/`
        }).then(response => {
            setCategoryproduct(response?.data[0].category_product)
            console.log(response?.data[0].category_product)
            console.log(categoryproduct.ProductName)
        
        })
    }
  
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
    useEffect(()=>{
        getsingleProduct();
    },[])
    return (
        <>
        <div className='Detail'>
          <Navbar/> 
        <div className='container detailProduct mb-5'>
            <div className='row'>
                <div className='col-md-5 text-center'>
                  <h4 className='title'>{singleproduct.ProductName}</h4>
                  <h5 className='detailPrice'>{singleproduct.Price}$</h5>
                  <p className='detailText'>{singleproduct?.Description}</p>
                    <div class="text-center">
                         <button type="button" onClick={()=>addtocart(singleproduct.id)} class="btn btnWhite">ADD TO BAG</button>
                    </div>
                </div>
                <div className='col-md-6 '>
                    <div className='text-center'>
                        <img src={singleproduct.Image}  className="detailImg"/>
                        
                    </div>
                </div>
            </div>
        </div>

            <div className="container  text-center">
                <div className='row'>
                    <div className='col-md-5'>
                    <div data-aos="fade-up"
            data-aos-duration="1500">
                        <div className="text-center">
                         <img src={singleproduct.ShadeImage}  className='rounded-circle detailsRoundImg' alt="..."/>
                        </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                    <h4 className='MoreDetails'>Details</h4>
                        <p className='MoredetailText'>{singleproduct.Detail}
                        <br></br>
                        <b>Shades:</b>
                        <br/>
                         {singleproduct.ShadeName}
                        <br/> {singleproduct.WeightProduct}</p>
                        </div>
                    
                </div>
            </div>
            <div className='container youtube'>
            <div data-aos="fade-up"
            data-aos-duration="1500">
                <div className='row'>
               
                    <div className='col-md-6 youtubeVideo text-center'>
                    <iframe width="450" height="305"
                        src={singleproduct.Video}>
                    </iframe>
                    </div>
                   
                    <div className='col-md-6'>
                      <h4 className='youtubeTitle text-center mb-4'>Tips</h4>
                        <p className='youtubeText text-center'>{singleproduct.Tips}</p>
                    </div>
                    </div>
                </div>
            </div>
            <div className='container similar mb-5'>
                <h2 className='text-center mb-5'>Similar Product</h2>
                <div data-aos="fade-up"
            data-aos-duration="1500">
            <Carousel cols={3} rows={1} gap={2} loop>
            {
                    categoryproduct !== null  && 
                    categoryproduct.map((itemss, i) => (
                        
                             <Carousel.Item>
                         <div className="item" key='i'>
                            <div className="img-box">
                            <Link to={`singleproduct/${itemss.id}`}> <img src={itemss?.Image} alt=" " /></Link>
                            </div>
                            <div className="productdetail">
                                <h2>{itemss?.ProductName}<br/><span>Karina Collection</span></h2>
                                <div className="price">{itemss?.Price}$</div>
                                <button onClick={()=>addtocart(itemss.id)} className="Carts">Add to cart</button>
                            </div>
                        </div>
                        </Carousel.Item>
                        

                        
                    ))
                }
                </Carousel>
                </div>
                </div>
          <Category/>
           <Footer/>
         </div>   
        
        </>
    );
};

export default Details;