import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import locationIcon from "../../assets/locationIcon.svg";
import Cookies from "js-cookie";

const Location = () => {
  const { t, i18n } = useTranslation();

  const [location, setLocation] = useState(t("Fetching location..."));

  useEffect(() => {
    setLocation(t("Fetching location..."));
  }, [i18n.language]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const city = response.data.address.city || t("Unknown Location");
            setLocation(city);
          } catch (error) {
            console.error("Error fetching location:", error);
            setLocation(t("Location not found"));
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation(t("Permission Denied"));
        }
      );
    } else {
      setLocation(t("Geolocation not supported"));
    }
  }, [i18n.language]);

  // useEffect(() => {
  //   const savedLanguage = Cookies.get("language") || "en";
  //   i18n.changeLanguage(savedLanguage);
  // }, []);

  return (
    <div className="location-container" style={{ display: "flex" }}>
      <img src={locationIcon} alt="Location Icon" className="me-2" />
      <div>
        <div className="header-location-heading">{t("My Location")}</div>
        <div className="header-location-red">{location}</div>
      </div>
    </div>
  );
};

export default Location;
