import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../service/axiosInstance.js";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // STEP 1 : SEND OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axiosInstance.post("/user/send-otp", {
        email: formData.email,
      });

      alert(response.data.message || "OTP Sent Successfully");
      setStep(2);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Unable to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 : VERIFY OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axiosInstance.post("/user/verify-otp", {
        email: formData.email,
        otp: formData.otp,
      });

      alert(response.data.message || "OTP Verified");
      setStep(3);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // STEP 3 : RESET PASSWORD
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);

      const response = await axiosInstance.post("/user/reset-password", {
        email: formData.email,
        password: formData.password,
      });

      alert(response.data.message || "Password Updated Successfully");

      navigate("/login");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Unable to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid my-5 d-flex justify-content-center">
      <form
        className="border p-5 rounded-5 shadow w-50"
        onSubmit={
          step === 1
            ? handleSendOTP
            : step === 2
            ? handleVerifyOTP
            : handleResetPassword
        }
      >
        <h2 className="text-center mb-4">Forgot Password</h2>

        {/* STEP INDICATOR */}
        <div className="text-center mb-4">
          <span className="badge bg-primary">
            Step {step} of 3
          </span>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div className="mb-3">
              <label className="form-label">Email</label>

              <input
                type="email"
                className="form-control"
                placeholder="Enter your registered email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <div className="mb-3">
              <label className="form-label">Email</label>

              <input
                className="form-control"
                value={formData.email}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Enter OTP</label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter 6-digit OTP"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="btn btn-success w-100"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <div className="mb-3">
              <label className="form-label">New Password</label>

              <input
                type="password"
                className="form-control"
                placeholder="Enter new password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">
                Confirm Password
              </label>

              <input
                type="password"
                className="form-control"
                placeholder="Confirm new password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;