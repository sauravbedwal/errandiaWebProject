import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import {
  modalAddBusinessToggle,
  setAddBusinessModalFalse,
} from "../../utils/addBusinessModalSlice";
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
  modalUserprofileEditProductToggle,
  setEditImage,
  setUserprofileEditProductModalFalse,
} from "../../utils/userprofileEditProductModalSlice";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ToastContainer, toast } from "react-toastify";
import {
  deleteApi,
  getApi,
  postApi,
  putApi,
} from "../../fetchApi/FetchAxiosApi";
// s
import apis from "../../Constant";
import { notifyError, notifySuccess, token } from "../../utils/utils";
import { addProducts, addServices } from "../../utils/productsDataSlice";

const UserProfileEditProduct = ({
  editSlug,
  productAdded,
  setProductAdded,
  service,
  productData,
}) => {
  const userprofileEditProductModalBoolean = useSelector(
    (store) => store?.userprofileEditProduct?.value
  );

  // console.log("productData", productData);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    shop_id: "",
    category_id: "",
    description: "",
  });

  useEffect(() => {
    if (productData) {
      // console.log("productData-useeffect", productData);
      setFormData((prev) => {
        return {
          ...prev,
          name: productData?.name || "",
          shop_id: productData?.shop?.id || "",
          category_id: productData?.category?.id || "",
          description: productData?.description || "",
        };
      });
      // setDescription(productData?.description || "");
    }
  }, [productData]);

  // const [description, setDescription] = useState("");

  // const [editData, setEditData] = useState({
  //   name: productData?.name || "",
  //   description: productData?.description || "",
  // });

  // console.log("editData", editData);

  const [uploadedImage, setUploadedImage] = useState(null);
  // console.log("uploadedImage", uploadedImage);

  const [selectedFile, setSelectedFile] = useState(null);
  // console.log("selectedFile", selectedFile);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      name: e.target.value,
    });
    // setEditData((prev) => ({
    //   ...prev,
    //   name: e.target.value,
    // }));
  };
  // console.log("description", formData.description);

  const editProductImage = async (slug) => {
    try {
      // console.log("selectedFile-tubub ", selectedFile);
      const formImage = new FormData();
      formImage.append("images[0]", selectedFile);

      // console.log("formImage", formImage);
      const res = await postApi(
        apis.editImage + `/${slug}/images/upload`,
        formImage,
        token(),
        true
      );
      // console.log("editProduct", res);
      dispatch(
        setEditImage(res.data.data.images[res.data.data.images.length - 1])
      );

      notifySuccess(res.data.message);

      if (service === "0") {
        const resProduct = await getApi(apis.products, token());
        dispatch(addProducts(resProduct?.data?.data?.items));
      } else {
        const resServices = await getApi(apis.services, token());
        dispatch(addServices(resServices?.data?.data?.items));
      }
    } catch (err) {
      // console.log(err);
      notifyError("Oops! The request was not found.");
    }
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   // console.log("Selected file:", file.name);
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setSelectedFile(file);
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

  const publishEditProduct = async (pub, slug) => {
    if (!formData.name || !formData.shop_id || !formData.category_id) {
      notifyError("Please fill all required fields.");
      return;
    }
    // console.log("serviceservice service service ", service);
    const params = new URLSearchParams({
      service: service,
    });
    try {
      const res = await putApi(
        apis.editUserProduct + `/${slug}` + `?${params}`,
        formData,
        token()
      );
      if (res.status == 200) {
        setProductAdded(true);
        if (pub === "Publish") {
          dispatch(modalUserprofileEditProductToggle());
          dispatch(setUserprofileEditProductModalFalse());
          // setProductAdded(true);
          setFormData(() => {
            return {
              name: "",
              shop_id: "",
              description: "",
              category_id: "",
            };
          });
          // setDescription("");
          setUploadedImage(null);
          setSelectedFile(null);
        }
        if (pub === "Publish and Add New") {
          // setProductAdded(true);
          // setFormData(() => {
          //   return {
          //     name: "",
          //     shop_id: "",
          //     description: "",
          //     category_id: "",
          //   };
          // });
          // // setDescription("");
          // setUploadedImage(null);
          // setSelectedFile(null);
        }
        notifySuccess("Updated Successfully");

        if (service === "0") {
          const resProduct = await getApi(apis.products, token());
          dispatch(addProducts(resProduct?.data?.data?.items));
        } else {
          const resServices = await getApi(apis.services, token());
          dispatch(addServices(resServices?.data?.data?.items));
        }
      }
      // dispatch(modalUserprofileAddProductToggle());
      // dispatch(setUserprofileAddProductModalFalse());
    } catch (err) {
      // console.log(err);
      // console.log(err?.response?.data?.message);
      notifyError(err?.response?.data?.message);
    }
  };

  // const navigate = useNavigate();
  const imageIdFromStore = useSelector(
    (store) => store?.userprofileEditProduct?.editImage
  );

  const deleteImage = async (slug) => {
    try {
      const res = await deleteApi(
        apis.deleteImage +
          `/${slug}/images/delete?image_id=${imageIdFromStore?.id}`,
        token()
      );
      notifySuccess(res?.data?.message);

      if (service === "0") {
        const resProduct = await getApi(apis.products, token());
        dispatch(addProducts(resProduct?.data?.data?.items));
      } else {
        const resServices = await getApi(apis.services, token());
        dispatch(addServices(resServices?.data?.data?.items));
      }
    } catch (err) {
      // console.log(err);
      notify(err?.response?.data?.message);
    }
  };

  const [selectBusinessDropDown, setSelectBusinessDropDown] = useState(null);

  // console.log("selectBusinessDropDown", selectBusinessDropDown);
  const [categoriesDropDown, setCategoriesDropDown] = useState(null);

  useEffect(() => {
    const businessHandler = async () => {
      try {
        const res = await getApi(apis.business, token());
        // console.log("business DROP", res);
        // dispatch(addBusiness(res?.data?.data?.items));
        setSelectBusinessDropDown(res?.data?.data?.items);
      } catch (err) {
        // console.log("businessHandler", err);
        if (err.response && err.response.status === 404) {
          notify("The requested business was not found.");
        }
      }
    };

    const categoryHandler = async () => {
      try {
        const res = await getApi(apis.getProductCategories, token());
        // console.log("category", res);
        setCategoriesDropDown(res?.data?.data);
      } catch (err) {
        // console.log("categoryHandler", err);
        if (err.response && err.response.status === 404) {
          // console.log("Resource not found!");
          notify("The requested category was not found.");
        }
      }
    };

    businessHandler();
    categoryHandler();
  }, []);

  useEffect(() => {
    if (selectedFile !== null) {
      editProductImage(editSlug);
    }
  }, [selectedFile]);

  return (
    <>
      <Modal
        size="lg"
        show={userprofileEditProductModalBoolean}
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
            dispatch(modalUserprofileEditProductToggle());
            dispatch(setUserprofileEditProductModalFalse());
            // setFormData((prev) => {
            //   return {
            //     ...prev,
            //     name: "",
            //     shop_id: "",
            //     description: "",
            //     category_id: "",
            //   };
            // });
            // setDescription("");
            // setUploadedImage(null);
          }}
        >
          <Modal.Title
            id="example-modal-sizes-title-lg"
            className="featureBusinessProfileShare-heading"
          >
            {/* {productModalCollection === "Add Products"
            ? "Add Product"
            : "Edit Product"} */}
            Edit Product
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
                    // value={formData.name}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    placeholder="Enter your business name"
                    className="runErrandPopUpSignUpFormTab-formInput"
                    value={formData?.name}
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
                        shop_id: e.target.value,
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
                  {service === "0"
                    ? "Product Description *"
                    : "Service Description *"}
                </Form.Label>
                <CKEditor
                  editor={ClassicEditor}
                  data={formData?.description}
                  onChange={(event, editor) => {
                    const data = editor.getData();
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
                      onClick={() => {
                        setUploadedImage(null);
                        deleteImage(editSlug);
                      }}
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
                    publishEditProduct("Publish", editSlug);
                  }}
                >
                  Publish
                </Button>
                <button
                  type="button"
                  class="btn btn-primary btn-lg userProfileAddProduct-location-whiteButton"
                  onClick={() => {
                    publishEditProduct("Publish and Add New", editSlug);
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

export default UserProfileEditProduct;
