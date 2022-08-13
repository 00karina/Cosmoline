import React from 'react';
import "./AddToCart.scss"
import {useGlobalState} from "../../State/provider"
import {domain} from "../../env"
import axios from "axios"
import { Link } from 'react-router-dom';
import Navbar from "../Navbar/Navbar"
const AddCart = () => {
  const[{cartproductf_uncomplit},dispatch]=useGlobalState()
  const tokenget = window.localStorage.getItem('token')
  let cart_product_length = 0;
  if (cartproductf_uncomplit !== null) {
      cart_product_length = cartproductf_uncomplit?.cartproduct?.length
      
  } else {
      cart_product_length = 0;
      cartproductf_uncomplit.total = 0;
      
     
      
  }
  

  const updatecartproduct = async (id) => {
      await axios({
          method: 'post',
          url: `${domain}/api/updatecart/`,
          headers: {
              Authorization: `token ${tokenget}`
          },
          data: { "id": id }
      }).then(response => {
          console.log(response);
          dispatch({
              type: "ADD_RELOADPAGE_DATA",
              reloadpage: response
          })
      })
  }
  const editcartproduct = async (id) => {
      await axios({
          method: 'post',
          url: `${domain}/api/editcart/`,
          headers: {
              Authorization: `token ${tokenget}`
          },
          data: { "id": id }
      }).then(response => {
          // console.log(response);
          dispatch({
              type: "ADD_RELOADPAGE_DATA",
              reloadpage: response
          })
      })
  }


  const delatecartproduct = async (id) => {
      await axios({
          method: 'post',
          url: `${domain}/api/deletecart/`,
          headers: {
              Authorization: `token ${tokenget}`
          },
          data: { "id": id }
      }).then(response => {
          // console.log(response);
          dispatch({
              type: "ADD_RELOADPAGE_DATA",
              reloadpage: response
          })
      })
    }
    return (
        <>
        <Navbar/>
        <div className='AddToCarts'>
          
        <section className="h-100 h-custom" style={{backgroundColor: '#D1A17C'}}>
        <div className="container py-4 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
              <div className="card card-registration card-registration-2" style={{borderRadius: '15px'}}>
                <div className="card-body p-0">
                  <div className="row g-0">
                  {cart_product_length !==0?
                  <>
                    <div className="col-lg-8">
                    
                   
                      <div className="p-5">
                      
                    
                         
                        {cartproductf_uncomplit?.cartproduct.map((items,i)=>(<>
                        
                        <div className="row mb-4 d-flex justify-content-between align-items-center" key={i}>
                          <div className="col-md-2 col-lg-2 col-xl-2">
                            <img src={items.product[0].Image} className="img-fluid rounded-3" alt="Makeup Product" />
                          </div>
                          <div className="col-md-2 col-lg-3 col-xl-3">
                            <h6 className="text-muted">{items.product[0].ProductName}</h6>
            
                          </div>
                          <div className="col-md-2 col-lg-2 col-xl-2">
                            
                          <i className="bi bi-plus-circle" style={{marginRight:5}} onClick={()=>updatecartproduct(items.id)}/>{items.quantity}<i className="bi bi-file-minus" style={{marginLeft:5}} onClick={()=>editcartproduct(items.id)}/>
                          
                          </div>
                          <div className="col-md-2 col-lg-2 col-xl-2 offset-lg-1">
                            <h6 className="mb-0">{items.price}$</h6>
                          </div>
                        
                          <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                          <h6 className="mb-0">{items.subtotal}$</h6>
                          </div>
                          <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                            <a href="#!" className=""><i className="bi-x-circle" onClick={()=>delatecartproduct(items.id)}></i></a>
                          </div>
                        </div>
                        
                    
                        <hr className="my-4" />
                        </>))}
                       
                        <div className="pt-5">
                          <h6 className="mb-0"><a href="/" className="text-body"><i className="fas fa-long-arrow-alt-left me-2" />Back to shop</a></h6>
                          <Link to="/oldorder" className="nav-link" style={{color:"black"}}>Old History</Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 bg-grey">
                      <div className="p-5">
                        <h2 className="fw-bold mb-5  pt-1">Summary</h2>
                        <hr className="my-4" />
                        
                        <div className="d-flex justify-content-between mb-4">
                          <h5 className="text-uppercase">Total Items</h5>
                          <h5>{cart_product_length}</h5>
                        </div>
                       
                  
                        
                   
                        
                       
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between mb-5">
                          <h5 className="text-uppercase">Total price</h5>
                          <h5>{cartproductf_uncomplit.total}$</h5>
                          <img src={cartproductf_uncomplit?.cartproduct.Image}/>
                        </div>
                      <Link to="/Checkout" ><button type="button" className="Cart">CheckOut</button></Link>
                      </div>
                    </div>
                    </> :
                     <><h2>Cart not added</h2></>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    
     </div> 
          
        </>
    );
};

export default AddCart;