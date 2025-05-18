import React, { useState, useEffect } from "react";
import "../../App.css";
import "react-phone-input-2/lib/style.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { postApi } from "../../fetchApi/FetchAxiosApi";
import apis from "../../Constant";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { addUserDetails } from "../../utils/userDetailsSlice";

export const LoginOtp = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(300);

  const userId = useSelector((store) => store?.user?.data?.uuid);
  // console.log("userId", userId);

  const [error, setError] = useState({
    allError: false,
    error500: false,
  });
  const [resendOtpMessage, setResendOtpMessage] = useState(false);

  const dispatch = useDispatch();
  // const loginCredential = JSON.parse(sessionStorage.getItem("user"));
  const loginCredential = Cookies.get("user");
  // console.log("loginCredentialOTP", loginCredential);

  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (timer <= 0) return;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   console.log("useEffect");
  //   if (timer <= 0) return; // Stop when timer reaches 0

  //   const interval = setInterval(() => {
  //     setTimer((prev) => prev - 1);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [timer]); // Depend on timer so it updates correctly

  const resendOtpHandler = async () => {
    try {
      setTimer(300);
      const res = await postApi(apis.login, {
        identifier: loginCredential,
      });
      // console.log("Resend OTP response:", res);
      if (res.message === " An OTP code has been sent to your email address") {
        setResendOtpMessage(true);
      }
    } catch (err) {
      console.error("Resend OTP error:", err);
    }
  };

  const loginOtpHandler = async () => {
    try {
      if (otp.length === 4 && userId) {
        const res = await postApi(apis.otpLogin, {
          code: otp,
          uuid: userId,
        });
        console.log("Login response:", res);
        console.log("Login response:", res?.data?.message);

        if (res?.data?.message === "otp ok") {
          // sessionStorage.setItem("access_token", res?.data?.data?.token);
          dispatch(addUserDetails(res.data.data.user));
          const token = res?.data?.data?.token;
          Cookies.set("auth_token", token);
          navigate("/");
        }
      }
    } catch (err) {
      console.log(err.response);
      if (err?.response?.status === 500) {
        setError((prev) => ({ ...prev, error500: true }));
      } else if (err) {
        setError((prev) => ({ ...prev, allError: true }));
      }
    }
  };

  const formatTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const { t } = useTranslation();

  return (
    <div className="container loginImage-background col-lg-8">
      <div className="otp-box col-lg-8">
        <Form className="otp-login">
          <div className="otp-heading">{t("Enter OTP")}</div>
          <p className="otp-heading-para">
            {loginCredential?.includes("+") ? (
              <>
                {t("Please enter the 4-digit code sent to the WhatsApp Number")}{" "}
                <span>{loginCredential}</span>
              </>
            ) : (
              <>
                {t("Please enter the 4-digit code sent to the email address")}{" "}
                {loginCredential?.includes("@") ? (
                  <span>{loginCredential}</span>
                ) : (
                  ""
                )}
              </>
            )}
          </p>
          {/* {resendOtpHandler && (
            <p
              style={{ color: "green", textAlign: "center", fontSize: "14px" }}
            >
              An OTP code has been sent to your email address
            </p>
          )} */}
          {(error.allError && (
            <p style={{ color: "red" }}>{t("Invalid OTP")}</p>
          )) ||
            (error.error500 && (
              <p style={{ color: "red" }}>
                {t("Server Issue!!! Try again later.")}
              </p>
            ))}

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

          <p className="otp-timer">
            {t("Code expires in ")} {formatTimer(timer)}
          </p>

          <button
            onClick={resendOtpHandler}
            className="otp-resend-button"
            disabled={timer > 0}
          >
            {t("Resend")}
          </button>

          <div className="d-flex flex-column align-items-center gap-3 otp-green-box">
            <Button
              variant="primary"
              className="otp-green"
              onClick={loginOtpHandler}
            >
              {t("Continue")}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
