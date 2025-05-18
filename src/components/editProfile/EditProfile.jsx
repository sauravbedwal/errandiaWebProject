import React, { useEffect, useState } from "react";
import UserInfo from "../userInfo/UserInfo";
import EditProfileSidebar from "../editProfileSidebar/EditProfileSidebar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import ErrandiaBooster from "../errandiaBooster/ErrandiaBooster";
import {
  modalErrandiaBoosterToggle,
  setErrandiaBoosterModalTrue,
} from "../../utils/errandiaBoosterSlice";
import axios from "axios";
import {
  deleteApi,
  getApi,
  isTokenValid,
  patchApi,
  postApi,
} from "../../fetchApi/FetchAxiosApi";
import apis, { IMAGE_BASE_URL } from "../../Constant";
import { useNavigate } from "react-router-dom";
import { notifyError, token } from "../../utils/utils";
import { useTranslation } from "react-i18next";
import { removeUserDetails } from "../../utils/userDetailsSlice";
import ourErrandsImage from "../../assets/images/errandos-image.png";
import Cookies from "js-cookie";
import { removeUser } from "../../utils/userSlice";
import { removeBusiness } from "../../utils/businessDataSlice";
import { removeProducts, removeServices } from "../../utils/productsDataSlice";
import { setIsPending } from "../../utils/searchProductSlice";
import Loader from "../loader/Loader";

