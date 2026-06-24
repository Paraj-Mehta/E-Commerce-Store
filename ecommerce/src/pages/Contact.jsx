import React from 'react'
import Card from '../components/Card'
import { useState } from 'react'
import axios from 'axios'
import axiosInstance from '../service/axiosInstance'

const Contact = () => {

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSumbit = async (e) => {
    e.preventDefault();

    try {

      const response = await axiosInstance.post("/api/contact", formData);
      alert(response.data.message);

    } catch (err) {

      alert(err.response.data.message);
    }

  }

  return (
    <div>
      <Card />
      <div className='container-fluid my-5'>
        <div className='row'>

          <div className='col-md-6'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.6303799221664!2d72.56554087531433!3d23.037339779163386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9d2ef0e077d7%3A0x893d1817b1493105!2sBrainyBeam%20Technologies%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1780296226038!5m2!1sen!2sin"
              width="100%" height="450" style={{ border: '2px solid #ccc', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
              allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>

          <div className='col-md-6'>
            <form className="g-3 border p-4 m-3 rounded-5" onSubmit={handleSumbit}>
              <h1 className="text-center mb-4">Create an Account</h1>

              <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" className="form-control" placeholder="Enter your username" 
                name="username" onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control"  placeholder="Enter your email" 
                name="email" onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label className="form-label">Subject</label>
                <input type="text" className="form-control"  placeholder="Enter the subject" 
                name="subject" onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea className="form-control" aria-label="With textarea" 
                name="message" placeholder="Enter your message" onChange={handleChange}></textarea>
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-primary" type="submit">Submit</button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact