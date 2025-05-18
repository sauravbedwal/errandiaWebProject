import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import {
  modalAddBusinessToggle,
  setAddBusinessModalFalse,
} from "../../utils/addBusinessModalSlice";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import PhoneInput from "react-phone-input-2";
import runErrandPopUpimageUploader from "../../assets/runErrandPopUpimageUploader.svg";
import runErrandPopUpBrowseFiles from "../../assets/runErrandPopUpBrowseFiles.svg";
import runErrandPopUpUploadedImage from "../../assets/runErrandPopUpUploadedImage.svg";
import runErrandPopUpDelete from "../../assets/runErrandPopUpDelete.svg";
import BusinessLocationIcon from "../../assets/BusinessLocationIcon.svg";
import { useNavigate } from "react-router-dom";
import "summernote/dist/summernote-lite.css";
import $ from "jquery";
import "summernote/dist/summernote-lite.js";
import {
  modalUserprofileAddProductToggle,
  setUserprofileAddProductModalFalse,
} from "../../utils/userprofileAddProductModalSlice";
import { postApi } from "../../fetchApi/FetchAxiosApi";
import apis from "../../Constant";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Formik, Field, useFormik } from "formik";
import { FocusError } from "focus-formik-error";
import * as Yup from "yup";
import { notifyError, notifySuccess, token } from "../../utils/utils";
// import { Formik, Field, useFormik } from "formik";
// import { FocusError } from "focus-formik-error";
// import * as Yup from "yup";
import DOMPurify from "dompurify";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import parse from "html-react-parser";
import { ToastContainer, toast } from "react-toastify";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import { addBusiness } from "../../utils/businessDataSlice";
import { addProducts, addServices } from "../../utils/productsDataSlice";

