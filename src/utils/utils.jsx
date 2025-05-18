import { toast } from "react-toastify";
import Cookies from "js-cookie";

// export const token = () => {
//   return sessionStorage.getItem("access_token");
// };

export const token = () => {
  return Cookies.get("auth_token");
};

export const notifySuccess = (msg) => toast.success(msg);

export const notifyError = (msg) => toast.error(msg);

export const getInitials = (name) => {
  if (!name) return "";
  const words = name.split(" ");
  return words
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

export const createFallbackImage = (initials) => {
  const svg = `
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#1006ac"/>
          <text x="50%" y="50%" font-size="40" text-anchor="middle" fill="#fff" dy=".3em">${initials}</text>
      </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};
