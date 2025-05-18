import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import booleanSlice from "./booleanSlice";
import modalSlice from "./modalSlice";
import subscriptionSlice from "./subscriptionSlice";
import errandiaBoosterSlice from "./errandiaBoosterSlice";
import signUpModalSlice from "./signUpModalSlice";
import businessShareSlice from "./businessShareSlice";
import callModalSlice from "./callModalSlice";
import reportModalSlice from "./reportModalSlice";
import reportSubmittedSlice from "./reportSubmittedSlice";
import deleteModalSlice from "./deleteModalSlice";
import addBusinessModalSlice from "./addBusinessModalSlice";
import addBusinessBranchModalSlice from "./addBusinessBranchModalSlice";
import branchAddedModalSlice from "./branchAddedModalSlice";
import verifyBusinessModalSlice from "./verifyBusinessModalSlice";
import verifyBusinessConfirmedModalSlice from "./verifyBusinessConfirmedModalSlice";
import addProductNoBusinessModalSlice from "./addProductNoBusinessModalSlice";
import userprofileAddProductModalSlice from "./userprofileAddProductModalSlice";
import userProfileAddServiceModalSlice from "./userProfileAddServiceModalSlice";
import runErrandNewModalSlice from "./runErrandNewModalSlice";
import errandsItemFoundModalSlice from "./errandsItemFoundModalSlice";
import writeReviewModalSlice from "./writeReviewModalSlice";
import thankYouForReviewModalSlice from "./thankYouForReviewModalSlice";
import userprofileEditProductModalSlice from "./userprofileEditProductModalSlice";
import userProfileEditServiceModalSlice from "./userProfileEditServiceModalSlice";
import productsDataSlice from "./productsDataSlice";
import featuredDataSlice from "./featuredDataSlice";
import allFeaturedDataSlice from "./allFeaturedDataSlice";
import recentErrandsSlice from "./recentErrandsSlice";
import errandosSlice from "./errandosSlice";
import pharmaciesSlice from "./pharmaciesSlice";
import businessNearYouSlice from "./businessNearYouSlice";
import businessDataSlice from "./businessDataSlice";
import languageSlice from "./languageSlice";
import regionsSlice from "./regionsSlice";
import userDetailsSlice from "./userDetailsSlice";
import searchProductSlice from "./searchProductSlice";
import searchBusinessSlice from "./searchBusinessSlice";
import searchPharmaciesSlice from "./searchPharmaciesSlice";
import productCategoriesSlice from "./productCategoriesSlice";
import townsByRegionSlice from "./townsByRegionSlice";
import productDetailsSlice from "./productDetailsSlice";
import businessDetailsSlice from "./businessDetailsSlice";
import fallBackImageSlice from "./fallBackImageSlice";
import errandDetailsSlice from "./errandDetailsSlice";
import filterPharmaciesCalenderSlice from "./filterPharmaciesCalenderSlice";
import deleteSlice from "./deleteSlice";
import userReceivedErrandsSlice from "./userReceivedErrandsSlice";
import paginationSlice from "./paginationSlice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    boolean: booleanSlice,
    modal: modalSlice,
    subscription: subscriptionSlice,
    errandiaBooster: errandiaBoosterSlice,
    signUpModal: signUpModalSlice,
    businessShare: businessShareSlice,
    callModal: callModalSlice,
    reportModal: reportModalSlice,
    reportSubmittedModal: reportSubmittedSlice,
    deleteModal: deleteModalSlice,
    addBusiness: addBusinessModalSlice,
    addBusinessBranch: addBusinessBranchModalSlice,
    branchAdded: branchAddedModalSlice,
    verifyBusiness: verifyBusinessModalSlice,
    verifyConfirmed: verifyBusinessConfirmedModalSlice,
    addProductNoBusiness: addProductNoBusinessModalSlice,
    userprofileAddProduct: userprofileAddProductModalSlice,
    userProfileAddService: userProfileAddServiceModalSlice,
    runErrandNew: runErrandNewModalSlice,
    errandsItemFound: errandsItemFoundModalSlice,
    writeReview: writeReviewModalSlice,
    thankYouForReview: thankYouForReviewModalSlice,
    userprofileEditProduct: userprofileEditProductModalSlice,
    userProfileEditService: userProfileEditServiceModalSlice,
    productsData: productsDataSlice,
    businessData: businessDataSlice,
    language: languageSlice,
    regions: regionsSlice,
    userDetails: userDetailsSlice,
    featuredData: featuredDataSlice,
    searchProduct: searchProductSlice,
    searchBusiness: searchBusinessSlice,
    searchPharmacies: searchPharmaciesSlice,
    productCategories: productCategoriesSlice,
    townsByRegion: townsByRegionSlice,
    recentErrandsData: recentErrandsSlice,
    pharmaciesData: pharmaciesSlice,
    errandosData: errandosSlice,
    businessNearYouData: businessNearYouSlice,
    productDetails: productDetailsSlice,
    businessDetails: businessDetailsSlice,
    fallBackImage: fallBackImageSlice,
    errandDetails: errandDetailsSlice,
    filterPharmaciesCalender: filterPharmaciesCalenderSlice,
    delete: deleteSlice,
    userReceivedErrands: userReceivedErrandsSlice,
    pagination: paginationSlice,
  },
});

export default appStore;
