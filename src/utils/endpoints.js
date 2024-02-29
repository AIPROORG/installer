// const PRODUCTION_BACKEND_URL = "https://backend-for-browser-production.up.railway.app/";
const BACKEND_URL = "https://backend-for-browser-production.up.railway.app/";
const endpoints = {
  company: {
    setCompany: `${BACKEND_URL}api/organization/set_organization/`, // POST
    set_cod_caen: `${BACKEND_URL}api/organization/set_caen_code/`, // POST
    set_nr_employees: `${BACKEND_URL}api/organization/set_nr_employees/`, // POST
    generate_departments: `${BACKEND_URL}api/organization/generate_departments/`, // GET
    set_company_departments: `${BACKEND_URL}api/organization/set_company_departments/`, // POST
  },
  login: {
    basic: {
      login: `${BACKEND_URL}api/auth/regular-login/`, 
      updateToken: `${BACKEND_URL}api/auth/token/refresh/`, 
    },
    google: `${BACKEND_URL}api/auth/google/`,
  },
};


export { endpoints, BACKEND_URL };
