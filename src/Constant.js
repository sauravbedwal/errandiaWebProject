export default class apis {
  static login = "auth/login";

  static signup = "auth/signup";

  static otpLogin = "auth/validate_otp_code";

  static logout = "auth/logout";

  static products = "user/products";

  static business = "user/shops";

  static recentErrands = "errands";

  static pharmacies = "pharmacies/search";

  static errandos = "errandos/search";

  static businessNearYou = "shops";

  // static businessNearYou = "shops/featured";

  static createProduct = "user/items";

  static totalBusinessesCreatedByAUser = "user/shops/count";

  static getProductCategories = "sub_categories";

  static regions = "regions";

  static userDetails = "user";

  static profileImage = "user/image_upload";

  static featured = "shops/featured";

  static searchProducts = "products/search";

  static searchBusiness = "shops/search";

  static searchPharmacies = "pharmacies/search";

  static productCategories = "sub_categories";

  static townsByRegion = "towns";

  static productDetails = "items";

  static businessProductDetails = "shops";

  static errandoDetails = "errandos";

  static pharmacyDetails = "pharmacies";

  static errandDetails = "errands";

  static productsFromBusinesses = "shops";

  static deleteUserProduct = "user/items";

  static editUserProduct = "user/items";

  static services = "user/services";

  static userErrandsReceived = "user/errands_received";

  static rejectReceivedErrands = "user/errands_received";

  static userErrandsPosted = "user/errands";

  static deleteUserPostedErrands = "user/errands";

  static markErrandsFound = "user/errands";

  static errandsDetails = "user/errands";

  static editImage = "user/items";

  static deleteImage = "user/items";

  static faq = "pages/faq";

  static policy = "pages";

  static contact = "pages/contact-information";

  static runAnErrand = "user/errands";

  static createBusiness = "user/shops";

  static businessCategories = "categories";

  static deleteUserBusiness = "user/shops";

  static editUserBusiness = "user/shops";

  static editBusinessImage = "user/shops";

  static getAllPlans = "plans";

  static subscribePlan = "user/subscriptions";

  static mySubscriptions = "user/subscriptions";

  static subscriptionStatus = "user/subscriptions";

  static errandoReviews = "reviews";
}

// export class pathnames {
//   static errandDetails = "/errands-details";
// }

export const captchaKey = import.meta.env.VITE_CAPTCHA_KEY;

export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
