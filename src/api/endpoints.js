const endpoints = {
  anaf: {
    checkCUI: (cuiCode) => `https://api.aipro.ro/get?cui=${cuiCode}`, // GET
  },
  login: {
    google: {
      getUserInfo: (accessToken) =>
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken} `,
    },
  },
};

export { endpoints };
