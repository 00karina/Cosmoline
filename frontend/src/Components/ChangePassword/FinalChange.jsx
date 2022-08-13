import React,{useState}from 'react';

import Navbar from "../Navbar/Navbar"

import {domain,header2} from "../../env"
import axios from "axios"
const ChangePassword = () => {
    const [email,setEmail]=useState("");
    const letter = /[a-zA-Z]/;
    const number = /[0-9]/;
    const[error,setError]=useState('')
    const [token,setToken]=useState("");
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const MyFunction=()=>{
        const x = document.getElementById("myInput");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      } 
      const MyFunction2=()=>{
        const x = document.getElementById("myInput2");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      } 
    const loginnow=async()=>{
        if (password.length < 6 || password !== password2|| !letter.test(password) || !number.test(password)) {
            if (password.length < 6) {
                setError("Please make sure password is longer than 6 characters.")   
            }
            if (password!== password2) {
                setError("Please make sure passwords match.")
                
            }
            if (!letter.test(password)) {
                setError("Please make sure Password Includes an UpperCase and LowerCase character")
        
            }
            if (!number.test(password)) {
                setError("Please make sure Password Includes a Digit")
            
            }
        }
          else{
        await axios({
            url: `${domain}/api/password_reset/confirm/`,
            method:'POST',
            headers: header2,
            
            data:{
                
                password:password,
                token:token,
                
                
            }
        }).then(response => {
            window.localStorage.setItem('token', response.data['token'])
            window.location.href = "/"
        }).catch(eee => {
            alert("Username Or Password Is invalid  Try Again !!")
            
        })
            
        }
    }
    
    return (
        <>
        <div className='Login'>
           
            
        <div className='container LoginBox text-center'>
                
                <h2 className='text-center loginHeading'>Reset Password</h2>
                     
                        <form control="" class="form-group">
                        <div className="row">
                        <i class="bi-eye" onClick={()=>MyFunction()}></i>
							<input type="password" name="password" class="form__register" placeholder="Password" id="myInput" onChange={e => setPassword(e.target.value)}  />
                           
						</div>

                        <div class="row">
                        <i class="bi-eye" onClick={()=>MyFunction2()}></i>
							<input type="password" name="password"  class="form__register" id="myInput2" placeholder="Re-Enter Password" onChange={e => setPassword2(e.target.value)}/>
                           
						</div>
                            </form>
                            <form control="" class="form-group mb-5">
                           
                           
                           <div class="row ">
                               <span class="fa fa-lock"></span> 
                               <input type="text" name="token" id="token" class="form__login" placeholder="Token" onChange={(e)=>setToken(e.target.value)}/>
                              
                           </div>
                        
                         
                           </form>
      
                            <div className='box mt-5'>
                            <button  type="button" className="btn login text-center mt-5 " onClick={loginnow}  style={{backgroundColor:'  #832323',color:"white",position:"relative",top:"-60px",width:"150px"}}>LOGIN</button>
                            </div>
                            <p style={{color:" #832323",backgroundColor:"#fff",marginTop:"-40px"}}>{error}</p> 
                        
                </div>
                
            
        </div>
        <Navbar/>
        </>
    );
};

export default ChangePassword;