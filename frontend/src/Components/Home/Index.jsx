import React,{useEffect} from "react";
import "./Index.scss";
import Navbar from '../Navbar/Navbar';
import f from "./f.png"
import Cards from "../Cards/Card"
import Finder from "../Shade Finder/Finder"
import Category from "../Category/Category"
import About from "../About/About";
import Advertize from "../Advertisment/Advertize";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../Footer/Footer";
function Index() {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);
    
    return (
     <div>
        <div className="wrapper">
            <div className="half-circle">
            </div>
            <Navbar></Navbar>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3" >
                        <div data-aos="fade-up" data-aos-duration="1500">
                        <img src={f} className="images"/>
                        </div>
                    </div>
                    <div className="col-sm-8">                    

                   <div data-aos="zoom-in-up"  data-aos-easing="linear"
                  data-aos-duration="1000">
                    <h5 className="HomeTitle">Beauty Product that work</h5>
                    
                    <p className="HomeText">Our formulations have proven efficacy, contain organic ingredients
                         only and are 100% cruelty free.</p>
                         

                   <Link to='/shop'><button type="button" class="btn-shop">Shop All</button></Link>
                    </div>
                    </div>
                </div>
            </div>
         </div>
         <Cards/>
         <About/>
         <Finder/>
        
         <Category/>
         
         <Footer/>
        </div>
    
    );
}  
export default Index;