import React, { useRef, useEffect, useState } from "react";
import "../../App.css";
import Dropdown from "react-bootstrap/Dropdown";
import addedErrandsImage from "../../assets/addedErrandsImage2.svg";
import Button from "react-bootstrap/Button";
import { setTrue, toggle } from "../../utils/booleanSlice";
import PaginationComponent from "../pagination/PaginationComponent";
import apis, { IMAGE_BASE_URL } from "../../Constant";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import { token } from "../../utils/utils";
import { recentErrandsList } from "../../utils/recentErrandsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import Loader from "../loader/Loader";

const AllRecentErrands = () => {
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);

  const recentErrandsListData = useSelector(
    (store) => store?.recentErrandsData
  );
  const regionFromStore = useSelector((store) => store.searchProduct.region);
  // console.log("regionFromStore", regionFromStore);

  const townsFromStore = useSelector((store) => store.searchProduct.town);
  // console.log("townsFromStore", townsFromStore);
  // console.log("recentErrandsListData", recentErrandsListData);

  useEffect(() => {
    // console.log("Checking featuredListData", recentErrandsListData);

    if (!recentErrandsListData) {
      const recentErrandsListHandler = async () => {
        try {
          setLoader(true);
          const res = await getApi(apis.recentErrands, token());
          // console.log("API Response:", res);

          if (res.data?.data?.items) {
            // console.log(res.data?.data?.items)
            dispatch(recentErrandsList(res.data.data.items));
          } else {
            console.error("Unexpected API response format:", res);
          }
        } catch (err) {
          // console.log("API Error:", err);
          if (err.response && err.response.status === 404) {
            // console.log("Resource not found!");
          }
        } finally {
          setLoader(false);
        }
      };

      recentErrandsListHandler();
    }
  }, [dispatch, recentErrandsListData, regionFromStore, townsFromStore]);

  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="addedErrands-container">
            <h4 className="addedErrands-heading">{t("All Recent Errands")}</h4>

            {/* <div className="ddedErrands-dropDownContainer">
              <p className="ddedErrands-dropDownHeading">{t("Sort By")} :</p>
              <Dropdown drop="down">
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  className="addedErrands-dropdown"
                >
                  Distance (km)
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div> */}

            {/* <Button
              variant="primary"
              className="addedErrands-offCanvas-button mt-3"
              onClick={() => {
                dispatch(toggle());

                dispatch(setTrue());
              }}
            >
              Filter and Search
            </Button> */}
          </div>
        </div>

        {/* <div className="container"> */}
        <div className="row addedErrands-items-container">
          {loader && <Loader />}
          {recentErrandsListData &&
            recentErrandsListData.map((errands, index) => (
              <div className="card addedErrandsCard-container me-2 col-xl-3 col-lg-6 col-md-6 col-sm-6 mt-4 mb-4">
                <div
                  // className="card-body"
                  onClick={() => {
                    navigate(`/errand-single/${errands.id}`);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div>
                    <div className="d-flex justify-content-center">
                      <img
                        className="addedErrands-ImageContainer3"
                        src={
                          Array.isArray(errands?.images) &&
                          errands.images.length > 0
                            ? `${IMAGE_BASE_URL}${errands.images[0].image_path}`
                            : addedErrandsImage
                        }
                        alt="Feature Image"
                        onError={(e) => {
                          e.target.src = addedErrandsImage;
                        }}
                      />
                    </div>
                    <div>
                      <div className="addedErrandsCard-preHeading">
                        {errands?.when}
                      </div>
                      <h5 className="card-title addedErrandsCard-heading mt-2">
                        {parse(
                          errands?.description.length > 25
                            ? `${errands?.description.substring(0, 25)}...`
                            : errands?.description
                        )}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* </div> */}

        {/* <PaginationComponent /> */}
      </div>
    </div>
  );
};

export default AllRecentErrands;
