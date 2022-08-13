import React from 'react';
import "../Components/Cards/Card.scss";
import { Link,useHistory } from "react-router-dom";
import {domain,header} from '../env'
import { useGlobalState } from  "../State/provider";
import axios from "axios";
function AllProduct({products}) {
    const [{profile}, dispatch] = useGlobalState();
    
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
    return (
        <div>
            <div className='row'>
            {products?.map((itemss,i)=>(

                        <div className='col-md-4 ' >
                        <div className="item mb-5">
                            <div className="img-box">
                            <Link to={`singleproduct/${itemss.id}`}> <img src={itemss?.Image} alt=" " /></Link>
                            </div>
                            <div className="details">
                                <h2>{itemss?.ProductName}<br/><span>Karina Collections</span></h2>
                                <div className="price">{itemss?.Price}$</div>
                                <button onClick={()=>addtocart(itemss.id)} className="Cart">Add to cart</button>
                            </div>
                        </div>
                        
                        </div>
                    ))}
        </div>
        </div>
    );
}

export default AllProduct;