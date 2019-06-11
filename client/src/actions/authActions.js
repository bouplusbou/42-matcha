const jwt = require('jsonwebtoken');
const axios = require('axios');


const actionLogin = (token) => {
    localStorage.setItem('token', token);
}

async function actionIsAuthenticated(token) {
    let uuid = '';
    await jwt.verify(token, 'secretkey', (err, decoded) => {
        uuid = decoded.uuid;
    });

    const res = await axios.get(`/auth/${uuid}`)
    if (res.data.data[0]) {
        return uuid;
    }
    return false;
}

const actionLogout = () => {
    localStorage.removeItem('token');
}

module.exports = {
    actionLogin,
    actionIsAuthenticated,
    actionLogout,
}
