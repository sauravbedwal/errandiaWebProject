// import "./App.css";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp";
import { LoginOtp } from "./components/loginOtp/LoginOtp";
import SignUpOtp from "./components/signUpOtp/SignUpOtp";
import HeaderComponent from "./pages/headerComponent/HeaderComponent";
import Home from "./pages/home/Home";
import ProductServices from "./pages/productServices/ProductServices";
import ErrandsSingle from "./pages/errandsSingle/ErrandsSingle";
import LoggedInAllErrands from "./pages/loggedInAllErrands/LoggedInAllErrands";
import LoggedInSingleErrands from "./pages/loggedInSingleErrands/LoggedInSingleErrands";
import PublicOffices from "./pages/publicOffices/PublicOffices";
import ListYourBusinessHome from "./pages/listYourBusinessHome/ListYourBusinessHome";
import ListYourBusinessSignUp from "./components/listYourBusinessSignUp/ListYourBusinessSignUp";
import ListYourBusinessSignIn from "./components/listYourBusinessSignIn/ListYourBusinessSignIn";
import Errandos from "./pages/errandos/Errandos";
import AllFeaturedBusiness from "./pages/allFeaturedBusiness/AllFeaturedBusiness";
import FeaturedBusinessProfileShare from "./components/featuredBusinessProfileShare/FeaturedBusinessProfileShare";
import SearchProducts from "./pages/searchProducts/SearchProducts";
import SearchServices from "./pages/searchServices/SearchServices";
import SearchBusinesses from "./pages/searchBusinesses/SearchBusinesses";
import SearchPharmaciesNoResult from "./pages/searchPharmaciesNoResult/SearchPharmaciesNoResult";
import SearchPharmaciesFound from "./pages/searchPharmaciesFound/SearchPharmaciesFound";
import SearchProductDetails from "./pages/searchProductDetails/SearchProductDetails";
import SearchSingleProduct from "./pages/searchSingleProduct/SearchSingleProduct";
import AllBusinessProfile from "./pages/allBusinessProfile/AllBusinessProfile";
import AllPharmacies from "./pages/allPharmacies/AllPharmacies";
import SinglePharmacies from "./pages/singlePharmacies/SinglePharmacies";
import BusinessProfileUserView from "./pages/businessProfileUserView/BusinessProfileUserView";
import RunErrandPopUpSignUpFormSignUpForm from "./components/runErrandPopUpSignUpForm/RunErrandPopUpSignUpForm";
import RunErrandPopUp from "./components/runErrandPopUp/RunErrandPopUp";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import BusinessProfileUserViewProducts from "./pages/businessProfileUserViewProducts/BusinessProfileUserViewProducts";
import UserProfile from "./pages/userProfile/UserProfile";
import UserProfileEditBusiness from "./pages/userProfileEditBusiness/UserProfileEditBusiness";
import ErrandiaBooster from "./components/errandiaBooster/ErrandiaBooster";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy";
import TermsandCondition from "./components/termsandCondition/TermsandCondition";
import NotificationsPage from "./pages/notificationsPage/NotificationsPage";
import ContactPage from "./pages/contactPage/ContactPage";
import AboutUsPage from "./pages/aboutUsPage/AboutUsPage";
import FaqsPage from "./pages/faqPage/FaqsPage";
import FaqsPageDetails from "./pages/faqPageDetails/FaqsPageDetails";
import DownloadAppPage from "./pages/downloadAppPage/DownloadAppPage";
import EditProfilePage from "./pages/editProfilePage/EditProfilePage";
import UserProfileEditErrands from "./components/userProfileEditErrands/UserProfileEditErrands";
import ErrandoProfile from "./pages/errandoProfile/ErrandoProfile";
import SubscriptionBoxModal from "./components/subscriptionBoxModal/SubscriptionBoxModal";
import ViewErrand from "./components/viewErrand/ViewErrand";
import ErrorPage from "./components/errorPage/ErrorPage";
// import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div style={{ zIndex: 0 }}>
      <ScrollToTop />
      <HeaderComponent>
        <Outlet />
      </HeaderComponent>
      <Footer />
      {/* <ToastContainer /> */}
    </div>
  );
}

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login-otp",
        element: <LoginOtp />,
      },
      {
        path: "/signup-otp",
        element: <SignUpOtp />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/run-errand-popup",
        element: <RunErrandPopUp />,
      },
      {
        path: "/subscription",
        element: <SubscriptionBoxModal />,
      },
      // {
      //   path: "/errandia-booster",
      //   element: <ErrandiaBooster />,
      // },
      {
        path: "/run-errand-popup-signup-form",
        element: <RunErrandPopUpSignUpFormSignUpForm />,
      },
      {
        path: "/product-services",
        element: <ProductServices />,
      },
      {
        path: "/errand-single/:slug",
        element: <ErrandsSingle />,
      },
      {
        path: "/all-errands",
        element: <LoggedInAllErrands />,
      },
      {
        path: "/errands-details",
        element: <LoggedInSingleErrands />,
      },
      {
        path: "/public-information",
        element: <PublicOffices />,
      },
      {
        path: "/list-your-business",
        element: <ListYourBusinessHome />,
      },
      {
        path: "/list-your-business-signup",
        element: <ListYourBusinessSignUp />,
      },
      {
        path: "/list-your-business-signin",
        element: <ListYourBusinessSignIn />,
      },
      {
        path: "/errandos",
        element: <Errandos />,
      },
      {
        path: "/featured-business",
        element: <AllFeaturedBusiness />,
      },
      {
        path: "/featured-business-profile",
        element: <FeaturedBusinessProfileShare />,
      },
      {
        path: "/search-products",
        element: <SearchProducts />,
      },
      {
        path: "/search-services",
        element: <SearchServices />,
      },
      {
        path: "/search-businesses",
        element: <SearchBusinesses />,
      },
      {
        path: "/search-pharmacies-no-result",
        element: <SearchPharmaciesNoResult />,
      },
      {
        path: "/search-pharmacies",
        element: <SearchPharmaciesFound />,
      },
      {
        path: "/search-product-details",
        element: <SearchProductDetails />,
      },
      {
        path: "/search-single-product/:slug",
        element: <SearchSingleProduct />,
      },
      {
        path: "/all-business-profile",
        element: <AllBusinessProfile />,
      },
      {
        path: "/all-pharmacies",
        element: <AllPharmacies />,
      },
      {
        path: "/single-pharmacies/:slug",
        element: <SinglePharmacies />,
      },
      {
        path: "/business-profile-user-view/:slug",
        element: <BusinessProfileUserView />,
      },
      {
        path: "/business-profile-user-view-products",
        element: <BusinessProfileUserViewProducts />,
      },
      {
        path: "/user-profile",
        element: <UserProfile />,
      },
      {
        path: "/user-profile-edit-business",
        element: <UserProfileEditBusiness />,
      },
      {
        path: "/edit-profile",
        element: <EditProfilePage />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-condition",
        element: <TermsandCondition />,
      },
      {
        path: "/notifications",
        element: <NotificationsPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/about-us",
        element: <AboutUsPage />,
      },
      {
        path: "/faqs",
        element: <FaqsPage />,
      },
      {
        path: "/faqs-details",
        element: <FaqsPageDetails />,
      },
      {
        path: "/download-app",
        element: <DownloadAppPage />,
      },
      {
        path: "/edit-profile",
        element: <EditProfilePage />,
      },
      {
        path: "/user-profile-edit-errands",
        element: <UserProfileEditErrands />,
      },
      {
        path: "/errando-profile/:slug",
        element: <ErrandoProfile />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default App;
