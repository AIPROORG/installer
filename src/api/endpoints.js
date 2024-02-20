// const endpoints = {
//   company: {
//     setCompany: `http://127.0.0.1:8000/api/organization/set_organization/`, // POST
//     getDepartments: `http://127.0.0.1:8000/api/organization/generate_departments/`, // GET
//   },
//   login: {
//     basic: {
//       login: "http://127.0.0.1:8000/api/token/",
//       updateToken: "http://127.0.0.1:8000/api/token/refresh/",
//       setGoogleUserData: "http:///127.0.0.1:8000/api/auth/google/",
//     },
//     google: {
//       getUserInfo: (accessToken) =>
//         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
//     },
//   },
// };

const endpoints = {
  company: {
    setCompany: `https://django-rest-starter-production-e568.up.railway.app/api/organization/set_organization/`,
    getDepartments:
      "https://django-rest-starter-production-e568.up.railway.app/api/organization/generate_departments/",
  },
  login: {
    basic: {
      login:
        "https://django-rest-starter-production-e568.up.railway.app/api/token/",
      updateToken:
        "https://django-rest-starter-production-e568.up.railway.app/api/token/refresh/",
    },
    google: {
      getUserInfo: (accessToken) =>
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
    },
  },
  admin: {
    checkStatus:
      "https://django-rest-starter-production-e568.up.railway.app/api/admin/check-status/", // Exemplu de endpoint pentru verificarea statusului de administrator
  },
};

export { endpoints };
