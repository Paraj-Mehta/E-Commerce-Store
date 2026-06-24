import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useOutletContext, useNavigate } from 'react-router-dom'
import axiosInstance from '../service/axiosInstance'

const Register = () => {
  const { isLoggedIn, setIsLoggedIn } = useOutletContext();
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("http://localhost:3000/register", formData);
      if (response.status === 201) {
        
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("role", response.data.role);

        setIsLoggedIn(true);
      
        navigate('/');
      }

    } catch (error) {
      alert(error.response.data.message);
      //  console.error("Error registering user:", error);
    }
  }


  return (
    <div className="container-fluid my-5 d-flex align-items-center justify-content-center">

      <form className="row g-3 border p-4 m-3 rounded-5 w-50" onSubmit={handleSubmit}>

        <h1 className="text-center mb-4">Create an Account</h1>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter your name" name="name" onChange={handleChange} />
        </div>


        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" id="formGroupExampleInput2" placeholder="Enter your email" name="email" onChange={handleChange} />
        </div>


        <div className="mb-3">
          <label className="form-label">Mobile Number</label>
          <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter your mobile number" name="mobile" onChange={handleChange} />
        </div>


        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" id="formGroupExampleInput2" placeholder="Enter your password" name="password" onChange={handleChange} />
        </div>

        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="submit">Register</button>
        </div>
      </form>
    </div>
  )
}

export default Register