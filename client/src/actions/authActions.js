const axios = require('axios');

const actionLogin = (token, username) => {
    localStorage.setItem('token', token);
    return username;
};

const actionIsAuthenticated = async authToken => {
    if (authToken) {
        const res = await axios.get(`/auth?authToken=${authToken}`);
        return res.data.username;
    } else {
        return false;
    }
};

const actionLogout = () => {
    localStorage.removeItem('token');
};

module.exports = {
    actionLogin,
    actionIsAuthenticated,
    actionLogout,
};
