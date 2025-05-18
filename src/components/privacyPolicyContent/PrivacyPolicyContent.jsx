import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { getApi } from "../../fetchApi/FetchAxiosApi";
import { notifyError } from "../../utils/utils";
import parse from "html-react-parser";
import apis from "../../Constant";
import { useDispatch, useSelector } from "react-redux";
import { setIsPending } from "../../utils/searchProductSlice";
import Loader from "../loader/Loader";

const PrivacyPolicyContent = () => {
  const dispatch = useDispatch();
  const [policyData, setPolicyData] = useState(null);
  const targetSlug = "privacy-policy";

  console.log("first", policyData);

  const fetchPolicy = async () => {
    try {
      dispatch(setIsPending(true));
      const res = await getApi(apis.policy);
      dispatch(setIsPending(false));
      if (res.status === 200) {
        setPolicyData(
          res.data.data.items.find((item) => item.slug === targetSlug)
        );
      }
    } catch (err) {
      console.log(err);
      dispatch(setIsPending(false));
      notifyError("Oops! The request was not found.");
    }
  };

  useEffect(() => {
    fetchPolicy();
  }, []);

  const isPendingFromStore = useSelector(
    (store) => store?.searchProduct?.isPending
  );

  return (
    <>
      {isPendingFromStore ? (
        <Loader />
      ) : (
        <>
          <div className="container privacy-content mt-5 mb-5">
            <h2 className="text-center mb-3">{policyData?.title}</h2>
            <p className="mt-5">
              {typeof policyData?.content === "string"
                ? parse(policyData?.content)
                : ""}
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default PrivacyPolicyContent;
