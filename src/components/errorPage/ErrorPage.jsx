import { Link } from "react-router-dom";
import errorPage from "../../assets/errorPage.jpg";
const ErrorPage = () => {
  return (
    <div className="error-container">
      <img src={errorPage} alt="Page Not Found" className="error-image" />
      <h1>Oops! Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="error-btn mb-5">
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