const EditProfile = () => {
  // const token = sessionStorage.getItem("access_token");

  const [detailSelected, setDetailSelected] = useState("Businesses");

  const [activeTab, setActiveTab] = useState(0);

  const [mySubscriptions, setMySubscriptions] = useState();

  const dispatch = useDispatch();

  const inputStyle = {
    width: "100%",
    height: "35px",
    borderRadius: "10px",
    border: "1px solid #eceff2",
    outline: "none",
    boxShadow: "none",
  };

  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("Browse files...");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Set preview image
      setImageName(file.name); // Set imagess name
      // setFormImage({
      //   image: file,
      // }); //
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault(); // Prevents page refresh
    document.getElementById("image-upload").click();
  };

  const navigate = useNavigate();

  const logOutHandler = async () => {
    try {
      const res = await deleteApi(apis.logout, token());
      // console.log("logOutHandler", res);
      dispatch(removeUserDetails());
      dispatch(removeUser());
      dispatch(removeBusiness());
      dispatch(removeProducts());
      dispatch(removeServices());

      // sessionStorage.clear();
      Cookies.remove("auth_token", { path: "/" });
      Cookies.remove("user", { path: "/" });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // const [formImage, setFormImage] = useState({
  //   image: "",
  // });

  // console.log("formImage.image", formImage);

  const userDetails = useSelector((store) => store.userDetails);
  // console.log("userDetails", userDetails);

  const [name, setName] = useState({
    field_name: "name",
    field_value: "",
  });

  const [email, setEmail] = useState({
    field_name: "email",
    field_value: "",
  });

  const [whatsapp_number, setWhatsapp_number] = useState({
    field_name: "whatsapp_number",
    field_value: "",
  });

  const [phone, setPhone] = useState({
    field_name: "phone",
    field_value: "",
  });

  // console.log("name", name);

  useEffect(() => {
    setName({
      field_name: "name",
      field_value: userDetails?.name,
    });

    setEmail({
      field_name: "email",
      field_value: userDetails?.email,
    });

    setWhatsapp_number({
      field_name: "whatsapp_number",
      field_value: userDetails?.whatsapp_number,
    });

    setPhone({
      field_name: "phone",
      field_value: userDetails?.phone,
    });

    setImage(`${IMAGE_BASE_URL}${userDetails?.photo}`);
  }, [userDetails]);

  // const reqMergedObj = { ...name, ...email, ...whatsapp_number, ...phone };
  // console.log("reqMergedObj", reqMergedObj);

  // const uploadProfileImageHandler = async () => {
  //   console.log("uploadProfileImageHandler working");
  //   if (!formImage.image) return;

  //   try {
  //     const form = new FormData();
  //     form.append("image", formImage.image);

  //     const res = await postApi(apis.profileImage, form, token(), true);
  //     // console.log("postProfile", res);
  //   } catch (err) {
  //     console.log("uploadProfileImageHandler", err);
  //   }
  // };

  // const nameUpdateHandler = async () => {
  //   try {
  //     const res = await patchApi(apis.userDetails, name, token());
  //     console.log("nameUpdateHandler", res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const emailUpdateHandler = async () => {
  //   try {
  //     const res = await patchApi(apis.userDetails, email, token());
  //     console.log("emailUpdateHandler", res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const whatsAppUpdateHandler = async () => {
  //   try {
  //     const res = await patchApi(apis.userDetails, whatsapp_number, token());
  //     console.log("whatsAppUpdateHandler", res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const phoneUpdateHandler = async () => {
  //   try {
  //     const res = await patchApi(apis.userDetails, phone, token());
  //     console.log("phoneUpdateHandler", res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const { t } = useTranslation();

  const fetchMySubscriptions = async () => {
    try {
      dispatch(setIsPending(true));
      const res = await getApi(apis.mySubscriptions, token());
      dispatch(setIsPending(false));
      setMySubscriptions(res.data.data.items);
    } catch (err) {
      console.log(err);
      dispatch(setIsPending(false));
      notifyError("Oops! The request was not found.");
    }
  };

  const isPendingFromStore = useSelector(
    (store) => store?.searchProduct?.isPending
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

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
            <div className="row">
              {/* Sidebar Tabs */}
              <div className="col-md-3 faq-sidebar mb-3">
                <ul className="nav flex-column nav-tabs">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === 0 ? "active-tab" : ""
                      }`}
                      onClick={() => setActiveTab(0)}
                    >
                      Edit Profile
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === 1 ? "active-tab" : ""
                      }`}
                      onClick={() => {
                        setActiveTab(1);
                        fetchMySubscriptions();
                      }}
                    >
                      My Subscriptions
                    </button>
                  </li>
                  {/* <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === 2 ? "active-tab" : ""
                      }`}
                      onClick={() => setActiveTab(2)}
                    >
                      Booster Plans
                    </button>
                  </li> */}
                  {/* <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === 3 ? "active-tab" : ""
                      }`}
                      onClick={() => setActiveTab(3)}
                    >
                      Review Errandia
                    </button>
                  </li> */}
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === 4 ? "active-tab" : ""
                      }`}
                      onClick={() => setActiveTab(4)}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>

              {/* Tab Content */}
              <div className="col-md-9 edit-profile-content mb-3">
                <div className="tab-content">
                  {activeTab === 0 && (
                    <div>
                      <h6 className="edit-profile-head">{t("Edit Profile")}</h6>
                      <Form className="mt-3">
                        <div className="image-uploader mb-2">
                          <div className="d-flex gap-2 align-items-center">
                            <label
                              htmlFor="image-upload"
                              className="image-label"
                            >
                              <div
                                className={`image-preview ${
                                  image ? "has-image" : ""
                                }`}
                              >
                                {image ? (
                                  <img
                                    src={image ? image : ourErrandsImage}
                                    alt="Profile Preview"
                                  />
                                ) : (
                                  <img
                                    src={ourErrandsImage}
                                    alt="ourErrandsImage"
                                  />
                                )}
                              </div>
                              <input
                                type="file"
                                id="image-upload"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                              />
                            </label>
                            <input
                              type="text"
                              value={imageName}
                              readOnly
                              className="file-name-input form-control"
                            />
                          </div>
                          <button
                            className="btn btn-back"
                            onClick={handleButtonClick}
                          >
                            {t("Change Image")}
                          </button>
                        </div>
                        <Form.Group
                          className="mb-3 listYourBusinessHomeForm-input-tag-container"
                          controlId="formBasicEmail"
                        >
                          <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                            {t("Name")}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            className="runErrandPopUpSignUpFormTab-formInput"
                            value={name?.field_value}
                            onChange={(e) => {
                              setName((prev) => {
                                return { ...prev, field_value: e.target.value };
                              });
                            }}
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3 listYourBusinessHomeForm-input-tag-container"
                          controlId="formBasicEmail"
                        >
                          <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                            {t("Email")}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your email"
                            className="runErrandPopUpSignUpFormTab-formInput"
                            value={email?.field_value}
                            onChange={(e) => {
                              setEmail((prev) => {
                                return { ...prev, field_value: e.target.value };
                              });
                            }}
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3 listYourBusinessHomeForm-input-tag-container"
                          controlId="formBasicEmail"
                        >
                          <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                            {t("WhatsApp Number")}
                          </Form.Label>
                          <PhoneInput
                            country="cm"
                            inputStyle={inputStyle}
                            inputProps={{ required: true }}
                            value={whatsapp_number?.field_value}
                            onChange={(e) => {
                              setWhatsapp_number((prev) => {
                                return { ...prev, field_value: `+${e}` };
                              });
                            }}
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3 listYourBusinessHomeForm-input-tag-container"
                          controlId="formBasicEmail"
                        >
                          <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                            {t("Phone Number")}
                          </Form.Label>
                          <PhoneInput
                            country="cm"
                            inputStyle={inputStyle}
                            inputProps={{ required: true }}
                            value={phone?.field_value}
                            onChange={(e) => {
                              setPhone((prev) => {
                                return { ...prev, field_value: e };
                              });
                            }}
                          />
                        </Form.Group>
                        <Button
                          variant="primary"
                          className="listYourBusinessHomeForm-signIn-blue w-50 mt-5"
                          onClick={() => {
                            uploadProfileImageHandler();
                            nameUpdateHandler();
                            emailUpdateHandler();
                            whatsAppUpdateHandler();
                            phoneUpdateHandler();
                          }}
                        >
                          {t("Save Changes")}
                        </Button>
                      </Form>
                    </div>
                  )}

                  {activeTab === 1 &&
                    (isPendingFromStore ? (
                      <Loader />
                    ) : (
                      <div>
                        <h6 className="edit-profile-head">My Subscription</h6>

                        {/* //No Subscription Yet content// */}
                        {/* <div className="edit-no-subscription-content">
              <p className="mb-0">No Subscription Yet</p>
              </div> */}
                        {mySubscriptions?.map((subscription) => {
                          return (
                            <div>
                              <div className="d-flex justify-content-center mt-4">
                                <div
                                  className="amount-card w-100"
                                  style={{ borderRadius: "10px 10px 0 0" }}
                                >
                                  <div
                                    className="d-flex"
                                    style={{ zIndex: "1" }}
                                  >
                                    <svg
                                      width="51"
                                      height="51"
                                      viewBox="0 0 51 51"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M0 6.00001C0 2.6863 2.68629 0 6 0H45C48.3137 0 51 2.68629 51 6V44.2105C51 47.5242 48.3137 50.2105 45 50.2105H6C2.68629 50.2105 0 47.5242 0 44.2105V6.00001Z"
                                        fill="white"
                                        fill-opacity="0.1"
                                      />
                                      <path
                                        d="M37.5384 7.00249C37.3581 7.01023 37.1761 7.03672 36.9945 7.08217L5.05776 15.1017C3.60375 15.4674 2.71632 16.9478 3.0825 18.4018L7.01309 34.0146C7.19006 34.7158 7.63146 35.3077 8.25621 35.681C8.68563 35.9396 9.16518 36.0705 9.65274 36.0705C9.87357 36.0705 10.0963 36.0424 10.3151 35.9868L22.6229 32.8959C22.145 33.8535 21.8698 34.9292 21.8698 36.0705C21.8698 40.0072 25.0731 43.2105 29.0098 43.2105C32.9486 43.2105 36.1498 40.0072 36.1498 36.0705C36.1498 33.6713 34.9584 31.5504 33.1396 30.2553L34.3041 29.9634C35.4556 32.3644 37.9042 34.0305 40.7398 34.0305C44.6786 34.0305 47.8798 30.8272 47.8798 26.8905C47.8798 23.7763 45.8753 21.1303 43.0906 20.1559L40.2966 9.05444C39.9762 7.7853 38.8004 6.94827 37.5384 7.00249ZM37.5812 8.02049C38.3699 7.98696 39.1063 8.50935 39.3084 9.30545L41.967 19.864C41.5674 19.7945 41.1591 19.7505 40.7398 19.7505C40.5197 19.7505 40.3025 19.7638 40.0874 19.7834L38.3273 12.7918C38.2916 12.6566 38.1547 12.5754 38.0175 12.6075C37.0011 12.8656 35.9412 12.1742 35.6627 11.0675C35.6291 10.9324 35.4896 10.8496 35.3539 10.8833L15.2627 15.9295C15.1255 15.9631 15.0438 16.1021 15.0775 16.2373C15.1111 16.3724 15.2501 16.4552 15.3853 16.4215L35.2404 11.4351C35.6464 12.5831 36.7634 13.3003 37.891 13.1494L39.5784 19.8531C36.4094 20.3746 33.9368 22.9823 33.6337 26.2201L12.0693 31.6349C11.8724 31.0769 11.5064 30.6049 11.0194 30.2892C10.5282 29.9714 9.96996 29.8467 9.41865 29.9206L7.14059 20.8711C8.21057 20.4718 8.85127 19.3115 8.66461 18.1099L10.858 17.5601C10.9932 17.5244 11.0769 17.3875 11.0433 17.2503C11.0076 17.1151 10.8727 17.0314 10.7335 17.065L8.30403 17.6746C8.16683 17.7083 8.08509 17.8472 8.11875 17.9844C8.39721 19.0891 7.79254 20.1982 6.77203 20.4547C6.70624 20.4705 6.65035 20.5116 6.61465 20.5713C6.58099 20.6289 6.56891 20.6987 6.58676 20.7645L8.98137 30.2782C8.99718 30.344 9.03924 30.3999 9.09891 30.4336C9.15654 30.4693 9.22687 30.4793 9.29215 30.4635C9.78175 30.3401 10.2968 30.4303 10.7405 30.7185C11.1898 31.0087 11.5113 31.4653 11.6469 32.0054C11.677 32.1207 11.7802 32.1957 11.8939 32.1957C11.9138 32.1957 11.9358 32.1938 11.9557 32.1877L33.6068 26.753C33.6059 26.7992 33.5998 26.8441 33.5998 26.8905C33.5998 27.6286 33.7126 28.3409 33.9216 29.0112L31.8616 29.5282C30.9874 29.1458 30.0239 28.9305 29.0098 28.9305C26.7416 28.9305 24.7216 29.9966 23.4128 31.6508L10.0671 35.0017C9.62902 35.1129 9.17135 35.043 8.77916 34.8084C8.38748 34.5738 8.11035 34.2046 8.00121 33.7655L4.06863 18.1528C3.95949 17.7136 4.02728 17.257 4.26188 16.8658C4.49648 16.4746 4.86616 16.2 5.30578 16.0889L37.2415 8.0693C37.355 8.041 37.4685 8.02529 37.5812 8.02049ZM14.4569 16.1506C14.4241 16.1454 14.3901 16.1462 14.3553 16.1546L13.9021 16.2682C13.7669 16.3023 13.6831 16.4407 13.7168 16.5779C13.7469 16.6932 13.8501 16.7682 13.9648 16.7682C13.9847 16.7682 14.0047 16.7663 14.0266 16.7622L14.4798 16.6467C14.615 16.613 14.6987 16.474 14.6651 16.3389C14.6383 16.2375 14.5553 16.1661 14.4569 16.1506ZM23.7096 17.2055C23.4052 17.2187 23.098 17.262 22.7912 17.339C21.6039 17.6378 20.6016 18.3816 19.9723 19.4337C19.3429 20.4859 19.1614 21.7208 19.4603 22.9081C19.9846 24.9879 21.8591 26.3805 23.9108 26.3805C24.2816 26.3805 24.6551 26.3344 25.0294 26.241C27.4836 25.6234 28.978 23.1255 28.3604 20.6709C27.82 18.5249 25.8403 17.1126 23.7096 17.2055ZM23.9098 17.7095C25.7346 17.7095 27.4022 18.9466 27.8663 20.7954C28.414 22.9751 27.0872 25.1972 24.9039 25.745C22.7247 26.2953 20.5031 24.9654 19.9553 22.7836C19.6886 21.7279 19.8506 20.63 20.4105 19.6957C20.9705 18.7593 21.861 18.0982 22.9167 17.833C23.2492 17.7494 23.5819 17.7095 23.9098 17.7095ZM31.7381 17.7125C31.6196 17.7178 31.5001 17.7351 31.3805 17.7653C30.4263 18.006 29.8444 18.9756 30.0836 19.9298C30.2891 20.7387 31.0152 21.2805 31.8138 21.2805C31.9576 21.2805 32.1058 21.2624 32.2511 21.2267C32.7132 21.1094 33.102 20.8214 33.3468 20.4129C33.5921 20.0023 33.6618 19.5223 33.546 19.0602C33.3367 18.2253 32.5677 17.6753 31.7381 17.7125ZM31.8138 18.2215C32.3835 18.2215 32.9056 18.6079 33.051 19.1857C33.1326 19.5162 33.083 19.8582 32.9075 20.1489C32.7341 20.4417 32.4551 20.649 32.1246 20.7306C31.7962 20.8143 31.4541 20.7646 31.1614 20.5892C30.8686 20.4138 30.6613 20.1368 30.5797 19.8063C30.4083 19.1249 30.8227 18.4317 31.504 18.2603C31.6076 18.2328 31.7123 18.221 31.8138 18.2215ZM40.7398 20.7705C44.1145 20.7705 46.8598 23.5158 46.8598 26.8905C46.8598 30.2652 44.1145 33.0105 40.7398 33.0105C37.3652 33.0105 34.6198 30.2652 34.6198 26.8905C34.6198 23.5158 37.3652 20.7705 40.7398 20.7705ZM15.4181 21.7925C15.2996 21.7978 15.1801 21.8151 15.0605 21.8453C14.1063 22.086 13.5244 23.0556 13.7636 24.0098C13.9691 24.8187 14.6952 25.3605 15.4938 25.3605C15.6371 25.3605 15.7848 25.3424 15.9301 25.3067C16.8843 25.066 17.4663 24.0944 17.225 23.1402C17.0162 22.3053 16.2477 21.7553 15.4181 21.7925ZM40.7398 22.3005C38.2097 22.3005 36.1498 24.3583 36.1498 26.8905C36.1498 29.4206 38.2097 31.4805 40.7398 31.4805C43.272 31.4805 45.3298 29.4206 45.3298 26.8905C45.3298 24.3583 43.272 22.3005 40.7398 22.3005ZM15.4938 22.3015C16.0635 22.3015 16.5856 22.6869 16.731 23.2647C16.9023 23.9461 16.486 24.6393 15.8046 24.8106C15.4762 24.8943 15.1321 24.8426 14.8414 24.6692C14.5486 24.4938 14.3413 24.2168 14.2597 23.8863C14.0883 23.2049 14.5027 22.5117 15.184 22.3403C15.2876 22.3128 15.3923 22.3015 15.4938 22.3015ZM40.7398 22.8105C42.9889 22.8105 44.8198 24.6414 44.8198 26.8905C44.8198 29.1396 42.9889 30.9705 40.7398 30.9705C38.4907 30.9705 36.6598 29.1396 36.6598 26.8905C36.6598 24.6414 38.4907 22.8105 40.7398 22.8105ZM29.0098 29.9505C32.3845 29.9505 35.1298 32.6958 35.1298 36.0705C35.1298 39.4452 32.3845 42.1905 29.0098 42.1905C25.6352 42.1905 22.8898 39.4452 22.8898 36.0705C22.8898 32.6958 25.6352 29.9505 29.0098 29.9505ZM29.0098 31.4805C26.4797 31.4805 24.4198 33.5383 24.4198 36.0705C24.4198 38.6006 26.4797 40.6605 29.0098 40.6605C31.542 40.6605 33.5998 38.6006 33.5998 36.0705C33.5998 33.5383 31.542 31.4805 29.0098 31.4805ZM29.0098 31.9905C31.2589 31.9905 33.0898 33.8214 33.0898 36.0705C33.0898 38.3196 31.2589 40.1505 29.0098 40.1505C26.7607 40.1505 24.9298 38.3196 24.9298 36.0705C24.9298 33.8214 26.7607 31.9905 29.0098 31.9905Z"
                                        fill="#CED4FF"
                                      />
                                    </svg>
                                    <div className="ms-2 text-left">
                                      <p>Subscribe to:</p>
                                      <h5>{subscription?.plan?.name} Plan</h5>
                                    </div>
                                  </div>
                                  <div
                                    style={{ zIndex: "1" }}
                                    className="text-end"
                                  >
                                    <h3>
                                      {`${subscription?.plan?.unit_price}${subscription?.plan?.currency}`}
                                    </h3>
                                    <p> per business</p>
                                  </div>
                                </div>
                              </div>
                              <div className="card-expiry-amount">
                                <div className="d-flex" style={{ zIndex: "1" }}>
                                  <div className="text-left">
                                    <p>Subscribed on</p>
                                    <h5>
                                      {formatDate(subscription?.subscribed_at)}
                                    </h5>
                                  </div>
                                </div>
                                {subscription?.expired_at !== null && (
                                  <div
                                    style={{ zIndex: "1" }}
                                    className="text-end"
                                  >
                                    <p>Expires On</p>
                                    <h5>
                                      {formatDate(subscription?.expired_at)}
                                    </h5>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                        {/* <Button
                        variant="primary"
                        className="listYourBusinessHomeForm-signIn-blue w-50 mt-5"
                      >
                        Save Changes
                      </Button> */}
                      </div>
                    ))}

                  {/* {activeTab === 2 && (
                    <div>
                      <h6 className="edit-profile-head">Booster Plans</h6>
                      <div className="edit-no-subscription-content-booster">
                        <div className="content">
                          <p className="mb-0">
                            You haven't purchased a booster plan yet! Get one
                            today and have your business featured on the
                            homepage.
                          </p>
                          <Button
                            className="btn btn-back mt-2"
                            onClick={() => {
                              dispatch(modalErrandiaBoosterToggle());
                              dispatch(setErrandiaBoosterModalTrue());
                            }}
                          >
                            Buy a Booster Plan
                          </Button>
                        </div>
                      </div> */}

                  {/* <div>
              <div className="d-flex justify-content-center mt-4">
                        <div className="amount-card-errandia w-100" style={{borderRadius:"10px 10px 0 0"}}>
                          <div className="d-flex" style={{ zIndex: "1" }}>
                            <svg
                              width="51"
                              height="51"
                              viewBox="0 0 51 51"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 6.00001C0 2.6863 2.68629 0 6 0H45C48.3137 0 51 2.68629 51 6V44.2105C51 47.5242 48.3137 50.2105 45 50.2105H6C2.68629 50.2105 0 47.5242 0 44.2105V6.00001Z"
                                fill="white"
                                fill-opacity="0.1"
                              />
                              <path
                                d="M37.5384 7.00249C37.3581 7.01023 37.1761 7.03672 36.9945 7.08217L5.05776 15.1017C3.60375 15.4674 2.71632 16.9478 3.0825 18.4018L7.01309 34.0146C7.19006 34.7158 7.63146 35.3077 8.25621 35.681C8.68563 35.9396 9.16518 36.0705 9.65274 36.0705C9.87357 36.0705 10.0963 36.0424 10.3151 35.9868L22.6229 32.8959C22.145 33.8535 21.8698 34.9292 21.8698 36.0705C21.8698 40.0072 25.0731 43.2105 29.0098 43.2105C32.9486 43.2105 36.1498 40.0072 36.1498 36.0705C36.1498 33.6713 34.9584 31.5504 33.1396 30.2553L34.3041 29.9634C35.4556 32.3644 37.9042 34.0305 40.7398 34.0305C44.6786 34.0305 47.8798 30.8272 47.8798 26.8905C47.8798 23.7763 45.8753 21.1303 43.0906 20.1559L40.2966 9.05444C39.9762 7.7853 38.8004 6.94827 37.5384 7.00249ZM37.5812 8.02049C38.3699 7.98696 39.1063 8.50935 39.3084 9.30545L41.967 19.864C41.5674 19.7945 41.1591 19.7505 40.7398 19.7505C40.5197 19.7505 40.3025 19.7638 40.0874 19.7834L38.3273 12.7918C38.2916 12.6566 38.1547 12.5754 38.0175 12.6075C37.0011 12.8656 35.9412 12.1742 35.6627 11.0675C35.6291 10.9324 35.4896 10.8496 35.3539 10.8833L15.2627 15.9295C15.1255 15.9631 15.0438 16.1021 15.0775 16.2373C15.1111 16.3724 15.2501 16.4552 15.3853 16.4215L35.2404 11.4351C35.6464 12.5831 36.7634 13.3003 37.891 13.1494L39.5784 19.8531C36.4094 20.3746 33.9368 22.9823 33.6337 26.2201L12.0693 31.6349C11.8724 31.0769 11.5064 30.6049 11.0194 30.2892C10.5282 29.9714 9.96996 29.8467 9.41865 29.9206L7.14059 20.8711C8.21057 20.4718 8.85127 19.3115 8.66461 18.1099L10.858 17.5601C10.9932 17.5244 11.0769 17.3875 11.0433 17.2503C11.0076 17.1151 10.8727 17.0314 10.7335 17.065L8.30403 17.6746C8.16683 17.7083 8.08509 17.8472 8.11875 17.9844C8.39721 19.0891 7.79254 20.1982 6.77203 20.4547C6.70624 20.4705 6.65035 20.5116 6.61465 20.5713C6.58099 20.6289 6.56891 20.6987 6.58676 20.7645L8.98137 30.2782C8.99718 30.344 9.03924 30.3999 9.09891 30.4336C9.15654 30.4693 9.22687 30.4793 9.29215 30.4635C9.78175 30.3401 10.2968 30.4303 10.7405 30.7185C11.1898 31.0087 11.5113 31.4653 11.6469 32.0054C11.677 32.1207 11.7802 32.1957 11.8939 32.1957C11.9138 32.1957 11.9358 32.1938 11.9557 32.1877L33.6068 26.753C33.6059 26.7992 33.5998 26.8441 33.5998 26.8905C33.5998 27.6286 33.7126 28.3409 33.9216 29.0112L31.8616 29.5282C30.9874 29.1458 30.0239 28.9305 29.0098 28.9305C26.7416 28.9305 24.7216 29.9966 23.4128 31.6508L10.0671 35.0017C9.62902 35.1129 9.17135 35.043 8.77916 34.8084C8.38748 34.5738 8.11035 34.2046 8.00121 33.7655L4.06863 18.1528C3.95949 17.7136 4.02728 17.257 4.26188 16.8658C4.49648 16.4746 4.86616 16.2 5.30578 16.0889L37.2415 8.0693C37.355 8.041 37.4685 8.02529 37.5812 8.02049ZM14.4569 16.1506C14.4241 16.1454 14.3901 16.1462 14.3553 16.1546L13.9021 16.2682C13.7669 16.3023 13.6831 16.4407 13.7168 16.5779C13.7469 16.6932 13.8501 16.7682 13.9648 16.7682C13.9847 16.7682 14.0047 16.7663 14.0266 16.7622L14.4798 16.6467C14.615 16.613 14.6987 16.474 14.6651 16.3389C14.6383 16.2375 14.5553 16.1661 14.4569 16.1506ZM23.7096 17.2055C23.4052 17.2187 23.098 17.262 22.7912 17.339C21.6039 17.6378 20.6016 18.3816 19.9723 19.4337C19.3429 20.4859 19.1614 21.7208 19.4603 22.9081C19.9846 24.9879 21.8591 26.3805 23.9108 26.3805C24.2816 26.3805 24.6551 26.3344 25.0294 26.241C27.4836 25.6234 28.978 23.1255 28.3604 20.6709C27.82 18.5249 25.8403 17.1126 23.7096 17.2055ZM23.9098 17.7095C25.7346 17.7095 27.4022 18.9466 27.8663 20.7954C28.414 22.9751 27.0872 25.1972 24.9039 25.745C22.7247 26.2953 20.5031 24.9654 19.9553 22.7836C19.6886 21.7279 19.8506 20.63 20.4105 19.6957C20.9705 18.7593 21.861 18.0982 22.9167 17.833C23.2492 17.7494 23.5819 17.7095 23.9098 17.7095ZM31.7381 17.7125C31.6196 17.7178 31.5001 17.7351 31.3805 17.7653C30.4263 18.006 29.8444 18.9756 30.0836 19.9298C30.2891 20.7387 31.0152 21.2805 31.8138 21.2805C31.9576 21.2805 32.1058 21.2624 32.2511 21.2267C32.7132 21.1094 33.102 20.8214 33.3468 20.4129C33.5921 20.0023 33.6618 19.5223 33.546 19.0602C33.3367 18.2253 32.5677 17.6753 31.7381 17.7125ZM31.8138 18.2215C32.3835 18.2215 32.9056 18.6079 33.051 19.1857C33.1326 19.5162 33.083 19.8582 32.9075 20.1489C32.7341 20.4417 32.4551 20.649 32.1246 20.7306C31.7962 20.8143 31.4541 20.7646 31.1614 20.5892C30.8686 20.4138 30.6613 20.1368 30.5797 19.8063C30.4083 19.1249 30.8227 18.4317 31.504 18.2603C31.6076 18.2328 31.7123 18.221 31.8138 18.2215ZM40.7398 20.7705C44.1145 20.7705 46.8598 23.5158 46.8598 26.8905C46.8598 30.2652 44.1145 33.0105 40.7398 33.0105C37.3652 33.0105 34.6198 30.2652 34.6198 26.8905C34.6198 23.5158 37.3652 20.7705 40.7398 20.7705ZM15.4181 21.7925C15.2996 21.7978 15.1801 21.8151 15.0605 21.8453C14.1063 22.086 13.5244 23.0556 13.7636 24.0098C13.9691 24.8187 14.6952 25.3605 15.4938 25.3605C15.6371 25.3605 15.7848 25.3424 15.9301 25.3067C16.8843 25.066 17.4663 24.0944 17.225 23.1402C17.0162 22.3053 16.2477 21.7553 15.4181 21.7925ZM40.7398 22.3005C38.2097 22.3005 36.1498 24.3583 36.1498 26.8905C36.1498 29.4206 38.2097 31.4805 40.7398 31.4805C43.272 31.4805 45.3298 29.4206 45.3298 26.8905C45.3298 24.3583 43.272 22.3005 40.7398 22.3005ZM15.4938 22.3015C16.0635 22.3015 16.5856 22.6869 16.731 23.2647C16.9023 23.9461 16.486 24.6393 15.8046 24.8106C15.4762 24.8943 15.1321 24.8426 14.8414 24.6692C14.5486 24.4938 14.3413 24.2168 14.2597 23.8863C14.0883 23.2049 14.5027 22.5117 15.184 22.3403C15.2876 22.3128 15.3923 22.3015 15.4938 22.3015ZM40.7398 22.8105C42.9889 22.8105 44.8198 24.6414 44.8198 26.8905C44.8198 29.1396 42.9889 30.9705 40.7398 30.9705C38.4907 30.9705 36.6598 29.1396 36.6598 26.8905C36.6598 24.6414 38.4907 22.8105 40.7398 22.8105ZM29.0098 29.9505C32.3845 29.9505 35.1298 32.6958 35.1298 36.0705C35.1298 39.4452 32.3845 42.1905 29.0098 42.1905C25.6352 42.1905 22.8898 39.4452 22.8898 36.0705C22.8898 32.6958 25.6352 29.9505 29.0098 29.9505ZM29.0098 31.4805C26.4797 31.4805 24.4198 33.5383 24.4198 36.0705C24.4198 38.6006 26.4797 40.6605 29.0098 40.6605C31.542 40.6605 33.5998 38.6006 33.5998 36.0705C33.5998 33.5383 31.542 31.4805 29.0098 31.4805ZM29.0098 31.9905C31.2589 31.9905 33.0898 33.8214 33.0898 36.0705C33.0898 38.3196 31.2589 40.1505 29.0098 40.1505C26.7607 40.1505 24.9298 38.3196 24.9298 36.0705C24.9298 33.8214 26.7607 31.9905 29.0098 31.9905Z"
                                fill="#CED4FF"
                              />
                            </svg>
                            <div className="ms-2 text-left">
                              <p>Subscribe to:</p>
                              <h5>Yearly Plan</h5>
                            </div>
                          </div>
                          <div style={{ zIndex: "1" }} className="text-end">
                            <h3>10,000FCFA</h3>
                            <p> per business</p>
                          </div>
                        </div>
                      </div>
                        <div className="card-expiry-amount">
                          <div className="d-flex" style={{ zIndex: "1" }}>
                            <div className="text-left">
                              <p>Subscribed on</p>
                              <h5>02/02/2024</h5>
                            </div>
                          </div>
                          <div style={{ zIndex: "1" }} className="text-end">
                          <p>Expires On</p>
                          <h5>02/02/2026</h5>
                          </div>
                        </div>
                        </div> */}
                  {/* </div>
                  )} */}
                  {activeTab === 3 && (
                    <div>
                      <h6 className="edit-profile-head">Review Errandia</h6>
                      <Form className="mt-3">
                        <Form.Group
                          className="listYourBusinessHomeForm-input-tag-container"
                          controlId="formBasicEmail"
                        >
                          <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                            Rate Errandia *
                          </Form.Label>
                        </Form.Group>
                        <div className="mb-3">
                          <svg
                            width="265"
                            height="40"
                            viewBox="0 0 265 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.209 36.6667L12.9173 24.9583L3.83398 17.0833L15.834 16.0417L20.5007 5L25.1673 16.0417L37.1673 17.0833L28.084 24.9583L30.7923 36.6667L20.5007 30.4583L10.209 36.6667Z"
                              fill="#D29211"
                            />
                            <path
                              d="M66.209 36.6667L68.9173 24.9583L59.834 17.0833L71.834 16.0417L76.5007 5L81.1673 16.0417L93.1673 17.0833L84.084 24.9583L86.7923 36.6667L76.5007 30.4583L66.209 36.6667Z"
                              fill="#D29211"
                            />
                            <path
                              d="M122.209 36.6667L124.917 24.9583L115.834 17.0833L127.834 16.0417L132.501 5L137.167 16.0417L149.167 17.0833L140.084 24.9583L142.792 36.6667L132.501 30.4583L122.209 36.6667Z"
                              fill="#D29211"
                            />
                            <path
                              d="M178.209 36.6667L180.917 24.9583L171.834 17.0833L183.834 16.0417L188.501 5L193.167 16.0417L205.167 17.0833L196.084 24.9583L198.792 36.6667L188.501 30.4583L178.209 36.6667Z"
                              fill="#D29211"
                            />
                            <path
                              d="M239.251 29.7083L244.501 26.5417L249.751 29.75L248.376 23.75L253.001 19.75L246.917 19.2083L244.501 13.5417L242.084 19.1667L236.001 19.7083L240.626 23.75L239.251 29.7083ZM234.209 36.6667L236.917 24.9583L227.834 17.0833L239.834 16.0417L244.501 5L249.167 16.0417L261.167 17.0833L252.084 24.9583L254.792 36.6667L244.501 30.4583L234.209 36.6667Z"
                              fill="#677A90"
                            />
                          </svg>
                        </div>

                        <Form.Group
                          className="mb-3 listYourBusinessHomeForm-input-tag-container"
                          controlId="formBasicEmail"
                        >
                          <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                            Title *
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your title"
                            className="runErrandPopUpSignUpFormTab-formInput"
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3 listYourBusinessHomeForm-input-tag-container"
                          controlId="formBasicEmail"
                        >
                          <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                            Review *
                          </Form.Label>
                          <textarea
                            rows={4}
                            className="form-control"
                            placeholder="Write a message"
                          ></textarea>
                        </Form.Group>
                        <Button
                          variant="primary"
                          className="listYourBusinessHomeForm-signIn-blue w-50 mt-5"
                        >
                          Submit Review
                        </Button>
                      </Form>
                    </div>
                  )}
                  {activeTab === 4 && (
                    <div>
                      <h6 className="edit-profile-head">Logout</h6>
                      <div className="edit-no-subscription-content-booster">
                        <div className="content">
                          <p className="mb-0">Do you want to logout?</p>
                          <Button
                            className="btn btn-back mt-2"
                            onClick={logOutHandler}
                          >
                            Logout
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <EditProfileSidebar />
          </div>
        </div>
      </div>
      {/* <ErrandiaBooster /> */}
    </>
  );
};

export default EditProfile;
