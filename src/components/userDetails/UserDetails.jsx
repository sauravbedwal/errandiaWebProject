import React, { useState } from "react";
import UserInfo from "../userInfo/UserInfo";
import UserProfileSidebar from "../userProfileSidebar/UserProfileSidebar";
import UserProfileBusinessFound from "../userProfileBusinessFound/UserProfileBusinessFound";
import EditBusinessForm from "../editBusinessForm/EditBusinessForm";
import UserProfileProducts from "../userProfileProducts/UserProfileProducts";
import UserProfileService from "../userProfileService/UserProfileService";
import UserProfileBusinessSingleProduct from "../userProfileBusinessSingleProduct/UserProfileBusinessSingleProduct";
import UserProfileNoErrands from "../userProfileNoErrands/UserProfileNoErrands";
import UserProfileErrandsReceived from "../userProfileErrandsReceived/UserProfileErrandsReceived";
// import UserProfileErrandsPosted from "../userProfileErrandsPosted/UserProfileErrandsPosted";
import UserProfileNoReportsFiled from "../userProfileNoReportsFiled/UserProfileNoReportsFiled";
import UserProfileReportsFound from "../userProfileReportsFound/UserProfileReportsFound";
import EditErrands from "../editErrands/EditErrands";
import ViewReportThread from "../viewReportThread/ViewReportThread";
import ViewErrand from "../viewErrand/ViewErrand";

const UserDetails = () => {
  const [detailSelected, setDetailSelected] = useState("Businesses");

  const [errandDetailsId, setErrandDetailsId] = useState(null);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <UserInfo
              detailSelected={detailSelected}
              setDetailSelected={setDetailSelected}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            {/* <UserProfileNoBusinessFound /> */}
            {/* <UserProfileNoProductsFound /> */}
            {/* <UserProfileNoServiceFound /> */}
            {/* <UserProfileNoErrands /> */}
            {/* <UserProfileNoReportsFiled /> */}
            {detailSelected === "EditBusinessForm" && (
              <EditBusinessForm
                detailSelected={detailSelected}
                setDetailSelected={setDetailSelected}
                errandDetailsId={errandDetailsId}
              />
            )}
            {detailSelected === "Businesses" && (
              <UserProfileBusinessFound
                detailSelected={detailSelected}
                setDetailSelected={setDetailSelected}
                setErrandDetailsId={setErrandDetailsId}
              />
            )}
            {detailSelected === "Products" && (
              <UserProfileProducts service="0" />
            )}
            {detailSelected === "Services" && (
              <UserProfileProducts service="1" />
            )}
            {/* {detailSelected === "userProfileBusinessSingleProduct" && (
              <UserProfileBusinessSingleProduct
                detailSelected={detailSelected}
                setDetailSelected={setDetailSelected}
              />
            )} */}
            {detailSelected === "Errands" && (
              <UserProfileErrandsReceived
                detailSelected={detailSelected}
                setDetailSelected={setDetailSelected}
                setErrandDetailsId={setErrandDetailsId}
              />
            )}

            {detailSelected === "viewErrand" && (
              <ViewErrand
                setErrandDetailsId={setErrandDetailsId}
                errandDetailsId={errandDetailsId}
              />
            )}

            {/* {detailSelected === "ErrandsPosted" && (
              <UserProfileErrandsPosted
                detailSelected={detailSelected}
                setDetailSelected={setDetailSelected}
              />
            )} */}

            {detailSelected === "EditErrands" && (
              <EditErrands
                detailSelected={detailSelected}
                setDetailSelected={setDetailSelected}
              />
            )}

            {detailSelected === "Reports" && (
              <UserProfileReportsFound
                detailSelected={detailSelected}
                setDetailSelected={setDetailSelected}
              />
            )}
            {detailSelected === "ViewReportThread" && (
              <ViewReportThread
                detailSelected={detailSelected}
                setDetailSelected={setDetailSelected}
              />
            )}
          </div>
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <UserProfileSidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
