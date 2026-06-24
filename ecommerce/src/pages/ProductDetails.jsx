import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import axiosInstance from '../service/axiosInstance';

const ProductDetails = () => {
    const { id } = useParams();
    const fetchProduct = async () => {

        try {

            const response = await axiosInstance.get(`/products/${id}`);
            setProduct(response.data.productList);

        } catch (err) {

            console.log("Error fetching the product")

        }

    }

    const [product, setProduct] = useState({});

    useEffect(() => {
        fetchProduct();
    }, [])


    return (
        <>
            <div className="container">

                <h1>Product Details</h1>
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
                    </div>

                </div>

            </div>
        </>
    )
}

export default ProductDetails