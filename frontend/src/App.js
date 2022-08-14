import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Index from "./Components/Home/Index"
import ProductDetails from "./Components/ProductDetails/Details"
import Shop from "./Components/Shop/Shop"
import Login from "./Components/Login/Login"
import Register from './Components/Register/Register';
import {domain,header} from "./env"
import React, { useEffect } from 'react';
import axios from 'axios';
import AddCart from './Components/AddToCart/AddCart';
import { useGlobalState } from  "./State/provider"
import Oldorder from './Components/OldOrder/OldOrder';
import OrderDetails from"./Components/OrderDetails/OrderDetails";
import Checkout from './Components/Checkout/Checkout';


import Skintone from './ShadeFinder/Finder/Skintone';
import Group from './ShadeFinder/group/Group';
import Finalquestion from './ShadeFinder/Finalquestion/Finalquestion';
import Result from './ShadeFinder/Result/Result';
import Sale from './Components/Sale/Sale';
import SearchProduct from './Common/SearchProduct';
import ChangePassword from './Components/ChangePassword/ChangePassword';
import FinalChange from './Components/ChangePassword/FinalChange';
import Footer from './Components/Footer/Footer';
import Starter from './ShadeFinder/Starter';
import FAQ from './Components/FAQ/FAQ';
const App = () => {
  const [{ profile, reloadpage }, dispatch] = useGlobalState();
  const userToken=window.localStorage.getItem('token')
  useEffect(() => {
    if (userToken !== null) {
      const getdata = async () => {
        await axios({
          method: "get",
          url: `${domain}/api/users/`,
          headers: {
            Authorization: `token ${userToken}`
          }
        }).then(res => {
          let user = res.data
           console.log(user)
          dispatch({
            type: "ADD_PROFILE",
            profile: user
          }
          )
        })
          .catch(e => {
             console.log(e,'userssssssssss')
            dispatch({
              type: "ADD_PROFILE",
              profile: null
            })

          }
          )

      }
      getdata()
    }

  }, [reloadpage])
  console.log(profile,"profile")
  useEffect(()=>{
    
      const getcart = async () => {
        await axios({
          method: "get",
          url: `${domain}/api/cart/`,
          headers:header
        }).then(res=>{
          console.log(res.data,"cart.. this is cart");
          {
            const all_data=[]
            res?.data.map(data => {
              if (data.complit) {
                all_data.push(data)
                dispatch({
                  type: "ADD_CARTPRODUCT_COMPLIT",
                  cartproduct_complit: all_data
                })
                // console.log(true);
  
              }
              else {
                dispatch({
                  type: "ADD_CARTPRODUCT_UNCOMPLIT",
                  cartproductf_uncomplit: data
                })
                // console.log(false)

          }
            })
       
      }
    })
  }
    
    getcart()
  },[reloadpage])
  return (
    <div>
      <div className="App">
      <header>
      
       <Router>
       
         <Switch>
           
         
         {
          profile!== null && 
          <>
       <Route exact path='/q-:q' component={SearchProduct}/>
        <Route exact path="/oldorder/" component={Oldorder}/>
        <Route exact path="/orderdetails/:id" component={OrderDetails}/>
        
        <Route exact path="/checkout/" component={Checkout}/>
    
        <Route exact path="/addcart/" component={AddCart}/>
        <Route exact path="/" component={Index}/>
        <Route exact path="/shadefinder/step3/" component={Skintone}/>
        <Route exact path="/shadefinder/step1/" component={Group}/>
        <Route exact path="/shadefinder/" component={Starter}/>
        <Route exact path="/shadefinder/step2/" component={Finalquestion}/>
        <Route exact path="/result/" component={Result} />
        <Route exact path="/sale/" component={Sale}/>
        <Route exact path="/shadefinder/final-result/product/" component={Result} />
        <Route exact path="/SingleProduct/:id" component={ProductDetails}/>
        <Route exact path="/shop/" component={Shop}/>
        <Route exact path="/login/" component={Login}/>
        <Route exact path="/register/" component={Register}/>
        <Route exact path="/change-password/" component={ChangePassword}/>
        <Route exact path="/change-password/confirm/" component={FinalChange}/>
        <Route exact path='/pages/faqs' component={FAQ}/>
        <Route exact path="/login/" component={Login}/>
        <Route exact path="/register/" component={Register}/>
        
          </>
        
        }
         <Route exact path="/shadefinder/step3/" component={Skintone}/>
        <Route exact path="/shadefinder/step1/" component={Group}/>
        <Route exact path="/shadefinder/step2/" component={Finalquestion}/>
        <Route exact path="/shadefinder/final-result/product/" component={Result} />
        <Route exact path="/sale/" component={Sale}/>
        <Route exact path='/q-:q' component={SearchProduct}/>
        <Route exact path="/shadefinder/" component={Starter}/>
        <Route exact path="/SingleProduct/:id" component={ProductDetails}/>
        <Route exact path="/shop/" component={Shop}/>
        <Route exact path="/login/" component={Login}/>
        <Route exact path="/register/" component={Register}/>
        <Route exact path="/addcart/" component={AddCart}/>
        <Route exact path="/change-password/" component={ChangePassword}/>
        <Route exact path="/change-password/confirm/" component={FinalChange}/>
        <Route exact path='/pages/faqs' component={FAQ}/>
        
        <Index/>
        <Footer/>
        
        </Switch>
        </Router>
      </header>
    </div>
    </div>
  );
};



export default App;
