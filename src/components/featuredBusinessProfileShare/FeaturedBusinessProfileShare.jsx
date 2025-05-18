import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import whatsapp from "../../assets/images/whatsapp.png";
import Linkedin from "../../assets/Linkedin.svg";
import Facebook from "../../assets/Facebook.svg";
import x from "../../assets/x.svg";
import email from "../../assets/email.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  modalShareToggle,
  setShareModalFalse,
} from "../../utils/businessShareSlice";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import { ShareSocial } from "react-share-social";

const FeaturedBusinessProfileShare = () => {
  const shareModalBoolean = useSelector((store) => store?.businessShare?.value);

  const [link, setLink] = useState();

  const [copied, setCopied] = useState(false);

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    setLink(window.location.origin + pathname);
  }, [pathname]);

  <ShareSocial
    url={pathname}
    socialTypes={["facebook", "twitter", "linkedin", "whatsapp", "email"]}
  />;

  const copiedToClipboard = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    });
  };

  const fullURL = window.location.origin + pathname;

  return (
    <>
      <Modal
        size="lg"
        show={shareModalBoolean}
        aria-labelledby="example-modal-sizes-title-lg"
        className="featuredBusinessProfileShare-modal-Container"
      >
        <Modal.Header
          closeButton
          className="featureBusinessProfileShare-modal-header"
          onClick={() => {
            dispatch(modalShareToggle());
            dispatch(setShareModalFalse());
          }}
        >
          <Modal.Title
            id="example-modal-sizes-title-lg"
            className="featureBusinessProfileShare-heading"
          >
            Share this Business
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="featureBusinessProfileShare-social-Handles-container">
            <div className=" featureBusinessProfileShare-social-Handles">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(fullURL)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="featureBusinessProfileShare-image-text">
                  <img
                    src={whatsapp}
                    alt="whatsappIcon"
                    className="img-fluid"
                    style={{ width: "48px", height: "48px" }}
                  />
                  <p className="featureBusinessProfileShare-social-text">
                    WhatsApp
                  </p>
                </div>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  fullURL
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="featureBusinessProfileShare-image-text">
                  <img
                    src={Linkedin}
                    alt="LinkedInIcon"
                    className="img-fluid"
                  />
                  <p className="featureBusinessProfileShare-social-text">
                    LinkedIn
                  </p>
                </div>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  fullURL
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="featureBusinessProfileShare-image-text">
                  <img
                    src={Facebook}
                    alt="FacebookIcon"
                    className="img-fluid"
                  />
                  <p className="featureBusinessProfileShare-social-text">
                    Facebook
                  </p>
                </div>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  fullURL
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="featureBusinessProfileShare-image-text">
                  <img src={x} alt="TwitterIcon" className="img-fluid" />
                  <p className="featureBusinessProfileShare-social-text">X</p>
                </div>
              </a>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=&su=Check this out!&body=${encodeURIComponent(
                  fullURL
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="featureBusinessProfileShare-image-text">
                  <img src={email} alt="GmailIcon" className="img-fluid" />
                  <p className="featureBusinessProfileShare-social-text">
                    Gmail
                  </p>
                </div>
              </a>
            </div>

            <div className="input-group rounded gap-3">
              <input
                type="text"
                className="form-control rounded featureBusinessProfileShare-link"
                aria-label="Search"
                aria-describedby="search-addon"
                value={link}
                readOnly
              />

              <Button className="searchButton" onClick={copiedToClipboard}>
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FeaturedBusinessProfileShare;
