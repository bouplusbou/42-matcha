const axios = require('axios');

const actionLogin = token => {
    localStorage.setItem('token', token);
}

const actionIsAuthenticated = async (authToken) => {
    if (authToken) {
        const isAuthenticated = await axios.get(`/auth?authToken=${authToken}`);
        return !!isAuthenticated;
    } else {
        return false;
    }
}

const actionLogout = () => {
    localStorage.removeItem('token');
}

module.exports = {
    actionLogin,
    actionIsAuthenticated,
    actionLogout,
}
