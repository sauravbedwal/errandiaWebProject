import React from "react";

const Notification = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="position-fixed top-0 start-50 translate-middle-x mt-3">
            <div
              className="card border-primary shadow rounded-3"
              style={{ width: "22rem" }}
            >
              <div className="d-flex align-items-center p-3">
                <img
                  src="/your-image-url.png"
                  alt="Logo"
                  className="me-2"
                  style={{ width: "50px", height: "50px" }}
                />
                <div>
                  <h6 className="text-primary fw-bold m-0">
                    Your Business has been Verified!
                  </h6>
                  <p className="text-muted mb-0 small">
                    We are happy to inform you that the business by the name
                    <strong> "Nishang Systems" </strong> has been successfu...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
