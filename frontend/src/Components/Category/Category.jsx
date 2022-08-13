import React,{useEffect} from "react";
import face from "./face.jpeg";
import eye from "./eye.jpeg";
import lips from "./lips.jpg";
import "./Category.css";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";
import Advertize from "../Advertisment/Advertize";
function Category() {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);
    return(
        <>
        <div className="Category">
        <div className="container pb-5">
            <h3>Shop by Category</h3>
            <div data-aos="fade-up"
            data-aos-duration="1500">
           <div className="row">
          
               <div className="col-6 text-center">
                 <Link to='/shop'><img src={eye} className="pic1"/></Link>
                 <h5 className="Face">Face</h5>
                 </div>
               
               <div className="col-6 text-center">
               <Link to='/shop'><img src={face} className="pic2"/></Link>
                <h5 className="eye ">Eye</h5>
               </div>
           </div>
        </div>


        <div data-aos="fade-up"
            data-aos-duration="1500">
           <div className="row " >
               <div className="col-6">
                </div>
               
               <div className="col-6 text-center">
               <Link to='/shop'> <img src={lips} className="pic3 mb-5"/></Link>
               <h5 className="lip">Lip</h5>
               </div>
           </div>
           </div>
        </div>
        <Advertize/>
        </div>
        </>
    );
}
export default Category;