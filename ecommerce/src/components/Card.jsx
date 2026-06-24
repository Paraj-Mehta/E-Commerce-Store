import React from 'react'

const Card = () => {
    return (
        <div className="container-fluid my-5 d-flex justify-content-center">
            <div className="row g-5">

                <div className="card mx-3" style={{ width: '25rem', height: '18rem' }}>
                    <div className="card-body d-flex flex-column justify-content-center align-items-center">
                        <h5 className="card-title">Mobile</h5>
                        <h6 className="card-subtitle mb-2 text-muted">+91 98765 43210</h6>
                    </div>
                </div>

                <div className="card mx-3" style={{ width: '25rem', height: '18rem' }}>
                    <div className="card-body d-flex flex-column justify-content-center align-items-center">
                        <h5 className="card-title">Gmail</h5>
                        <h6 className="card-subtitle mb-2 text-muted">ecommerce@gmail.com</h6>
                    </div>
                </div>

                <div className="card mx-3" style={{ width: '25rem', height: '18rem' }}>
                    <div className="card-body d-flex flex-column justify-content-center align-items-center">
                        <h5 className="card-title">Address</h5>
                        <h6 className="card-subtitle mb-2 text-muted">123 Main Street, Ahmedabad, Gujarat 32461</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card