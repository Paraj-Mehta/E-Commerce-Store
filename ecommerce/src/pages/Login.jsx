import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import axiosInstance from '../service/axiosInstance'
import { useOutletContext, useNavigate, Link } from 'react-router-dom'

const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useOutletContext();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/login", formData);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("role", response.data.role);
        setIsLoggedIn(true);
        navigate('/');
      }

    } catch (error) {

      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {

        alert("An error occurred during login. Please try again.");

      }

    }
  }

  return (
    <div className="container-fluid my-5 d-flex align-items-center justify-content-center">

      <form className="row g-3 border p-4 m-3 rounded-5 shadow w-50" onSubmit={handleSubmit}>

        <h1 className="text-center mb-4">Login</h1>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="Enter your email" name="email" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="Enter your password" name="password" onChange={handleChange} />

          <br />

          <Link to={'/forgot-password'}>Forgot Password?</Link>
        </div>
        <div className="d-grid gap-2">

          <button className="btn btn-primary" type="submit">Login</button>

        </div>

      </form>

    </div>
  )
}

export default Login