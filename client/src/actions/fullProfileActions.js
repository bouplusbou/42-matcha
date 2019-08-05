const axios = require('axios');

const actionHasFullProfile = async () => {
    const authToken = localStorage.getItem('token');
    const hasFullProfile = await axios.get(`/users/hasFullProfile?authToken=${authToken}`);
    return hasFullProfile;
};

module.exports = {
    actionHasFullProfile,
};
