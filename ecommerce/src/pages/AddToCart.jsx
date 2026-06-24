import React, { useState, useEffect } from 'react'
import axiosInstance from '../service/axiosInstance.js'

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get("/add-to-cart/get-cart");
      setCartItems(response.data.cartItems)
    } catch (err) {
      console.log(err.response?.data?.message || err.message)
    }
  }

  useEffect(() => {
    fetchCart();
  }, [])

  const updateQuantity = async (productId, quantity) => {

    try {

      const response = await axiosInstance.put("/add-to-cart/update-quantity", { productId, quantity });
      fetchCart();

    } catch (err) {

      console.log(response.err.data.message);

    }

  }

  const removeItem = async (itemId)=> {

    try{

      const response = await axiosInstance.delete(`/add-to-cart/delete/${itemId}`);
      alert(response.data.message)
      fetchCart();

    } catch (err) {

      alert("error")
      console.log(err)

    }

  }

  const removeAll = async ()=> {

    try{

      const response = await axiosInstance.put('/add-to-cart/clear-cart');
      alert(response.data.message);

      setCartItems([])


    } catch (err) {

      alert("Server Error");
      console.log(err);

    }

  }

  const handlePayment = async () => {
        try {
            // Create order via backend

            const totalAmount = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
            const response = await axiosInstance.post('/payment/create-order', {
                amount: totalAmount, // Amount in rupees
                currency: 'INR',
                cartItem : cartItems
            });

            const { id: order_id, amount, currency } = response.data;

            // Set up RazorPay options
            const options = {
                key: "rzp_test_T5Jr7TLFikYveC", // Replace with your RazorPay Key ID
                amount: amount,
                currency: currency,
                name: "E-commerce Store",
                description: "Test Transaction",
                order_id: order_id,
                handler: async (response) => {
                    try{

                      const order = await axiosInstance.post('/payment/verify-order', {
                        orderId : response.razorpay_order_id,
                        paymentID : response.razorpay_payment_id,
                        amount : totalAmount,
                        cartItem : cartItems
                      });

                      console.log(order)

                      alert('Payment Successful!');
                      fetchCart();

                    } catch (err) {

                      console.log(err)

                    }

                },
                prefill: {
                    name: "John Doe",
                    email: "john.doe@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();


        } catch (error) {
            console.error('Payment initiation failed:', error);
        }
    };


  return (
    <div className="container mt-5">
      <div className="row justify-content-between">

        <div className="col-12 col-lg-7 border p-4 rounded-5 mb-4 mb-lg-0 shadow-sm">

          <div className='d-flex justify-content-between'>
          <h2 className="mb-4 ms-3">Your Cart</h2>
          {
           cartItems.length !== 0 &&    
          <button className='btn btn-danger mb-4 me-2' 
          onClick={()=>removeAll()}> Clear Cart</button>
          } 
          </div>
          <hr />

          {cartItems.length === 0 ? (
            <p className="text-muted">Your cart is currently empty.</p>
          ) : (
            cartItems.map((item, index) => {
              return (
                <div key={item._id} className={`d-flex flex-column flex-md-row align-items-center mb-4 ${index !== cartItems.length - 1 ? 'border-bottom pb-4' : ''}`}>

                  {/* Image Section */}
                  <div className="me-md-4 mb-3 mb-md-0 text-center">
                    <img
                      src={`${item.product.image}`}
                      alt={item.product.productName}
                      className='img-fluid rounded'
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Details Section */}
                  <div className="d-flex flex-column flex-grow-1 text-center text-md-start">
                    <p className="mb-1"><small>Category: {item.product.categories.categoryName}</small></p>
                    <h4 className="mb-2">{item.product.productName}</h4>
                    <p className="mb-2">{item.product.description}</p>
                    <p className="fs-5 fw-bold mb-3">₹{item.product.price * item.quantity}</p>

                    {/* Styled Quantity Controls */}
                    <div className='d-flex align-items-center justify-content-center justify-content-md-start gap-3'>
                      <span className="fw-semibold">Quantity:</span>
                      <div className="btn-group" role="group">
                        <button className="btn btn-outline-secondary btn-sm px-3"
                          onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>-</button>
                        <span className="btn btn-outline-secondary btn-sm disabled text-dark px-3">{item.quantity}</span>
                        <button className="btn btn-outline-secondary btn-sm px-3"
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>+</button>
                      </div>
                    </div>
                  </div>

                  <button style={{border : "none", backgroundColor : "white"}}
                  onClick={()=>removeItem(item._id)}>
                    <img src='/recycle-bin-icon.svg' width={20} height={30} />
                    </button>

                </div>
              )
            })
          )}
        </div>


        {/* Summary */}
        <div className="col-12 col-lg-4 border p-4 rounded-5 shadow-sm align-self-start">
          <h2 className="mb-4">Summary</h2>
          <hr />

          {/* Itemized List Container */}
          <div className="mb-4">
            {
              cartItems.length === 0 ? (
                <p className="text-muted">Cart is Empty</p>
              ) : (
                cartItems.map((item, index) => {
                  return (
                    // This puts the product name on the left and price on the right
                    <div key={index} className='d-flex justify-content-between mb-2'>
                      <span className="text-secondary">
                        {item.product.productName} <small>(x{item.quantity})</small>
                      </span>
                      <span>₹ {item.product.price * item.quantity}</span>
                    </div>
                  )
                })
              )
            }
          </div>

          {/* Optional: Add an extra line here if there are items, to separate from the total */}
          {cartItems.length > 0 && <hr />}

          {/* Final Total Row */}
          <div className="d-flex justify-content-between fs-5 mt-3">
            <strong>Total Amount:</strong>
            <strong>
              ₹ {cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)}
            </strong>
          </div>

          <button
            className="btn btn-primary w-100 mt-4 py-2 rounded-pill fw-bold"
            disabled={cartItems.length === 0} // Good practice to disable checkout if cart is empty
            onClick={()=> handlePayment()}
          >
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  )
}

export default AddToCart;