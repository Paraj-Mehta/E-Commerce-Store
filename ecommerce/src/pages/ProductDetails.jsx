import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import axiosInstance from '../service/axiosInstance';

const ProductDetails = () => {
  const { isLoggedIn, setIsLoggedIn } = useOutletContext();
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});

    const fetchProduct = async () => {

        try {

            const response = await axiosInstance.get(`/products/${id}`);
            setProduct(response.data.productList);

        } catch (err) {

            console.log("Error fetching the product")

        }

    }

    useEffect(() => {
        fetchProduct();
    }, [])

    const goBack = ()=>{

        return navigate("/shop");
        

    }

    const handleAddToCart = async()=>{
    if(!isLoggedIn) {

      return navigate('/login');
      
    }

    try{

        const response = await axiosInstance.post('/add-to-cart/add', {productId : id, quantity: 1});

    } catch (err) {

      console.log(err);

    }

    }

    return (
        <>
            <div className="container">
            <div className=' d-flex gap-5'>
                <button className='btn btn-light' onClick={goBack}>
                    <img src="/back.png" alt="Back" width={25} height={25}/>
                </button>


                <h1>Product Details</h1>
                            </div>
                <br /><br />

                <div className="row">


                    <div className="col-12 col-md-6 mb-4">
                        <img
                            src={`${product?.image}`}
                            alt={product?.productName || 'Product Image'}
                            className="img-fluid rounded" 
                        />
                    </div>

                    <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-start p-md-5">
                        <h2>Product Name: {product?.productName}</h2>
                        <p><strong>Description:</strong> {product?.description}</p>
                        <p><strong>Price:</strong> {product?.price}</p>
                        <br /><br />
                        <button className='btn btn-primary w-50' 
                        onClick={()=> handleAddToCart()}> Add To cart</button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default ProductDetails