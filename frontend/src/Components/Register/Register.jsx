import React,{  useState }  from 'react';
import "./Register.css"
import Navbar from '../Navbar/Navbar';
import {domain,header2} from "../../env"
import axios from "axios"
import { useHistory} from 'react-router-dom';

function Register()  {
    const [name, setname] = useState("")
	const [username, setUsername] = useState("")
    const [email, setemail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const[error,setError]=useState('')
    const letter = /[a-zA-Z]/;
    const number = /[0-9]/;

    const history = useHistory()
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
    const registerButton = async () => {
        if(!username){
           setError("UserName is requried")
         }
         else if(!name){
            setError("Enter your Full Name")
          }
         
        else if (password.length < 6 || password !== password2|| !letter.test(password) || !number.test(password)) {
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

        else if(!email){
            setError('Email field is requried')
        }
        else if(!email.includes('@')){
            setError('Invalid Email')
        }

    
        
            else{
            await axios({
                method: "post",
                url: `${domain}/api/register/`,
                headers: header2,
                data: {
                    'first_name':name,
                    "username": username,
                    "password": password,
                    'email':email,
                }
            }).then(response => {
                // console.log(response.data);
                if (response.data["data"]) {
                    history.push("/login")
                }
                // console.log(response.data["message"]);
                alert(response.data["message"])
            })
        }
      
    }
	
    return (
        <div className='Register'>
          
            <div className='container RegisterBox text-center'>
                
            <h2 className='text-center RegisterHeading'>Create New Account</h2>
                 
					<form control="" class="form-group" className="was-validated">
                    <div class="row">
							<input type="text" name="Name" id="Name" class="form__register" placeholder="Enter Your Full Name" onChange={e => setname(e.target.value)} required/>
						</div>
       
						<div class="row">
							<input type="text" name="UserName" id="UserName" class="form__register" placeholder="Enter User Name" onChange={e => setUsername(e.target.value)}/>
						</div>
                        <div class="row">
							<input type="text" name="Email" id="email" class="form__register" placeholder="Email" onChange={e => setemail(e.target.value)}/>
						</div>
                        
						<div className="row">
                        <i class="bi-eye" onClick={()=>MyFunction()}></i>
							<input type="password" name="password" class="form__register" placeholder="Password" id="myInput" onChange={e => setPassword(e.target.value)}  />
                           
						</div>
                        <div class="row">
                        <i class="bi-eye" onClick={()=>MyFunction2()}></i>
							<input type="password" name="password"  class="form__register" id="myInput2" placeholder="Re-Enter Password" onChange={e => setPassword2(e.target.value)}/>
                           
						</div>
                        </form>
                        <p>{error}</p>
                        <button  type="button" className="btn RegisterButton text-center" onClick={registerButton}>REGISTER</button>
            </div>
            <Navbar/>
        </div>
    );
};

export default Register;