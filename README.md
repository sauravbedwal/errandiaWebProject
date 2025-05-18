
---

# My Errandia App

## Overview
This is a **React app** built with **Vite** for performance and simplicity. The application utilizes modern libraries and tools to deliver a seamless development experience.

---

## Getting Started

### 1. Prerequisites
- **Node.js**: v18.20.6 
- **NPM**: v10.9.0  

Ensure you have the correct versions installed. You can check your Node.js and NPM versions using:
```bash
node -v
npm -v
```

---

### 2. Installation Steps

1. **Create the Vite App**:
   ```bash
   npm create vite@latest my-errandia-app --template react
   ```

2. **Navigate into the project directory**:
   ```bash
   cd my-errandia-app
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

5. **Environment Variables**:
   - Add a `.env` file in the root directory with the following keys:
     ```
     BASE_URL=<Your API Base URL>
     CAPTCHA_KEY=<Your CAPTCHA Key>
     ```

---

## Dependencies

### 3rd Party Libraries
All the third-party libraries used in the project are listed below (also available in the `package.json` file):

```json
"dependencies": {
  "@emotion/react": "^11.14.0",
  "@emotion/styled": "^11.14.0",
  "@mui/material": "^6.3.1",
  "@popperjs/core": "^2.11.8",
  "@reduxjs/toolkit": "^2.5.0",
  "axios": "^1.7.9",
  "bootstrap": "^5.3.3",
  "formik": "^2.4.6",
  "lodash": "^4.17.21",
  "react": "^18.3.1",
  "react-bootstrap": "^2.10.7",
  "react-dom": "^18.3.1",
  "react-form-input-validation": "^2.1.0",
  "react-google-recaptcha": "^3.1.0",
  "react-otp-input": "^3.1.1",
  "react-phone-input-2": "^2.15.1",
  "react-phone-number-input": "^3.4.10",
  "react-redux": "^9.2.0",
  "react-router-dom": "^6.22.3",
  "react-validation": "^3.0.7",
  "validator": "^13.12.0",
  "yup": "^1.6.1"
}
```

### Development Dependencies
```json
"devDependencies": {
  "@eslint/js": "^9.17.0",
  "@types/react": "^18.3.18",
  "@types/react-dom": "^18.3.5",
  "@vitejs/plugin-react": "^4.3.4",
  "eslint": "^9.17.0",
  "eslint-plugin-react": "^7.37.2",
  "eslint-plugin-react-hooks": "^5.0.0",
  "eslint-plugin-react-refresh": "^0.4.16",
  "globals": "^15.14.0",
  "vite": "^6.0.5",
  "vite-plugin-svgr": "^4.3.0"
}
```

---

## Project Structure

The folder structure is organized as follows:

```plaintext
my-errandia-app/
├── assets/                  # Images and icons
├── components/              # All reusable components
├── pages/                   # Pages rendering respective components
├── fetchApi/                # API call functions (e.g., FetchAxiosApi.js)
├── utils/                   # Redux store and slices
├── .env                     # Environment variables (BASE_URL, CAPTCHA_KEY)
├── .gitignore               # Ignores node_modules, dist, and .env
├── Constant.js              # Defines API endpoints and imports BASE_URL & CAPTCHA_KEY
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

---

## Additional Notes

1. **Git Ignore**:
   Ensure the following are added to `.gitignore` to prevent sensitive files and unnecessary folders from being pushed to the repository:
   ```
   node_modules/
   dist/
   .env
   ```

2. **API Endpoints**:
   All API endpoints are batched in a class in `Constant.js` for better organization.

3. **CAPTCHA Key**:
   Ensure that `CAPTCHA_KEY` is set in the `.env` file for Google reCAPTCHA functionality.

4. **Redux**:
   - The Redux store and slices are located in the `utils` folder.

5. **Third-Party Libraries**:
   - React components are styled using Material-UI (`@mui/material`) and Bootstrap.
   - Forms are managed with Formik and Yup for validation.
   - Axios is used for API calls.

---

## Running the Project
To run the app locally:
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd my-errandia-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

---