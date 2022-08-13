import React,{useState}from 'react';
import "./Login.css"
import Navbar from "../Navbar/Navbar"
import { Link } from 'react-router-dom';
import {domain,header2} from "../../env"
import axios from "axios"
const Login = () => {
    const [username,setUsername]=useState("");
    const[password,setPassword]=useState('');
    const loginnow=async()=>{
        await axios({
            url: `${domain}/api/login/`,
            method:'POST',
            headers: header2,
            data:{
                username:username,
                password:password,
            }
        }).then(response => {
            window.localStorage.setItem('token', response.data['token'])
            window.location.href = "/"
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
                                <input type="text" name="Email" id="email" class="form__login" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
                            </div>
                         
                            <div class="row">
                               
                                <input type="password" name="password" id="password" class="form__login" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                               
                            </div>
                            
                            </form>
                            
                            <button  type="button" className="btn loginButton text-center" onClick={loginnow} >LOGIN</button>
                            <p className='SignUpButton'>Not a member? <Link to ="/register"><u>SignUp Now</u></Link></p>
                            <p className='SignUpButton ' style={{marginTop:"-10px"}}> <Link to ="/change-password/"><u>Forget Password?</u></Link></p>
                        
                </div>
                
            
        </div>
        <Navbar/>
        </>
    );
};

export default Login;