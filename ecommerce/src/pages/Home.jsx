import React from 'react'
import { Link } from 'react-router-dom'
import {useOutletContext} from "react-router-dom"

const Home = () => {
const {isLoggedIn, setIsLoggedIn} = useOutletContext();
  return (
    <>
     <div className="container-fluid my-4">
        <div className="row align-items-center">
            <div className="col-md-6">
                <div className="p-5 d-flex flex-column justify-content-center">
                    
                {isLoggedIn ?  <h1>Hello, {localStorage.getItem("name") || "Guest"}!</h1> : 
                <h1>Welcome to Our E-commerce Store</h1>}

                <p className="fs-4 mt-3">Discover a wide range of products at unbeatable prices!</p>
                </div>
            </div>
            <div className="col-md-6 text-center">
                <img className="img-fluid" src="https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-f-9.webp" alt="Product Image" />
            </div>
        </div>
    </div>

    <div className="container-fluid my-5">
        <div className="row g-4">
            
            <div className="col-md-3 col-sm-6">
                <div className="card h-100 w-100">
                    <img src="https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-1-variant.webp" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                        <Link to={isLoggedIn ? "/" : "/login"} className="btn btn-primary">Go somewhere</Link>
                    </div>
                </div>
            </div>

            <div className="col-md-3 col-sm-6">
                <div className="card h-100 w-100">
                    <img src="https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-1-variant.webp" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                        <Link to={isLoggedIn ? "/" : "/login"} className="btn btn-primary">Go somewhere</Link>
                    </div>
                </div>
            </div>

            <div className="col-md-3 col-sm-6">
                <div className="card h-100 w-100">
                    <img src="https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-1-variant.webp" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                        <Link to={isLoggedIn ? "/" : "/login"} className="btn btn-primary">Go somewhere</Link>
                    </div>
                </div>
            </div>

            <div className="col-md-3 col-sm-6">
                <div className="card h-100 w-100">
                    <img src="https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-1-variant.webp" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                        <Link to={isLoggedIn ? "/" : "/login"} className="btn btn-primary">Go somewhere</Link>
                    </div>
                </div>
            </div>

            <div className="col-md-3 col-sm-6">
                <div className="card h-100 w-100">
                    <img src="https://bootstrapmade.com/content/demo/eStore/assets/img/product/product-1-variant.webp" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                        <Link to={isLoggedIn ? "/" : "/login"} className="btn btn-primary">Go somewhere</Link>
                    </div>
                </div>
            </div>

        </div>
    </div>
    </>
  )
}

export default Home