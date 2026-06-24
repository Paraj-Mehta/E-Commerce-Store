import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = (props) => {
  const navigate = useNavigate();

  useEffect(()=>{
  if (localStorage.getItem("token")) {
    props.setIsLoggedIn(true);
  }
  }, [])

  const handleLoginLogout = () => {
    if (props.isLoggedIn) {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      props.setIsLoggedIn(false);
    }

    navigate('/login');
  };

  return (
    localStorage.getItem("token") && localStorage.getItem("role") === "admin" ? (
      <> 
      {/* For Admin  */}

        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">E-Commerce</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link active" to="/manage-products">Products</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link active" to="/manage-categories">Catgories</Link>
                </li>


              </ul>

            {
              props.isLoggedIn &&
              <Link to={'user-profile'}>
              <img src="/user-profile-icon.svg" alt="cart" width="30" height="30" 
              className='me-3'/>
              </Link>
            }

              <button className={`btn ${props.isLoggedIn ? 'btn-outline-danger' : 'btn-outline-success'} me-2`} type="submit" onClick={handleLoginLogout}>
                {props.isLoggedIn ? 'Logout' : 'Login'}
              </button>


              {!props.isLoggedIn && (
                <Link to="/register">
                  <button className="btn btn-outline-success" type="submit">
                    Register
                  </button>
                </Link>
              )}

            </div>
          </div>
        </nav></>) : (
      <>

      {/* For Users */}

        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">



            <Link className="navbar-brand" to="/">E-Commerce</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link active" to="/shop">Shop</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/contact">Contact</Link>
                </li>

              </ul>


            {
              props.isLoggedIn &&
              <Link to={'user-profile'}>
              <img src="/user-profile-icon.svg" alt="cart" width="30" height="30" 
              className='me-3'/>
              </Link>
            }
            {
              props.isLoggedIn &&
              <Link to={'/add-to-cart'}>
              <img src="/shopping-cart-icon.svg" alt="cart" width="30" height="30" 
              className='me-3'/>
              </Link>

            }
              <button className={`btn ${props.isLoggedIn ? 'btn-outline-danger' : 'btn-outline-success'} me-2`} type="submit" onClick={handleLoginLogout}>
                {props.isLoggedIn ? 'Logout' : 'Login'}
              </button>


              {!props.isLoggedIn && (
                <Link to="/register">
                  <button className="btn btn-outline-success" type="submit">
                    Register
                  </button>
                </Link>
              )}

            </div>
          </div>
        </nav>

      </>
    )
  )
}

export default Navbar