import React, { useState,useEffect } from 'react';

import './Checkout.scss';
import Navbar from "../Navbar/Navbar"
import {domain} from "../../env"
import axios from 'axios';

import QueryString from 'query-string';
import { useHistory } from 'react-router-dom'
import { useGlobalState } from '../../State/provider';
import Summary from './Summary';
import { useLocation } from 'react-router-dom';

const Checkout = (props) => {

const [{ cartproductf_uncomplit }, dispatch] = useGlobalState()
const [address, setAddress] = useState("")
const [mobile, setMobile] = useState("")
const [email, setEmail] = useState("")
const[error,setError]=useState('')
const history = useHistory()
const pattern = new RegExp(/^[0-9\b]+$/);

const orderData = {
    "cartId": cartproductf_uncomplit?.id,
    "address": address,
    "mobile": mobile,
    "email": email
}
const tokenget = window.localStorage.getItem('token')
const location = useLocation();
useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    // const query = new URLSearchParams(window.location.search);
    const values = QueryString.parse(location.search);

    if (values.success) {
        console.log(
            'Order placed! You will receive an email confirmation.'
        );
    }

    if (values.canceled) {
        console.log(
            "Order canceled -- continue to shop around and checkout when you're ready."
        );
    }
}, []);


const ordernow = async () => {
    if(!address){
        setError("Address is requried")
    }
    else if(!email){
        setError('Email field is requried')
    }
    else if(!email.includes('@')){
        setError('Invalid Email')
    }
    else if(!mobile){
        setError('Phone Number is requried!')
    }
    else if( !pattern.test(mobile) )
    {
        setError('Please enter only Number')
    }
    else if(mobile.length!=10){
      setError('Enter Valid Phone Number')
    }
    else{
        axios({
            method: "post",
            url: `${domain}/api/orders/`,
            headers: {
                Authorization: `token ${tokenget}`
            },
            data: orderData,
           
        })
        .then(response => {
            console.log(response.data);
        
    
            dispatch({
                type: "ADD_RELOADPAGE_DATA",
                reloadpage: response
            })
            dispatch({
                type: "ADD_CARTPRODUCT_UNCOMPLIT",
                cartproductf_uncomplit: null
            })
            history.push('/oldorder')
            
        })
}




}
return(
        <>
        <div className='checkout'>
            
        <div className='container'>
            
            <div className='row'>
                <Navbar/>
                <div className='col-md-6 mt-5 formss'>
                    <h5 className='text-center'>Billing Details</h5>
                    <div>
                        <p>Contact Information</p>
                        <div className="form-group">
                            <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" placeholder="Email Address" />
                        </div>
                        <p>Shipping Address</p>
                        <div className='row'>
                            <div className='col-md-6'>
                            <div className="form-group">
                            <input  type="text" className="form-control" placeholder="First Name" />
                            </div>
                            </div>
                            <div className='col-md-6'>
                            <div className="form-group">
                            <input  type="text" className="form-control" placeholder="Last Name" />
                             </div>
                            </div>
                        </div>
                        <div className="form-group">

                            <input onChange={(e) => setMobile(e.target.value)} type="text" className="form-control" placeholder="Mobile" />
                        </div>
                        <div className="form-group">
                
                            <input onChange={(e) => setAddress(e.target.value)} type="text" className="form-control" placeholder="Address" />
                        </div>
                        <div className="form-group">
                
                         <input onChange={(e) => setAddress(e.target.value)} type="text" className="form-control" placeholder="City" />
                        </div>
                        
                        <div className='text-right'>
                       
                        </div>
                        <p>{error}</p>
                     
                        <button className="btns" onClick={ordernow}>Conitnue Shipping</button>
                        
                
              

         
		














                        </div>
                </div>
                <Summary/>   
                   
                </div>
               
            </div>
                    
        </div>
        </>  
  
    );
}

export default Checkout;