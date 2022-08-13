import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { domain } from "../../env";
import Navbar from '../Navbar/Navbar'
import './details.scss'
const OrderDetails = () => {
    const tokenget = window.localStorage.getItem('token')
    const { id } = useParams()
    const [details, setDetails] = useState(null);
    useEffect(() => {
        const getdata = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/orders/${id}/`,
                headers: {
                    Authorization: `token ${tokenget}`
                }
            }).then((res) => {
                // console.log(res.data);
                console.log(res?.data.data[0]);
                setDetails(res?.data?.data[0])
            })
        }
        getdata()
    }, [])
    const products = details?.cartproduct
    return (
        <div className='orderdetails'>
            
        <div className="container orderss">
        <h2 className='mt-5 products'>User details</h2>
            <table className="table table-bordered mt-5 ">
              
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Products</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {
                            details != null && (
                                <>
                                    <td>{details.date}</td>
                                    <td>{details.total}</td>
                                    <td>{details.email}</td>
                                    <td>{details.mobile}</td>
                                    
                                    <td>{details.cartproduct?.length}</td>
                                </>
                            )
                        }
                    </tr>
                </tbody>
            </table>
            <h2 className='mt-5 products'>Product details</h2>
            <table className="table table-bordered ">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products?.map((data, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{data.product[0].ProductName}</td>
                                <td>{data.price}</td>
                                <td>{data.quantity}</td>
                                <td>{data.subtotal}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            
        </div>
        <Navbar/>
        </div>
    )
}

export default OrderDetails