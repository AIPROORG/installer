// const LOCALE_BACKEND_URL = "http://127.0.0.1:8000/";
// const endpoints = {
//   company: {
//     setCompany: `${LOCALE_BACKEND_URL}api/organization/set_organization/`, // POST
//     getDepartments: `${LOCALE_BACKEND_URL}api/organization/generate_departments/`, // GET
//   },
//   login: {
//     basic: {
//       login: `${LOCALE_BACKEND_URL}api/auth/regular-login/`, 
//       updateToken: `${LOCALE_BACKEND_URL}api/auth/token/refresh/`, 
//     },
//     google: `${LOCALE_BACKEND_URL}api/auth/google/`,
//   },
// };


const PRODUCTION_BACKEND_URL = "https://backend-for-browser-production.up.railway.app/";
const endpoints = {
  company: {
    setCompany: `${PRODUCTION_BACKEND_URL}api/organization/set_organization/`, // POST
    getDepartments: `${PRODUCTION_BACKEND_URL}api/organization/generate_departments/`, // GET
  },
  login: {
    basic: {
      login: `${PRODUCTION_BACKEND_URL}api/auth/regular-login/`, 
      updateToken: `${PRODUCTION_BACKEND_URL}api/auth/token/refresh/`, 
    },
  google: `${PRODUCTION_BACKEND_URL}api/auth/google/`,
  },
};

export { endpoints, PRODUCTION_BACKEND_URL };
