import React,{useState}from 'react';
import "./ChangePassword.scss"
import Navbar from "../Navbar/Navbar"
import { Link } from 'react-router-dom';
import {domain,header2} from "../../env"
import axios from "axios"


const ChangePassword = () => {
    const [email,setEmail]=useState("");
   
    
    const loginnow=async()=>{
        await axios({
            url: `${domain}/api/password_reset/`,
            method:'POST',
            headers: header2,
            data:{
                email:email,
                // password_reset_token_created('noreplt@soehost.local', email, response.data['token'])
            }
        }).then(response => {
            window.localStorage.setItem('token', response.data['token'])
            window.location.href = "/change-password/confirm/"
        }).catch(eee => {
            alert("Username Or Password Is invalid  Try Again !!")
            
        })
            
        }
    
    return (
        <>
        <div className='Login'>
           
            
        <div className='container LoginBox text-center'>
                
                <h2 className='text-center loginHeading'>SIGN IN</h2>
                     
                        <form control="" class="form-group">
                           
                            <div class="row">
                                <input type="text" name="Email" id="email" class="form__login" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                         
                          
                            </form>
                           
                            
                            <button  type="button" className="btn loginButton text-center" onClick={loginnow} >LOGIN</button>
                            
                        
                </div>
                
            
        </div>
        <Navbar/>
        </>
    );
};

export default ChangePassword;