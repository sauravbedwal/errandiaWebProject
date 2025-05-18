import React from "react";
import noBusiness from "../../assets/noBusiness.svg";
import addNoBusiness from "../../assets/addNoBusiness.svg";
import AddBusinessFormModal from "../addBusinessFormModal/AddBusinessFormModal";
import { useDispatch } from "react-redux";
import {
  modalAddBusinessToggle,
  setAddBusinessModalTrue,
} from "../../utils/addBusinessModalSlice";

const UserProfileNoBusinessFound = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="userProfileNoBusinessFound-container">
              <div className="userProfileNoBusinessFound-image-container">
                <img
                  src={noBusiness}
                  alt="noPharmaciesFound"
                  className="img-fluid"
                />
              </div>
              <h4 className="pharmaciesNoResultFound-heading">
                You don't have any businesses yet.
              </h4>
              <p className="pharmaciesNoResultFound-subText">Create one now.</p>
              <button
                type="button"
                class="btn btn-primary btn-lg businessUserView-location-whiteButton"
                style={{ marginTop: "20px" }}
                onClick={() => {
                  dispatch(modalAddBusinessToggle());
                  dispatch(setAddBusinessModalTrue());
                }}
              >
                <img
                  src={addNoBusiness}
                  alt="addNoBusiness"
                  className="img-fluid"
                />
                Add Business
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddBusinessFormModal />
    </>
  );
};

export default UserProfileNoBusinessFound;
