import React from "react";
import noRunErrandFound from "../../assets/noRunErrandFound.svg";
import addNoBusiness from "../../assets/addNoBusiness.svg";
import reportRunErrand from "../../assets/reportRunErrand.svg";

const UserProfileNoReportsFiled = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="userProfileNoBusinessFound-container">
            <div className="userProfileNoBusinessFound-image-container">
              <img
                src={reportRunErrand}
                alt="reportRunErrand"
                className="img-fluid"
              />
            </div>
            <h4 className="pharmaciesNoResultFound-heading">
              No Reports Filed Yet
            </h4>
            <p className="userProfile-no-reports-subText">
              You haven't reported any business yet. If you experience issues
              with a vendor business, or late delivery, you can file a report.
              Our team will review and take necessary action.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileNoReportsFiled;
