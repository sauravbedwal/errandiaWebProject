import React from "react";
import noRunErrandFound from "../../assets/noRunErrandFound.svg";
import addNoBusiness from "../../assets/addNoBusiness.svg";
import { useDispatch } from "react-redux";
import { modalToggle, setModalTrue } from "../../utils/modalSlice";

const UserProfileNoErrands = () => {
  const dispatch = useDispatch();
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="userProfileNoBusinessFound-container">
            <div className="userProfileNoBusinessFound-image-container">
              <img
                src={noRunErrandFound}
                alt="noRunErrandFound"
                className="img-fluid"
              />
            </div>
            <h4 className="pharmaciesNoResultFound-heading">
              You don't have any errands yet..{" "}
            </h4>
            <p className="pharmaciesNoResultFound-subText">Create one now.</p>
            <button
              type="button"
              class="btn btn-primary btn-lg businessUserView-location-whiteButton"
              style={{ marginTop: "20px" }}
              onClick={() => {
                dispatch(modalToggle());
                dispatch(setModalTrue());
              }}
            >
              <img
                src={addNoBusiness}
                alt="addNoBusiness"
                className="img-fluid"
              />
              Run Errand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileNoErrands;
