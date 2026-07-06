import React, { useEffect, useState } from "react";
import axiosInstance from "../service/axiosInstance.js";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [originalData, setOriginalData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("/user/find");
      setUserData(response.data.user);
      setOriginalData(response.data.user);
    } catch (err) {
      console.log(err);
      alert("Error fetching user details");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleEdit = async () => {
    // If not editing, enable edit mode
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    // Save changes
    try {
      const response = await axiosInstance.put("/user/update", {
        name: userData.name,
        email: userData.email,
        mobile: userData.mobile,
      });

      alert(response.data.message);

      setUserData(response.data.user || userData);
      setOriginalData(response.data.user || userData);
      setIsEditing(false);
      
    } catch (err) {

      console.log(err);
      alert("Unable to update profile");

    }

  };

  const handleCancel = () => {
    setUserData(originalData);
    setIsEditing(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4 p-md-5">

              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="mb-0">Profile Details</h3>

                <div>
                  <button
                    className={`btn btn-sm rounded-pill px-4 py-2 fw-semibold ${
                      isEditing ? "btn-success" : "btn-primary"
                    }`}
                    onClick={handleEdit}
                  >
                    {isEditing ? "Save" : "Edit Profile"}
                  </button>

                  {isEditing && (
                    <button
                      className="btn btn-secondary btn-sm rounded-pill px-4 py-2 fw-semibold ms-2"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              <hr className="mb-4" />

              {/* Name */}
              <div className="row mb-4 align-items-center">
                <div className="col-sm-4">
                  <h6 className="mb-0 text-muted">Full Name</h6>
                </div>

                <div className="col-sm-8">
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      value={userData.name}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <span className="fw-semibold fs-5">
                      {userData.name}
                    </span>
                  )}
                </div>
              </div>

              <hr className="mb-4 text-light" />

              {/* Email */}
              <div className="row mb-4 align-items-center">
                <div className="col-sm-4">
                  <h6 className="mb-0 text-muted">Email</h6>
                </div>

                <div className="col-sm-8">
                  {isEditing ? (
                    <input
                      type="email"
                      className="form-control"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          email: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <span>{userData.email}</span>
                  )}
                </div>
              </div>

              <hr className="mb-4 text-light" />

              {/* Mobile */}
              <div className="row mb-3 align-items-center">
                <div className="col-sm-4">
                  <h6 className="mb-0 text-muted">Mobile</h6>
                </div>

                <div className="col-sm-8">
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      value={userData.mobile}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          mobile: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <span>{userData.mobile}</span>
                  )}
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