const storageComunicator = {
    authToken: {
        set: (authTokens) => {
            localStorage.setItem('authTokens', JSON.stringify(authTokens));
        },
        get: () => {
            return JSON.parse(localStorage.getItem('authTokens'));
        },
        delete: () => {
            localStorage.removeItem('authTokens');
        }
    }
}

export default storageComunicator;