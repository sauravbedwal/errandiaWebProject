import React from "react";
import AdBannerCarousel from "../../components/adBannerCarousel/AdBannerCarousel";
import FeaturedCardsCarousel from "../../components/featuredCardsCarousel/FeaturedCardsCarousel";
import BusinessesNearYou from "../../components/businessesNearYouCarousel/BusinessesNearYou";
import RecentErrands from "../../components/recentErrands/RecentErrands";
import GetStartedImage from "../../components/getStartedImage/GetStartedImage";
import OurErrandos from "../../components/ourErrandos/OurErrandos";
import Pharmacies from "../../components/pharmacies/Pharmacies";
import MobilePhonesAd from "../../components/mobilePhonesAd/MobilePhonesAd";
import AdBannerCarouselMedium from "../../components/adBannerCarouselMedium/AdBannerCarouselMedium";
import AdBannerCarouselsmall from "../../components/adBannerCarouselsmall/AdBannerCarouselsmall";

const Home = () => {
  return (
    <div>
      <AdBannerCarousel />
      <FeaturedCardsCarousel />
      <BusinessesNearYou />
      <AdBannerCarouselMedium />
      <RecentErrands />
      <GetStartedImage />
      <OurErrandos />
      <AdBannerCarouselsmall />
      <Pharmacies />
      <MobilePhonesAd />
    </div>
  );
};

export default Home;
