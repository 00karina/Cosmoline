import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import {domain,header} from "../env"
import { Link,useHistory } from "react-router-dom";
import { useGlobalState } from  '../State/provider';
import Navbar from './../Components/Navbar/Navbar'
import './Searchproduct.scss'
function SearchProduct(props) {
    const {q}= useParams();
    const [{profile}, dispatch] = useGlobalState();
    const [Result, setResults] = useState();
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
    useEffect(() => {
        const getSearch = async () => {
            await axios({
                url: `${domain}/api/search/${q}/`,
                method: "GET"
            }).then(response => {
                
                
                setResults(response.data.products)
                console.log(response.data.products)
                console.log(Result)
                
                
               
            })
        }
        getSearch()
    }, [q])

    return (
        <div className='searchproduct'>
         
            <div className='container'>
            <h3>Search Result For:"{q}" <hr/></h3>
           
            <div className='row'>
            <Navbar/>
            
           {Result?.map((items,i)=><>
           
           <div className='col-md-4 mt-5'>
               
            <div className="item mt-5">
                            <div className="img-box">
                            <Link to={`singleproduct/${items.id}`}> <img src={items?.Image} alt=" " /></Link>
                            </div>
                            <div className="details">
                                <h2>{items?.ProductName}<br/><span>Karina Collection</span></h2>
                                <div className="price">{items?.Price}$</div>
                                <button onClick={()=>addtocart(items.id)} className="Cart">Add to cart</button>
                            </div>
                        </div>
                        </div>
                
            

      
           </>)}
            
            </div>
 

</div>

</div>
            
         
    );
}

export default SearchProduct;