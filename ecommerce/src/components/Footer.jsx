import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-light pt-4 pb-2 mt-5">
      <div className="container">
        <div className="row">

          {/* About Section */}
          <div className="col-md-4 mb-3">
            <h5>My Website</h5>
            <p>
              This is a E-Commerce website build using react and Bootstrap.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>

            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/about" className="text-light text-decoration-none">
                  About
                </Link>
              </li>

            </ul>
          </div>

          {/* Social Links */}
          <div className="col-md-4 mb-3">
            <h5>Follow Us</h5>

            <Link to="/" className="text-light me-3">
              Facebook
            </Link>

            <Link to="/" className="text-light me-3">
              Instagram
            </Link>

            <Link to="/" className="text-light">
              LinkedIn
            </Link>
          </div>

        </div>

        <hr className="border-light" />

        {/* Bottom Text */}
        <div className="text-center">
          <p className="mb-0">
            © 2026 My Website. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;