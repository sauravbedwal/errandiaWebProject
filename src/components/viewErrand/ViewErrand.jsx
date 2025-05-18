import React, { useEffect, useState } from "react";
import userErrandsFallback from "../../assets/userErrandsFallback.jpeg";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import apis, { IMAGE_BASE_URL } from "../../Constant";
import { token } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { setIsPending } from "../../utils/searchProductSlice";
import Loader from "../loader/Loader";

const ViewErrand = ({ errandDetailsId }) => {
  const [errandDetails, setErrandDetail] = useState(null);
  // console.log("errandDetails", errandDetails);
  // const notify = (msg) => toast(msg);

  const [loader, setLoader] = useState();

  const dispatch = useDispatch();

  const fetchErrandDetails = async (id) => {
    try {
      setLoader(true);
      dispatch(setIsPending(true));
      const res = await getApi(apis.errandsDetails + `/${id}`, token());
      dispatch(setIsPending(false));
      setLoader(false);
      setErrandDetail(res.data.data.item);
      // console.log("fetchErrandDetails", res);
    } catch (err) {
      setLoader(false);
      // console.log("API Error:", err);
      dispatch(setIsPending(false));
      if (err.response && err.response.status === 404) {
        // console.log("Resource not found!");
        notify("Oops! The request was not found.");
      }
    }
  };

  useEffect(() => {
    fetchErrandDetails(errandDetailsId);
  }, []);

  const isPendingFromStore = useSelector(
    (store) => store?.searchProduct?.isPending
  );

  return (
    <>
      {isPendingFromStore ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="card card-container-userProfileErrandsPosted">
                {/* <div className="row"> */}
                {/* <div className="col-xl-8 col-lg-7 col-md-7 col-sm-12 col-12 open-container"> */}
                <div className="card-body">
                  <div className="d-flex gap-3 businessUserView-image-container">
                    <img
                      className="businessPorfileUserView-pharmaciesImage"
                      src={
                        errandDetails?.images.length != 0
                          ? `${IMAGE_BASE_URL}${errandDetails?.images[0]?.image_path}`
                          : userErrandsFallback
                      }
                      alt="userProfileErrandsPostedImg"
                    />

                    <div
                      className="businessUserView-name-report-container"
                      style={{
                        width: "100%",
                        // display: "flex",
                        // flexWrap: "nowrap",
                      }}
                    >
                      <div>
                        <p className="userProfileErrandPosted-viewProfile-para">
                          {errandDetails?.when}
                        </p>
                        <div className="userProfileErrandsPosted-viewProfile-container">
                          {errandDetails?.title}
                        </div>
                        <p className="userProfileErrandsPosted-viewProfile-paraSecondary">
                          {errandDetails?.description}
                        </p>
                      </div>
                      <div className="userProfileErrandsPosted-viewProfile-paraSecondary">
                        {errandDetails?.region?.name &&
                          `${errandDetails?.region?.name}, `}
                        {errandDetails?.town?.name &&
                          `${errandDetails?.town?.name}`}
                      </div>
                    </div>
                  </div>
                </div>
                {/* </div> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewErrand;
