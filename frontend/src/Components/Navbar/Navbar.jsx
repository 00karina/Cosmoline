import React,{useState,useEffect}from "react";
import "./Navbar.scss";
import "./nav"
import { useGlobalState } from '../../State/provider'
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
function Navbar() {
  const [{ profile, cartproductf_uncomplit }, dispatch] = useGlobalState();
  const [Text,setText]=useState('');
  const history = useHistory();
  const Search = () => {
    history.push(`/q-${Text}`);
  }
  let cart_product_length = 0;
  if (cartproductf_uncomplit !== null) {
      cart_product_length = cartproductf_uncomplit?.cartproduct?.length
  } else {
      cart_product_length = 0;
  }
  const logout = () => {
    window.localStorage.clear()
    dispatch({
        type: "ADD_PROFILE",
        profile: null
    })
    window.location.href = "/"
}
    return (
      <div className="container navSection" style={{overflowX:"hidden"}} > 
        <nav className="navbar fixed-top navbar-expand-lg navbar-light " id="#navbar" >
        <div className="brands">
        <Link to='/'><span class="brand" href="#">Cosmoline</span></Link>
        </div>
          <div className="container-fluid">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                <span className="navbar-toggler-icon"></span>
              </button>
                <div className="collapse navbar-collapse" id="mynavbar">
              
                <ul className="navbar-nav me-auto">
                  <li className="nav-item">
                  <Link to='/shop' > <a className="nav-link" style={{color:"black"}}>SHOP</a></Link>
                  </li>
                  <li className="nav-item" >
                  <Link to='/shadefinder/' ><a className="nav-link" href="" style={{color:"black"}}>SHADE FIDER</a></Link>
                  </li>
                  <li className="nav-item">
                  <Link to='/sale/' ><a className="nav-link" href=" " style={{color:"black"}}>SALE</a></Link>
                  </li>
                </ul>

                <div className="search-box">
                  <button className="btn-search" onClick={Search} ><i class="bi-search" disabled={Text.length <= 0 ? true : false} ></i></button>
                  <input type="text" className="input-search" placeholder="Type to Search..." value={Text} onChange={(e)=>setText(e.target.value)}/>
                </div>
                <Link to="/addcart" >  <button className="cart" style={{backgroundColor:"transparent",borderStyle:"none",fontSize:"28px",marginRight:'20px'}}><i className="bi-cart">({cart_product_length})</i></button></Link>
                </div> 
                
                {
                  profile !==null ?
                  (
                    <>
                      
                     <Link onClick={logout}  ><button className="person fixed-top" style={{backgroundColor:"transparent",borderStyle:"none",fontSize:"28px",marginRight:"150px"}}><i className="bi bi-box-arrow-right"></i></button></Link>

                     
                    </>)
                  :
                    <Link to="/login" ><button className="person fixed-top" style={{backgroundColor:"transparent",borderStyle:"none",fontSize:"28px",marginRight:"150px"}}><i className="bi-person"></i></button></Link>
                }
                
           
              
            
                
                
          </div>
        </nav>
      </div>
    );}
export default Navbar;