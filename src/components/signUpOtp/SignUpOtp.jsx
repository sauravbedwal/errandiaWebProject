import React, { useState } from "react";
import "../../App.css";
import "react-phone-input-2/lib/style.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import OtpInput from "react-otp-input";

const SignUpOtp = () => {
  const [otp, setOtp] = useState([]);

  return (
    <div className="container loginImage-background col-lg-8">
      <div className="otp-box col-lg-8 col-md-10 col-xs-10">
        <Form className="otp-login">
          <div className="otp-heading">Enter OTP</div>
          <p className="otp-heading-para">
            Please enter the the 4 digit code sent to
            <span> +237651525252</span>
          </p>

          <OtpInput
            inputType="number"
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span> </span>}
            inputStyle="otp-input"
            renderInput={(props) => (
              <input
                {...props}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            )}
          />

          <p className="otp-timer">Code expires in 4:57s</p>
          <div className="otp-resend">Resend</div>

          <div className="d-flex flex-column align-items-center gap-3 otp-green-box">
            <Button
              variant="primary"
              type="submit"
              className="otp-blue"
              disabled={otp.length !== 4}
            >
              Continue
            </Button>
          </div>
        </Form>{" "}
      </div>
    </div>
  );
};

export default SignUpOtp;
