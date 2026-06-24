import React, { useEffect, useState } from 'react';
import  axiosInstance from '../service/axiosInstance.js'

const UserProfile = () => {

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    mobile: '',
  });

  const fetchUser = async (req, res)=> {

    try{

      const response = await axiosInstance.get("/user/find");
      setUserData(response.data.user);

    } catch (err) {

      alert("Error");
      console.log(err);

    }

  }

  useEffect(()=>{
    fetchUser();
  }, []);

  return (
    <div className="container mt-5">
      {/* justify-content-center centers the column in the middle of the screen */}
      <div className="row justify-content-center">
        
        {/* Adjusted column width to look good when centered */}
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4 p-md-5">
              
              {/* Header with Edit Button */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="mb-0">Profile Details</h3>
                <button className="btn btn-primary btn-sm rounded-pill px-4 py-2 fw-semibold">
                  Edit Profile
                </button>
              </div>
              
              <hr className="mb-4" />

              {/* Name Field */}
              <div className="row mb-4 align-items-center">
                <div className="col-sm-4">
                  <h6 className="mb-0 text-muted">Full Name</h6>
                </div>
                <div className="col-sm-8">
                  <span className="fw-semibold fs-5">{userData.name}</span>
                </div>
              </div>
              <hr className="mb-4 text-light" />

              {/* Email Field */}
              <div className="row mb-4 align-items-center">
                <div className="col-sm-4">
                  <h6 className="mb-0 text-muted">Email</h6>
                </div>
                <div className="col-sm-8">
                  <span className="fs-6">{userData.email}</span>
                </div>
              </div>
              <hr className="mb-4 text-light" />

              {/* Mobile Field */}
              <div className="row mb-3 align-items-center">
                <div className="col-sm-4">
                  <h6 className="mb-0 text-muted">Mobile</h6>
                </div>
                <div className="col-sm-8">
                  <span className="fs-6">{userData.mobile}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;