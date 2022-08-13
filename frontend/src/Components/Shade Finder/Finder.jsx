import React,{useEffect} from "react";
import "./Finder.css";
import white from "./white.jpg"
import medium from "./center.png"
import scale from "./scale.png"
import black from "./black.jpg"
import smallScale from "./smallScale.png"
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
const Finder=()=> {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);
    return(
        <div className="Finder container">

      <div data-aos="zoom-in"
            data-aos-duration="1800"> 
            <h2 className="header1">Foundation</h2>
            <h4 className="header2">Shade <i>Finder</i></h4>
            
               <Link to='/shadefinder/'><button type="button" class="btn-match">MATCH ME</button></Link>
               </div>
               <p className="ShadeParagraph">Find your best shade, along with complexion must-haves perfect for your skin tone. All in just 3 simple steps. </p>
               <div className="container ">
               <div data-aos="fade-up"
                        data-aos-duration="1500">
                   <div className="row " >
                   
                       <div className="col-4 text-center ">
                       <img src={white} className="images1 text-center"/>
                       </div>
                       <div className="col-4 text-center" >
                       <img src={medium} className="images2"/> 
                       </div>
                       <div className="col-4 text-center" >
                       <img src={black} className="images3"/>  
                       </div>
                    </div>
                   </div>
               </div>
               
               <img src={scale} className="d-none d-sm-block  mt-5 mx-auto d-blocks"/>
               <img src={smallScale} className="d-sm-block d-md-none mt-3"/>
               
        </div>
    );
}
export default Finder;