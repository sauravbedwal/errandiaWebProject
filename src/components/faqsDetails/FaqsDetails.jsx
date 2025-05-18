import React, { useState, useEffect } from "react";
import { notifyError } from "../../utils/utils";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import apis from "../../Constant";
import FiltersAndSearch from "../../components/filtersAndSearch/FiltersAndSearch";
import { useDispatch, useSelector } from "react-redux";
import { setIsPending } from "../../utils/searchProductSlice";
import Loader from "../loader/Loader";

const FaqsDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [faqData, setFaqData] = useState([]);

  const dispatch = useDispatch();

  const fetchGeneralFaq = async () => {
    try {
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

  const categorizedFaqs = faqData.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {});

  const categories = Object.keys(categorizedFaqs);

  const handleToggleQuestion = (index) => {
    setActiveQuestion((prev) => (prev === index ? null : index));
  };

  const isPendingFromStore = useSelector(
    (store) => store?.searchProduct?.isPending
  );

  return (
    <>
      {isPendingFromStore ? (
        <Loader />
      ) : (
        <div className="container mt-4 faq-container">
          <div className="row">
            <div className="col-md-3 faq-sidebar mb-3">
              <ul className="nav flex-column nav-tabs">
                {categories.map((category, index) => (
                  <li key={index} className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === index ? "active-tab" : ""
                      }`}
                      onClick={() => setActiveTab(index)}
                    >
                      {/* {category} */}
                      General Questions
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-md-6 faq-content mb-3">
              {/* <h3 className="mb-4">{categories[activeTab]}</h3> */}
              <h3 className="mb-4">General Questions</h3>

              <div className="accordion">
                {categorizedFaqs[categories[activeTab]]?.map((faq, index) => (
                  <div key={faq.id} className="accordion-item faq-item">
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${
                          activeQuestion === index ? "" : "collapsed"
                        }`}
                        onClick={() => handleToggleQuestion(index)}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      className={`accordion-collapse collapse ${
                        activeQuestion === index ? "show" : ""
                      }`}
                    >
                      <div
                        className="accordion-body"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-3 faq-ad-banner mt-4">
              {/* <div className="ad-placeholder">
            <p>AD BANNER</p>
            <p>262px × 400px</p>
          </div> */}
              <FiltersAndSearch />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FaqsDetails;
