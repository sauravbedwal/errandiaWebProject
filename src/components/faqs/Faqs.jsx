import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import aboutImage from "../../assets/images/about-us-img.png";
import aboutImageVision from "../../assets/images/about-vision.png";
import aboutImageMission from "../../assets/images/about-mission.png";
import team1 from "../../assets/images/team1.png";
import team2 from "../../assets/images/team2.png";
import team3 from "../../assets/images/team3.png";
import { notifyError } from "../../utils/utils";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import apis from "../../Constant";
import { useDispatch, useSelector } from "react-redux";
import { setIsPending } from "../../utils/searchProductSlice";
import Loader from "../loader/Loader";

const Faqs = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [faqData, setFaqData] = useState(null);

  // const data = [
  //   {
  //     title: "General Questions",
  //     items: [
  //       {
  //         question: "Frequently Asked Questions (FAQs)",
  //         details: "Placing Deliveries",
  //       },
  //       {
  //         question: "Frequently Asked Questions (FAQs)",
  //         details: "Placing Deliveries",
  //       },
  //       {
  //         question: "Frequently Asked Questions (FAQs)",
  //         details: "Placing Deliveries",
  //       },
  //       {
  //         question: "Frequently Asked Questions (FAQs)",
  //         details: "Placing Deliveries",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Businesses",
  //     items: [
  //       {
  //         question: "Frequently Asked Questions (FAQs)",
  //         details: "Placing Deliveries",
  //       },
  //       {
  //         question: "Frequently Asked Questions (FAQs)",
  //         details: "Placing Deliveries",
  //       },
  //       {
  //         question: "Frequently Asked Questions (FAQs)",
  //         details: "Placing Deliveries",
  //       },
  //       {
  //         question: "Frequently Asked Questions (FAQs)",
  //         details: "Placing Deliveries",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Managing Accounts",
  //     items: [
  //       {
  //         question: "Frequently Asked Questions (FAQs)",
  //         details: "Placing Deliveries",
  //       },
  //       {
  //         question: "Frequently Asked Questions (FAQs)",
  //         details: "Placing Deliveries",
  //       },
  //       {
  //         question: "Frequently Asked Questions (FAQs)",
  //         details: "Placing Deliveries",
  //       },
  //       {
  //         question: "Frequently Asked Questions (FAQs)",
  //         details: "Placing Deliveries",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Errands",
  //     items: [
  //       {
  //         question: "Frequently Asked Questions (FAQs)",
  //         details: "Placing Deliveries",
  //       },
  //       {
  //         question: "Frequently Asked Questions (FAQs)",
  //         details: "Placing Deliveries",
  //       },
  //       {
  //         question: "Frequently Asked Questions (FAQs)",
  //         details: "Placing Deliveries",
  //       },
  //       {
  //         question: "Frequently Asked Questions (FAQs)",
  //         details: "Placing Deliveries",
  //       },
  //     ],
  //   },
  //   {
  //     title: "MANAGING PRODUCTS AND SERVICES",
  //     items: [
  //       {
  //         question: "Frequently Asked Questions (FAQs)",
  //         details: "Placing Deliveries",
  //       },
  //       {
  //         question: "Frequently Asked Questions (FAQs)",
  //         details: "Placing Deliveries",
  //       },
  //       {
  //         question: "Frequently Asked Questions (FAQs)",
  //         details: "Placing Deliveries",
  //       },
  //       {
  //         question: "Frequently Asked Questions (FAQs)",
  //         details: "Placing Deliveries",
  //       },
  //     ],
  //   },
  //   {
  //     title: "ERRANDO",
  //     items: [
  //       {
  //         question: "Frequently Asked Questions (FAQs)",
  //         details: "Placing Deliveries",
  //       },
  //       {
  //         question: "Frequently Asked Questions (FAQs)",
  //         details: "Placing Deliveries",
  //       },
  //       {
  //         question: "Frequently Asked Questions (FAQs)",
  //         details: "Placing Deliveries",
  //       },
  //       {
  //         question: "Frequently Asked Questions (FAQs)",
  //         details: "Placing Deliveries",
  //       },
  //     ],
  //   },
  // ];

  const toggleAccordion = (index) => {
    setActiveSection((prevIndex) => (prevIndex === index ? null : index));
  };

  const dispatch = useDispatch();

  const fetchGeneralFaq = async () => {
    try {
      // const params = new URLSearchParams({
      //   page: "1",
      //   per,
      // });
      dispatch(setIsPending(true));
      const res = await getApi(apis.faq);
      dispatch(setIsPending(false));
      if (res.status === 200) {
        setFaqData(res.data.data.items);
      }
    } catch (err) {
      console.log(err);
      dispatch(setIsPending(false));
      notifyError("Oops! The request was not found.");
    }
  };

  useEffect(() => {
    fetchGeneralFaq();
  }, []);

  const isPendingFromStore = useSelector(
    (store) => store?.searchProduct?.isPending
  );

  return (
    <>
      {isPendingFromStore ? (
        <Loader />
      ) : (
        <div className="container mt-5 mb-5">
          <div className="row g-4">
            <div className="col-md-12">
              {" "}
              {/* Single column for all FAQs */}
              <div className="card">
                <div className="card-header card-header-faq">
                  <h5 className="mb-0">General Questions</h5>
                </div>
                <div className="card-body">
                  {faqData?.map((item, index) => (
                    <div key={item.id} className="mb-2">
                      <div
                        className={`d-flex justify-content-between align-items-center p-3 rounded question-faq ${
                          activeSection === index
                            ? "active"
                            : "bg-light text-dark"
                        }`}
                        onClick={() => toggleAccordion(index)}
                        style={{ cursor: "pointer" }}
                      >
                        {item.question}
                        <span>{activeSection === index ? "—" : "+"}</span>
                      </div>
                      {activeSection === index && (
                        <div
                          className="border p-3 mt-1 bg-white"
                          dangerouslySetInnerHTML={{ __html: item.answer }} // Render HTML safely
                        />
                      )}
                    </div>
                  ))}
                  <div className="text-center">
                    <Link to="/faqs-details">
                      <button className="btn btn-back mt-3">
                        See All Questions →
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Faqs;
