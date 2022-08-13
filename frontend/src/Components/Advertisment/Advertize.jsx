import React,{useEffect} from "react";
import happy from './happy.jpg';
import './Advertize.scss';
import "aos/dist/aos.css";
import AOS from "aos";
function Advertize(props) {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);
    return (
        <div className='advertize'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                    <div data-aos="fade-up"
            data-aos-duration="1500">
                        <img src={happy} alt='happy' className="img-fluid"/>
                        </div>

                    </div>
                    <div className='col-md-6 mt-4'>
                        <h5>Make an impact on mental health</h5>
                        <p>1% of Cosmoline annual sales will go directly to the Rare Impact Fund to expand mental health services in underserved communities.</p>

                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Advertize;