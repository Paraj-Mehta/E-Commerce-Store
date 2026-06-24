import React from 'react'
import { useEffect, useState } from 'react'
import axiosInstance from '../service/axiosInstance.js'
import { Link, useNavigate } from 'react-router-dom'
import { useOutletContext } from "react-router-dom"

const Shop = () => {
  const navigate = useNavigate();
  const fetchData = async () => {
      try {
        const respose = await axiosInstance.get("/products/list-products")

        setProducts(respose.data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  }
  
  useEffect(() => {
    fetchData();

  }, []);

  const { isLoggedIn, setIsLoggedIn } = useOutletContext();
  const [products, setProducts] = useState([]);

  const handleProductDetails = (product) => {

    if (!isLoggedIn) {
      return navigate("/login")
    }


    navigate(`/shop/${product._id}`)

  }

  const handleAddToCart = async (productId)=>{

    if(!isLoggedIn) {

      return navigate('/login');
      
    }


    try{

        const response = await axiosInstance.post('/add-to-cart/add', {productId, quantity: 1});

    } catch (err) {

      console.log(err);

    }

  }


  return (
    <>
      <div>
        <div className="container-fluid my-5">
          <div className="row g-4">
            {products.map(product => {
              return (
                <div key={product._id} className="col-md-3 col-sm-6">
                  <div className="card h-100 w-100">
                    <img src={`${product.image}`}
                      className="card-img-top w-100 h-100" alt={product.productName} />
                    <div className="card-body">

                      <h5 className="card-title">{product.productName}</h5>

                      <p className="card-text">{product.description}</p>

                      <button className='btn btn-primary m-2' onClick={()=> handleAddToCart(product._id)}> 
                        Add To  Cart</button>

                      <button className='btn btn-warning m-2'
                        onClick={() => handleProductDetails(product)}> View </button>
                    </div>
                  </div>
                </div>

              )
            })}

          </div>
        </div>
      </div>
    </>
  )
}

export default Shop