// import "../../App.css";
// import { useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Dropdown from "react-bootstrap/Dropdown";
// import { useState } from "react";
// import { ButtonGroup, ToggleButton, Container } from "react-bootstrap";
// import { modalCallToggle, setCallModalTrue } from "../../utils/callModalSlice";
// import addNoBusiness from "../../assets/addNoBusiness.svg";
// import userProfileErrandsPostedImg from "../../assets/userProfileErrandsPostedImg.svg";
// import editErrand from "../../assets/editErrand.svg";
// import viewErrand from "../../assets/viewErrand.svg";
// import markAsFound from "../../assets/markAsFound.svg";
// import viewResults from "../../assets/viewResults.svg";
// import RunErrandNew from "../runErrandNew/RunErrandNew";
// import {
//   modalRunErrandNewToggle,
//   setRunErrandNewModalTrue,
// } from "../../utils/runErrandNewModalSlice";
// import ErrandsItemFound from "../errandsItemFound/ErrandsItemFound";
// import {
//   modalErrandsItemFoundToggle,
//   setErrandsItemFoundModalTrue,
// } from "../../utils/errandsItemFoundModalSlice";

// const UserProfileErrandsPosted = ({ detailSelected, setDetailSelected }) => {
//   const modalBoolean = useSelector((store) => store.modal.value);

//   const dispatch = useDispatch();

//   const navigate = useNavigate();

//   const [selected, setSelected] = useState("received");
//   return (
//     <>
//       <div className="container">
//         <div className="row">
//           <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
//             <div className="allPublicOffices-dropDown-filter-Container">
//               <div className="products-services-dropDownContainer">
//                 <Container className="products-services-buttons">
//                   <ButtonGroup>
//                     <ToggleButton
//                       type="radio"
//                       variant={
//                         selected === "received"
//                           ? "outline-primary active"
//                           : "outline-secondary"
//                       }
//                       checked={selected === "received"}
//                       onClick={() => {
//                         setSelected("received");
//                         setDetailSelected("Errands");
//                       }}
//                       className="custom-toggle"
//                     >
//                       Received
//                     </ToggleButton>
//                     <ToggleButton
//                       type="radio"
//                       variant={
//                         selected === "posted"
//                           ? "outline-primary active"
//                           : "outline-secondary"
//                       }
//                       checked={selected === "posted"}
//                       onClick={() => {
//                         setSelected("posted");
//                         //   navigate("/search-services");
//                         setDetailSelected("ErrandsPosted");
//                       }}
//                       className="custom-toggle"
//                     >
//                       Posted{" "}
//                     </ToggleButton>
//                   </ButtonGroup>
//                 </Container>
//                 <div className="userProfileerrandsReceived-sortBy-container">
//                   {/* <p className="allPublicOffices-dropDownHeading">Sort By :</p>
//                   <Dropdown drop="down">
//                     <Dropdown.Toggle
//                       variant="success"
//                       id="dropdown-basic"
//                       className="allPublicOffices-dropdown"
//                     >
//                       Distance (km)
//                     </Dropdown.Toggle>

//                     <Dropdown.Menu>
//                       <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
//                       <Dropdown.Item href="#/action-2">
//                         Another action
//                       </Dropdown.Item>
//                       <Dropdown.Item href="#/action-3">
//                         Something else
//                       </Dropdown.Item>
//                     </Dropdown.Menu>
//                   </Dropdown> */}

//                   <button
//                     type="button"
//                     class="btn btn-primary btn-lg businessUserView-location-whiteButton"
//                     onClick={() => {
//                       dispatch(modalRunErrandNewToggle());
//                       dispatch(setRunErrandNewModalTrue());
//                     }}
//                   >
//                     <img
//                       src={addNoBusiness}
//                       alt="addNoBusiness"
//                       className="img-fluid"
//                     />
//                     Run Errand
//                   </button>
//                 </div>
//               </div>

//               {/* <Button
//                   variant="primary"
//                   className="addedErrands-offCanvas-button"
//                   onClick={() => {
//                     dispatch(toggle());

