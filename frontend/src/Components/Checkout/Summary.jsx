import React from 'react';
import {useGlobalState} from "../../State/provider"
import {domain} from "../../env"
import axios from "axios"
const Summary = () => {
    const[{cartproductf_uncomplit},dispatch]=useGlobalState()
  const tokenget = window.localStorage.getItem('token')
    return (
        
             <div className='col-md-6 mt-5 text-center'>
                 
                        <div className='Summary '/>
                        
                        <div className="card mt-5">
                            <div className="card-body ">
                           
                                <div className='row'>
                                    <div className='col-4'>
                                   <h6>Product</h6>
                                    </div>
                                    <div className='col-4'>
                                    <h6>Product Name</h6> 
                                    </div>
                                    <div className='col-4'>
                                    <h6>Price</h6>
                                    
                                    </div>
                                    <hr/>
                                {cartproductf_uncomplit?.cartproduct.map((items,i)=>(<>
                                    <div className='col-md-4'>
                                        
                                        <img src={items.product[0].Image} alt='product' height={70}/>

                                    </div>
                                  
                                    <div className='col-md-4'>
                                        <p>{items.product[0].ProductName}</p>
                                    </div>
                                    <div className='col-md-4'>
                                        <h5>{items.price}$</h5>
                                        </div>
                                        <hr/>
                                        </>))}
                                    </div>
                                    
                                   
                                        <div className='row'>
                                     
                                        </div>
                                        
                                        <div className='row'>
                                        <div className='col-4 text-center'>
                                             <p>Total</p>
                                            </div>
                                            <div className='col-4'></div>
                                        <div className='col-4'>
                                            <p>{cartproductf_uncomplit?.total}$</p>
                                            </div>
                                        </div>
                                   
                        </div>
                        </div>
                    </div>
    
    );
};

export default Summary;