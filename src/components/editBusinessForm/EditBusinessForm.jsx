import React, { useEffect, useState } from "react";
import goBackArrow from "../../assets/goBackArrow.svg";
import Form from "react-bootstrap/Form";
import PhoneInput from "react-phone-input-2";
import Button from "react-bootstrap/Button";
import runErrandPopUpimageUploader from "../../assets/runErrandPopUpimageUploader.svg";
import runErrandPopUpBrowseFiles from "../../assets/runErrandPopUpBrowseFiles.svg";
import runErrandPopUpUploadedImage from "../../assets/runErrandPopUpUploadedImage.svg";
import runErrandPopUpDelete from "../../assets/runErrandPopUpDelete.svg";
import BusinessLocationIcon from "../../assets/BusinessLocationIcon.svg";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";
import { notifyError, notifySuccess, token } from "../../utils/utils";
import apis from "../../Constant";
import { getApi, postApi, putApi } from "../../fetchApi/FetchAxiosApi";
import { addTownsByRegion } from "../../utils/townsByRegionSlice";
import { addBusiness } from "../../utils/businessDataSlice";
import { setIsPending } from "../../utils/searchProductSlice";
import Loader from "../loader/Loader";

const EditBusinessForm = ({
  detailSelected,
  setDetailSelected,
  errandDetailsId,
}) => {
  const addBusinessModalBoolean = useSelector(
    (store) => store?.addBusiness?.value
  );

  console.log("errandDetailsId-edit", errandDetailsId, errandDetailsId?.slug);

  const dispatch = useDispatch();

  const inputStyle = {
    width: "100%",
    height: "35px",
    borderRadius: "10px",
    border: "1px solid #eceff2",
    outline: "none",
  };

  const [uploadedImage, setUploadedImage] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const [categoriesDropDown, setCategoriesDropDown] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    phone: "",
    category_id: "",
    region_id: "",
    town_id: "",
    latitude: "",
    longitude: "",
    slogan: "",
    website: "",
    whatsapp: "",
    email: "",
    agent: "",
  });

  useEffect(() => {
    if (errandDetailsId) {
      setFormData((prev) => {
        return {
          ...prev,
          name: errandDetailsId?.name || "",
          description: errandDetailsId?.description || "",
          phone: errandDetailsId?.phone || "",
          category_id: errandDetailsId?.category?.id || "",
          region_id: errandDetailsId?.region?.id || "",
          town_id: errandDetailsId?.town?.id || "",
          latitude: errandDetailsId?.latitude || "",
          longitude: errandDetailsId?.longitude || "",
          slogan: errandDetailsId?.slogan || "",
          website: errandDetailsId?.website || "",
          whatsapp: errandDetailsId?.whatsapp || "",
          email: errandDetailsId?.email || "",
          agent: errandDetailsId?.agent || "",
        };
      });
    }
  }, [errandDetailsId]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prevData) => ({
            ...prevData,
            latitude: latitude.toString(),
            longitude: longitude.toString(),
          }));

          console.log("Updated formData:", formData);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Location permission denied or not supported.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // const editBusinessImage = async (slug) => {
  //   try {
  //     console.log("selectedFile-tubub ", selectedFile);
  //     const formImage = new FormData();
  //     formImage.append("image", selectedFile);

  //     console.log("formImage", formImage);
  //     const res = await postApi(
  //       apis.editBusinessImage + `/${slug}/featured-image`,
  //       formImage,
  //       token(),
  //       true
  //     );
  //     // console.log("editProduct", res);
  //     dispatch(
  //       setEditImage(res.data.data.images[res.data.data.images.length - 1])
  //     );

  //     notifySuccess(res.data.message);

  //     if (service === "0") {
  //       const resProduct = await getApi(apis.products, token());
  //       dispatch(addProducts(resProduct?.data?.data?.items));
  //     } else {
  //       const resServices = await getApi(apis.services, token());
  //       dispatch(addServices(resServices?.data?.data?.items));
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     notifyError("Oops! The request was not found.");
  //   }
  // };

  const handleFileButtonClick = () => {
    document.getElementById("file-input").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      notifyError("Invalid file type. Only JPG, JPEG, and PNG are allowed.");
      return;
    }

    if (file.size > maxSize) {
      notifyError("File size exceeds 2MB limit.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setUploadedImage(imageUrl);
  };

  useEffect(() => {
    const categoryHandler = async () => {
      try {
        const res = await getApi(apis.businessCategories);
        setCategoriesDropDown(res?.data?.data);
      } catch (err) {
        console.log("categoryHandler", err);
        if (err.response && err.response.status === 404) {
          console.log("Resource not found!");
          // notify("The requested category was not found.");
          notifyError("The requested category was not found.");
        }
      }
    };

    categoryHandler();
  }, []);

  const regionsFromStore = useSelector((store) => store?.regions);

  useEffect(() => {
    if (!regionsFromStore) {
      const fetchRegions = async () => {
        try {
          const res = await getApi(apis.regions);
          dispatch(addRegions(res.data.data));
        } catch (err) {
          console.log("fetchRegions", err);
          // notifyError("Oops! The request was not found.");
        }
      };
      fetchRegions();
    }
  }, []);

  const townsByRegionFromStore = useSelector((store) => store.townsByRegion);

  // if (!townsByRegionFromStore) {
  const fetchTowns = async (id) => {
    try {
      console.log("fetchTowns", id);
      const params = new URLSearchParams({
        region_id: id,
      });

      // dispatch(region(id));

      // console.log("api", apis.townsByRegion + `?${params.toString()}`);
      const res = await getApi(apis.townsByRegion + `?${params.toString()}`);
      // console.log("fetchTowns", res.data.data);
      dispatch(addTownsByRegion(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (formData?.region_id) {
      fetchTowns(formData?.region_id);
    }
  }, [formData?.region_id]);

  const navigate = useNavigate();

  const publishEditBusiness = async (slug) => {
    if (
      !formData.name ||
      !formData.description ||
      !formData.phone ||
      !formData.category_id ||
      !formData.region_id
    ) {
      notifyError("Please fill all required fields.");
      return;
    }

    try {
      dispatch(setIsPending(true));
      const res = await putApi(
        apis.editUserBusiness + `/${slug}`,
        formData,
        token()
      );
      dispatch(setIsPending(false));
      console.log("publish-EDIT-Business", res);
      if (res.status === 200) {
        notifySuccess(res.data.message);
        setFormData(() => {
          return {
            name: "",
            description: "",
            phone: "",
            category_id: "",
            region_id: "",
            town_id: "",
            latitude: "",
            longitude: "",
            slogan: "",
            website: "",
            whatsapp: "",
            email: "",
            agent: "",
          };
        });
        setUploadedImage(null);
        setSelectedFile(null);

        setDetailSelected("Businesses");

        dispatch(setIsPending(true));
        const resBusiness = await getApi(apis.business, token());
        dispatch(setIsPending(false));
        dispatch(addBusiness(resBusiness?.data?.data?.items));
      }
    } catch (err) {
      console.log(err);
      dispatch(setIsPending(false));
      notifyError("Oops! The request was not found.");
    }
  };

  // useEffect(() => {
  //   if (!addBusinessModalBoolean) {
  //     setFormData({
  //       name: "",
  //       description: "",
  //       phone: "",
  //       category_id: "",
  //       region_id: "",
  //       town_id: "",
  //       latitude: "",
  //       longitude: "",
  //     });
  //   }
  // }, [addBusinessModalBoolean]);

  const isPendingFromStore = useSelector(
    (store) => store?.searchProduct?.isPending
  );

  console.log("isPendingFromStore-edit", isPendingFromStore);
  return (
    <>
      {isPendingFromStore ? (
        <Loader />
      ) : (
        <>
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 productsFromTheBusiness-productServiceButtons">
                <div className="productsBusinessUserProfile-goBack-container">
                  <img
                    style={{ cursor: "pointer" }}
                    className="img-fluid"
                    src={goBackArrow}
                    alt="goBackArrow"
                    onClick={() => {
                      // navigate("/user-profile");
                      setDetailSelected("Businesses");
                    }}
                  />
                  <p className="productsBusinessUserProfile-goBack">
                    Back to businesses
                  </p>
                </div>
                <h6 className="editBusinessForm-section-heading">
                  Edit Business
                </h6>
              </div>
            </div>
            <div className="row mt-3">
              {/* <div className="addUserBusinessModal-social-Handles-container"> */}
              <div>
                <Form>
                  <div className="listYourBusinessHomeForm-two-Inputs">
                    <Form.Group
                      className="mb-3 listYourBusinessHomeForm-input-tag-container"
                      controlId="formBasicEmail"
                    >
                      <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                        Business Name *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your business name"
                        className="runErrandPopUpSignUpFormTab-formInput"
                        value={formData?.name}
                        onChange={(e) => {
                          setFormData((prev) => {
                            return {
                              ...prev,
                              name: e.target.value,
                            };
                          });
                        }}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3 userProfileAddProduct-input-tag-container"
                      controlId="formBasicEmail"
                    >
                      <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                        Business Category *{" "}
                      </Form.Label>
                      <select
                        className="form-select"
                        name="category_id"
                        aria-label="Default select example"
                        style={{
                          color: "#526277",
                          border: "1px solid #ECEFF2",
                        }}
                        value={formData.category_id}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            category_id: e.target.value,
                          }));
                        }}
                        required
                      >
                        <option value="">Select Category</option>

                        {categoriesDropDown &&
                          categoriesDropDown.map((category) => {
                            return (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            );
                          })}
                      </select>
                    </Form.Group>
                  </div>

                  <div className="mb-3">
                    <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                      Business Description *
                    </Form.Label>
                    <CKEditor
                      editor={ClassicEditor}
                      // data={description}
                      // onChange={(event, editor) => {
                      //   const data = editor.getData();
                      //   setDescription(data);
                      //   // console.log("Updated Description:", data);
                      // }}
                      data={formData?.description}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        // const text = new DOMParser().parseFromString(
                        //   data,
                        //   "text/html"
                        // ).body.textContent;
                        setFormData((prev) => {
                          return {
                            ...prev,
                            description: data,
                          };
                        });
                        // console.log("Updated Description:", data);
                      }}
                    />
                    {/* <div className="help-block with-errors">
                   {formik.touched.about && formik.errors.about ? (
                     <div className="text-danger">{formik.errors.about}</div>
                   ) : null}
                 </div> */}
                  </div>

                  <div className="listYourBusinessHomeForm-two-Inputs">
                    <Form.Group
                      className="mb-3 listYourBusinessHomeForm-input-tag-container"
                      controlId="formBasicEmail"
                    >
                      <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                        Business Slogan{" "}
                        <span style={{ color: "#677A90" }}>(optional)</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Please enter your business slogan"
                        className="runErrandPopUpSignUpFormTab-formInput"
                        value={formData.slogan}
                        onChange={(e) => {
                          setFormData((prev) => {
                            return {
                              ...prev,
                              slogan: e.target.value,
                            };
                          });
                        }}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3 listYourBusinessHomeForm-input-tag-container"
                      controlId="formBasicEmail"
                    >
                      <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                        Web Address{" "}
                        <span style={{ color: "#677A90" }}>(optional)</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Please enter your web address"
                        className="runErrandPopUpSignUpFormTab-formInput"
                        value={formData.website}
                        onChange={(e) => {
                          const value = e.target.value;
                          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                          if (value === "" || emailRegex.test(value)) {
                            setFormData((prev) => ({
                              ...prev,
                              website: value,
                            }));
                          } else {
                            notifyError("Invalid email format");
                          }
                        }}
                      />
                    </Form.Group>
                  </div>

                  <Form.Label className="runErrandPopUp-inputHeading">
                    Upload Business Logo{" "}
                    <span style={{ color: "#677A90" }}>(optional)</span>
                  </Form.Label>
                  <Form.Group>
                    <input
                      type="file"
                      id="file-input"
                      accept=".jpg,.jpeg,.png"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />

                    {/* Custom File Input UI */}
                    <label
                      htmlFor="file-input"
                      className="userProfileAddProduct-custom-file-input-container"
                    >
                      <div className="listYourBusinessHomeForm-custom-file-content">
                        <img
                          src={runErrandPopUpimageUploader}
                          alt="Upload Icon"
                          className="img-fluid"
                        />
                        <div>
                          <div className="runErrandPopUp-imageTagHeading">
                            Choose a file or drag and drop it here
                          </div>
                          <p className="runErrandPopUp-imageTag-SubHeading">
                            jpg, jpeg, or png of up to 2MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="primary"
                        className="runErrandPopUp-browseFilesButton"
                        onClick={handleFileButtonClick}
                      >
                        <img
                          src={runErrandPopUpBrowseFiles}
                          alt="Browse Files Icon"
                        />
                        Browse Files
                      </Button>
                    </label>

                    {uploadedImage && (
                      <div className="listYourBusinessHomeForm-uploadedImageDelete mt-3">
                        <div className="listYourBusinessHomeForm-uploadedImage">
                          <img
                            src={uploadedImage}
                            alt="Uploaded"
                            className="img-fluid"
                            style={{
                              width: "44px",
                              height: "44px",
                              borderRadius: "10px",
                              border: "1px solid #D5DAE2",
                              padding: "2px",
                            }}
                          />
                          <p>{uploadedImage.name || "Uploaded Image"}</p>
                        </div>
                        <img
                          src={runErrandPopUpDelete}
                          alt="Delete"
                          onClick={() => setUploadedImage(null)}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    )}
                  </Form.Group>

                  <hr />

                  <div className="listYourBusinessHomeForm-two-Inputs">
                    <Form.Group
                      className="mb-3 listYourBusinessHomeForm-input-tag-container"
                      controlId="formBasicEmail"
                    >
                      <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                        Phone Number *
                      </Form.Label>
                      <PhoneInput
                        country="cm"
                        inputStyle={inputStyle}
                        value={formData?.phone}
                        onChange={(phone) => {
                          setFormData((prev) => ({
                            ...prev,
                            phone: phone,
                          }));
                        }}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3 listYourBusinessHomeForm-input-tag-container"
                      controlId="formBasicEmail"
                    >
                      <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                        Alternative Phone Number{" "}
                        <span style={{ color: "#677A90" }}>(optional)</span>
                      </Form.Label>
                      <PhoneInput country="cm" inputStyle={inputStyle} />
                    </Form.Group>
                  </div>

                  <div className="listYourBusinessHomeForm-two-Inputs">
                    <Form.Group
                      className="mb-3 listYourBusinessHomeForm-input-tag-container"
                      controlId="formBasicEmail"
                    >
                      <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                        Whatsapp Number{" "}
                        <span style={{ color: "#677A90" }}>(optional)</span>
                      </Form.Label>
                      <PhoneInput
                        country="cm"
                        inputStyle={inputStyle}
                        value={formData.whatsapp}
                        onChange={(phone) => {
                          setFormData((prev) => ({
                            ...prev,
                            whatsapp: phone,
                          }));
                        }}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3 listYourBusinessHomeForm-input-tag-container"
                      controlId="formBasicEmail"
                    >
                      <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                        Email Address{" "}
                        <span style={{ color: "#677A90" }}>(optional)</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your email address"
                        className="runErrandPopUpSignUpFormTab-formInput"
                        value={formData.email}
                        onChange={(e) => {
                          const value = e.target.value;
                          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                          if (value === "" || emailRegex.test(value)) {
                            setFormData((prev) => ({
                              ...prev,
                              email: value,
                            }));
                          } else {
                            notifyError("Invalid email format");
                          }
                        }}
                      />
                    </Form.Group>
                  </div>

                  <hr />

                  <h6 className="listYourBusinessHomeForm-inputs-heading">
                    Business Location
                  </h6>
                  <div className="listYourBusinessHomeForm-two-Inputs">
                    <Form.Group
                      className="mb-3 userProfileAddProduct-input-tag-container"
                      controlId="formBasicEmail"
                    >
                      <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                        Region *{" "}
                      </Form.Label>
                      <select
                        className="form-select"
                        name="category_id"
                        aria-label="Default select example"
                        style={{
                          color: "#526277",
                          border: "1px solid #ECEFF2",
                        }}
                        value={formData.region_id}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            region_id: e.target.value,
                          }));
                          console.log("asas", formData?.region_id);
                        }}
                        required
                      >
                        <option value="">Select Region</option>

                        {regionsFromStore &&
                          regionsFromStore.map((region) => {
                            return (
                              <option key={region.id} value={region.id}>
                                {region.name}
                              </option>
                            );
                          })}
                      </select>
                    </Form.Group>

                    <Form.Group
                      className="mb-3 userProfileAddProduct-input-tag-container"
                      controlId="formBasicEmail"
                    >
                      <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                        Town{" "}
                      </Form.Label>
                      <select
                        className="form-select"
                        name="category_id"
                        aria-label="Default select example"
                        style={{
                          color: "#526277",
                          border: "1px solid #ECEFF2",
                        }}
                        value={formData.town_id}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            town_id: e.target.value,
                          }));
                        }}
                        required
                      >
                        <option value="">Select Town</option>

                        {townsByRegionFromStore &&
                          townsByRegionFromStore.map((town) => {
                            return (
                              <option key={town.id} value={town.id}>
                                {town.name}
                              </option>
                            );
                          })}
                      </select>
                    </Form.Group>
                  </div>

                  <div className="listYourBusinessHomeForm-two-Inputs">
                    <Form.Group
                      className="mb-3 listYourBusinessHomeForm-input-tag-container"
                      controlId="formBasicEmail"
                    >
                      <div className="addBusinessModal-location-container">
                        <div className="listYourBusinessHomeForm-two-Inputs">
                          <Form.Group
                            className="mb-3 listYourBusinessHomeForm-input-tag-container"
                            controlId="formBasicLongitude"
                          >
                            <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                              Longitude{" "}
                              <span style={{ color: "#677A90" }}>
                                (optional)
                              </span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Longitude"
                              className="runErrandPopUpSignUpFormTab-formInput"
                              value={formData.longitude}
                              readOnly
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3 listYourBusinessHomeForm-input-tag-container"
                            controlId="formBasicLatitude"
                          >
                            <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                              Latitude{" "}
                              <span style={{ color: "#677A90" }}>
                                (optional)
                              </span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Latitude"
                              className="runErrandPopUpSignUpFormTab-formInput"
                              value={formData.latitude}
                              readOnly
                            />
                          </Form.Group>
                        </div>
                        <div>
                          <Button
                            variant="primary"
                            className="listYourBusinessHomeForm-goBack"
                            onClick={getLocation}
                          >
                            <img
                              src={BusinessLocationIcon}
                              alt="BusinessLocationIcon"
                            />
                            Get My Address
                          </Button>
                        </div>
                      </div>
                    </Form.Group>
                  </div>
                  <hr />

                  <h6 className="listYourBusinessHomeForm-inputs-agent-Heading">
                    Agent
                  </h6>
                  <div className="runErrandPopUpSignUpFormTab-signUpForm-heading">
                    If you're an agent, please enter your referral code
                  </div>

                  <Form.Group
                    className="mb-3 listYourBusinessHomeForm-input-tag-container"
                    controlId="formBasicEmail"
                  >
                    <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                      Referral Code
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter the referral code"
                      className="listYourBusinessHomeForm-formInput-refferalInput"
                      value={formData.agent}
                      onChange={(e) => {
                        setFormData((prev) => {
                          return {
                            ...prev,
                            agent: e.target.value,
                          };
                        });
                      }}
                    />
                  </Form.Group>

                  {/* <div
              className="d-flex flex-column align-items-start gap-3 mt-5"
              onClick={() => {
                publishAddBusiness();
              }}
            >
              <Button
                variant="primary"
                className="listYourBusinessHomeForm-signIn-blue"
                style={{ width: "62%" }}
              >
                Publish
              </Button>
            </div> */}

                  <div className="d-flex align-items-center gap-3 mt-5 mb-3">
                    {" "}
                    <Button
                      variant="primary"
                      className="editBusinessForm-signIn-blue"
                      onClick={() => {
                        publishEditBusiness(errandDetailsId?.slug);
                      }}
                    >
                      {" "}
                      Save Changes{" "}
                    </Button>{" "}
                    <button
                      type="button"
                      class="btn btn-primary btn-lg businessUserView-location-whiteButton"
                    >
                      {" "}
                      Cancel{" "}
                    </button>{" "}
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditBusinessForm;