//                     dispatch(setTrue());
//                   }}
//                 >
//                   Filter and Search
//                 </Button> */}
//             </div>
//           </div>
//         </div>

//         <div className="row">
//           <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
//             <div className="card card-container-userProfileErrandsPosted">
//               {/* <div className="row"> */}
//               {/* <div className="col-xl-8 col-lg-7 col-md-7 col-sm-12 col-12 open-container"> */}
//               <div className="card-body">
//                 <div className="d-flex gap-3 businessUserView-image-container">
//                   <img
//                     className="businessPorfileUserView-pharmaciesImage"
//                     src={userProfileErrandsPostedImg}
//                     alt="userProfileErrandsPostedImg"
//                   />

//                   <div
//                     className="businessUserView-name-report-container"
//                     style={{ width: "100%" }}
//                   >
//                     <div>
//                       <p className="userProfileErrandPosted-viewProfile-para">
//                         12 minutes ago
//                       </p>
//                       <div className="userProfileErrandsPosted-viewProfile-container">
//                         I need Marriage Makeup Services
//                       </div>
//                       <p className="userProfileErrandsPosted-viewProfile-paraSecondary">
//                         just some sample lengthy description about the printer
//                         in question and shou...
//                       </p>
//                     </div>

//                     <div
//                       className="userProfileErrandsPosted-dropDownContainer"
//                       onClick={() => {
//                         dispatch(modalCallToggle());
//                         dispatch(setCallModalTrue());
//                       }}
//                     >
//                       <Dropdown drop="down">
//                         <Dropdown.Toggle
//                           variant="success"
//                           id="dropdown-basic"
//                           className="userProfileErrandsPosted businessUserView-call-button"
//                         >
//                           Edit Errand
//                         </Dropdown.Toggle>

//                         <Dropdown.Menu className="userInfo-dropDown-container">
//                           <Dropdown.Item
//                             className="userProfileBusinessFound-dropDown"
//                             onClick={() => {
//                               // setDetailSelected("EditBusinessForm");
//                               setDetailSelected("EditErrands");
//                             }}
//                             // onClick={() => {
//                             //   console.log("1");
//                             //   dispatch(modalVerifyBusinessToggle());
//                             //   dispatch(setVerifyBusinessModalTrue());
//                             // }}
//                           >
//                             <img src={editErrand} alt="editErrand" />
//                             Delete
//                           </Dropdown.Item>
//                           <Dropdown.Item
//                             className="userProfileBusinessFound-dropDown"
//                             // onClick={() => {
//                             //   console.log("1");
//                             //   dispatch(modalVerifyBusinessToggle());
//                             //   dispatch(setVerifyBusinessModalTrue());
//                             // }}
//                           >
//                             <img src={viewErrand} at="viewErrand" />
//                             View Errand{" "}
//                           </Dropdown.Item>
//                           <Dropdown.Item
//                             className="userProfileBusinessFound-dropDown"
//                             onClick={() => {
//                               // console.log("1");
//                               dispatch(modalErrandsItemFoundToggle());
//                               dispatch(setErrandsItemFoundModalTrue());
//                             }}
//                           >
//                             <img
//                               src={markAsFound}
//                               alt="markAsFound"
//                               className="img-fluid"
//                             />
//                             Mark as found{" "}
//                           </Dropdown.Item>
//                           <Dropdown.Item
//                             className="userProfileBusinessFound-dropDown"
//                             onClick={() => {
//                               // console.log("1");
//                               dispatch(modalVerifyBusinessToggle());
//                               dispatch(setVerifyBusinessModalTrue());
//                             }}
//                           >
//                             <img
//                               src={viewResults}
//                               alt="viewResults"
//                               className="img-fluid"
//                             />
//                             View Results
//                           </Dropdown.Item>
//                         </Dropdown.Menu>
//                       </Dropdown>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {/* </div> */}
//               {/* </div> */}
//             </div>
//           </div>
//         </div>
//       </div>
//       <RunErrandNew />
//       <ErrandsItemFound />
//     </>
//   );
// };

// export default UserProfileErrandsPosted;
