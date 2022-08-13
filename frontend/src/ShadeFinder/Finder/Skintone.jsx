import React,{useState,useEffect} from 'react';
import Navbar from '../../Components/Navbar/Navbar'
import Shade from '../../Image/shade.png'
import light1 from '../../Image/light1.png'
import m1 from '../../Image/omedium1.png'
import medium from '../../Image/medium.png'
import mdeep from '../../Image/mdeep1.png'
import mdeeps from '../../Image/medeep.png'
import dark from '../../Image/dark2.png'
import axios from 'axios';
import './Skintone.scss';
import { Link } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import smallscale from './smallScale.png'

const Skintone = (props) => {
  const[shadefinder, setShadefinder]=useState([""])
  const [showResults, setShowResults] = useState(false)
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  useEffect(() => {
    const getShadefinder = async () => {
      await axios({
        url: `http://127.0.0.1:8000/api/tagsProduct/`,
        method: "GET",
        
        
      })
        .then((response) => {
          console.log(response.data);
          setShadefinder(response.data);
        })
        .catch((error) => {
        console.log("tagsProduct", error);
        });
    };
    getShadefinder();
  }, []);
  const[data,setData]=useState(shadefinder)  
  const filterResult=(catItem)=>{
    const result=shadefinder.filter((curData)=>{
      console.log(curData.text)
      return curData.text===catItem;

    });
    setData(result[0].products);
    setShowResults( <div className='text-center mt-4'> 
    <button className='skinButton btn' > Result<i class="bi-chevron-double-right"></i></button>
     </div>)
    console.log(data)
    console.log(showResults)
    
  }

 
    
    return(

            <>
         
            <div className='skintone'>
              
                <div className='container'>
               
               
                    <h4>Find Your Shade Range</h4>
                    
                    <h6>Choose the group that best represents your skin tone.</h6>
                    <div data-aos="fade-up"
            data-aos-duration="1500">
                    <img src={Shade} alt='shade'  className="d-none d-sm-block  mt-5 mx-auto d-blocks mb-5"/>
                    <img src={smallscale} className="d-sm-block d-md-none mt-3"/>
                    <div className='row'>
                        <div className='col-md-2 mt-2 text-center'>
                     <button onClick={()=>filterResult('skin1')} > <img src={light1} alt='shade' height={150}/>
                     </button>
                     
                     
                
                        </div>
                         <div className='col-md-2 mt-2 text-center'>
                         <button onClick={()=>filterResult('skin2')}><img src={medium} alt='shade' height={150}/></button>
                         </div>
                        
                        <div className='col-md-2 mt-2 text-center'>
                        <button onClick={()=>filterResult('skin3')}><img src={m1} alt='shade' height={150}/></button>
                        </div>
                        <div className='col-md-2 mt-2 text-center'>
                        <button onClick={()=>filterResult('skin4')}><img src={mdeep} alt='shade' height={150}/></button>
                        </div>
                        <div className='col-md-2 mt-2 text-center'>
                        <button onClick={()=>filterResult('skin5')}><img src={mdeeps} alt='shade' height={150}/></button>
                        </div>
                        <div className='col-md-2 mt-2 text-center'>
                        <button onClick={()=>filterResult('skin6')}><img src={dark} alt='shade' height={150}/></button>
                        </div>
                
                    </div>
                   
                    
                    <Link to={{pathname:"/shadefinder/final-result/product/",state:{data} }} >{showResults }</Link>

                    </div>     
                    <Navbar />
                    
                    
                 
            </div>
                 
                    
              </div>
                    
            </>
    );
}


export default Skintone;