const UserProfileAddProduct = ({ productAdded, setProductAdded, service }) => {
  const [formData, setFormData] = useState({
    name: "",
    shop_id: "",
    description: "",
    category_id: "",
  });

  const [addEditModal, setAddEditModal] = useState();

  // const notify = (msg) => toast(msg);

  const userprofileAddProductModalBoolean = useSelector(
    (store) => store?.userprofileAddProduct?.value
  );

  const [description, setDescription] = useState("");
  // console.log("description", description);

  const dispatch = useDispatch();

  const [uploadedImage, setUploadedImage] = useState(null);
  // console.log("uploadedImage", uploadedImage);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // console.log("description", formData.description);

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   // console.log("Selected file:", file.name);

  //   if (file) {
  //     setSelectedFile(file);
  //     const imageUrl = URL.createObjectURL(file);
  //     setUploadedImage(imageUrl);
  //   }
  // };

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

  const handleFileButtonClick = () => {
    document.getElementById("file-input").click();
  };

  const publishAddProduct = async (pub, service) => {
    if (
      !formData.name ||
      !formData.shop_id ||
      !formData.category_id ||
      !selectedFile
    ) {
      // alert("Please fill all required fields and upload an image.");
      notifyError("Please fill all required fields and upload an image.");
      return;
    }

    const params = new URLSearchParams({
      service: service,
    });
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("shop_id", formData.shop_id);
      form.append("description", description);
      form.append("category_id", formData.category_id);
      form.append("featured_image", selectedFile);

      // console.log("Payload Data:", Object.fromEntries(form));

      const res = await postApi(
        apis.createProduct + `?${params}`,
        form,
        token(),
        true
      );
      console.log("addProduct", res);
      if (res.status == 200) {
        // setProductAdded(true);
        dispatch(addProducts(res?.data?.data?.items));
        if (pub === "Publish") {
          dispatch(modalUserprofileAddProductToggle());
          dispatch(setUserprofileAddProductModalFalse());
          setFormData(() => {
            return {
              name: "",
              shop_id: "",
              description: "",
              category_id: "",
            };
          });
          setDescription("");
          setUploadedImage(null);
          setSelectedFile(null);
        }
        if (pub === "Publish and Add New") {
          setFormData(() => {
            return {
              name: "",
              shop_id: "",
              description: "",
              category_id: "",
            };
          });
          setDescription("");
          setUploadedImage(null);
          setSelectedFile(null);
        }
        console.log("Checking at migjt", res?.data?.message);
        // notify(res?.data?.message);
        notifySuccess("Created Successfully");
      }
      // dispatch(modalUserprofileAddProductToggle());
      // dispatch(setUserprofileAddProductModalFalse());

      if (service === "0") {
        const resProduct = await getApi(apis.products, token());
        dispatch(addProducts(resProduct?.data?.data?.items));
      } else {
        const resServices = await getApi(apis.services, token());
        dispatch(addServices(resServices?.data?.data?.items));
      }
    } catch (err) {
      console.log(err);
      // console.log(err?.response?.data?.message);
      // notify(err?.response?.data?.message);
      notifyError("Oops! The request was not found.");
    }
  };

  const navigate = useNavigate();

  const [selectBusinessDropDown, setSelectBusinessDropDown] = useState(null);
  const [categoriesDropDown, setCategoriesDropDown] = useState(null);

  useEffect(() => {
    const businessHandler = async () => {
      try {
        const res = await getApi(apis.business, token());
        // console.log("business", res);
        console.log("businessItems", res?.data?.data?.items);
        // dispatch(addBusiness(res?.data?.data?.items));
        setSelectBusinessDropDown(res?.data?.data?.items);
      } catch (err) {
        console.log("businessHandler", err);
        if (err.response && err.response.status === 404) {
          // notify("The requested business was not found.");
          notifyError("The requested business was not found.");
        }
      }
    };

    const categoryHandler = async () => {
      try {
        const res = await getApi(apis.getProductCategories, token());
        // console.log("category", res);
        console.log("categoryITEMS", res?.data?.data);
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

    businessHandler();
    categoryHandler();
  }, []);

  // const productModalCollection = useSelector(
  //   (store) => store?.userprofileAddProduct?.modal
  // );
  // console.log("productModalCollectionssssssss ", productModalCollection);

  // <CKEditor
  //   editor={ClassicEditor}
  //   config={{
  //     toolbar: ["heading", "|", "bold", "italic", "link", "|", "undo", "redo"],
  //   }}
  // />;

  return (
    <>
      <Modal
        size="lg"
        show={userprofileAddProductModalBoolean}
        aria-labelledby="example-modal-sizes-title-lg"
        className="featuredBusinessProfileShare-modal-Container"
      >
        <Modal.Header
          closeButton
          className="userProfileAddProduct-modal-header"
          style={{
            background: service === "0" ? "#10a944" : "#F0B41F",
          }}
          onClick={() => {
            dispatch(modalUserprofileAddProductToggle());
            dispatch(setUserprofileAddProductModalFalse());
            setFormData((prev) => {
              return {
                ...prev,
                name: "",
                shop_id: "",
                description: "",
                category_id: "",
              };
            });
            setDescription("");
            setUploadedImage(null);
          }}
        >
          <Modal.Title
            id="example-modal-sizes-title-lg"
            className="featureBusinessProfileShare-heading"
          >
            {/* {productModalCollection === "Add Products"
              ? "Add Product"
              : "Edit Product"} */}
            {service === "0" ? "Add Product" : "Add Service"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="userProfileAddProduct-social-Handles-container">
            <Form>
              <div className="listYourBusinessHomeForm-two-Inputs">
                <Form.Group
                  className="mb-3 listYourBusinessHomeForm-input-tag-container"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                    {service === "0" ? "Product Name *" : "Service Name *"}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your business name"
                    className="runErrandPopUpSignUpFormTab-formInput"
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 listYourBusinessHomeForm-input-tag-container"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                    Select Business *
                  </Form.Label>
                  <select
                    className="form-select"
                    name="shop_id"
                    aria-label="Default select example"
                    style={{ color: "#526277", border: "1px solid #ECEFF2" }}
                    value={formData.shop_id}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        shop_id: e.target.value, // Store the selected business ID
                      }));
                    }}
                    required
                  >
                    <option value="">Select Business</option>

                    {selectBusinessDropDown &&
                      selectBusinessDropDown.map((business) => {
                        return (
                          <option key={business.id} value={business.id}>
                            {business.name}
                          </option>
                        );
                      })}
                  </select>
                </Form.Group>
              </div>

              <Form.Group
                className="mb-3 userProfileAddProduct-input-tag-container"
                controlId="formBasicEmail"
              >
                <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                  Category *{" "}
                </Form.Label>
                <select
                  className="form-select"
                  name="category_id"
                  aria-label="Default select example"
                  style={{
                    color: "#526277",
                    border: "1px solid #ECEFF2",
                    width: "49%",
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

              <div className="mb-3">
                <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                  Product Description *
                </Form.Label>
                <CKEditor
                  editor={ClassicEditor}
                  data={description}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDescription(data);
                    // console.log("Updated Description:", data);
                  }}
                />
                {/* <div className="help-block with-errors">
                  {formik.touched.about && formik.errors.about ? (
                    <div className="text-danger">{formik.errors.about}</div>
                  ) : null}
                </div> */}
              </div>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="runErrandPopUp-inputHeading">
                  Cover Image *
                </Form.Label>
              </Form.Group>

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

              <Form.Group
                className="mb-3 listYourBusinessHomeForm-input-tag-container mt-3"
                controlId="formBasicEmail"
              >
                <Form.Label className="runErrandPopUpSignUpFormTab-form-input-heading">
                  {service === "0" ? "Product Tags" : "Service Tags"}{" "}
                  <span style={{ color: "#677A90" }}>(optional)</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the referral code"
                  className="userProfileAddProduct-formInput-refferalInput"
                />
                <p className="userProfileAddProduct-productTag-line">
                  enter words related to product separated by comma
                </p>
              </Form.Group>

              <div
                className="d-flex align-items-start gap-3 mt-5"
                onClick={() => {
                  dispatch(modalAddBusinessToggle());
                  dispatch(setAddBusinessModalFalse());
                }}
              >
                <Button
                  variant="primary"
                  className="listYourBusinessHomeForm-signIn-blue"
                  onClick={() => {
                    // dispatch(modalUserprofileAddProductToggle());
                    // dispatch(setUserprofileAddProductModalFalse());
                    publishAddProduct("Publish", service);
                  }}
                >
                  Publish
                </Button>
                <button
                  type="button"
                  class="btn btn-primary btn-lg userProfileAddProduct-location-whiteButton"
                  onClick={() => {
                    publishAddProduct("Publish and Add New", service);
                  }}
                >
                  Publish and Add New
                </button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
      {/* <ToastContainer /> */}
    </>
  );
};

export default UserProfileAddProduct;
