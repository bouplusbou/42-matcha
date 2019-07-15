const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../middlewares/config');

const login = (req, res) => {
    const { username, password } = req.body;
    User.userFromUsername(username)
        .then(user =>  {
            // console.log(user);
            // console.log(user.password, user.uuid);
            if (user) {
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (result) {
                            const token = jwt.sign({ uuid: user.uuid }, config.jwtSecret, { expiresIn: '6h' });
                            res.json({ token: token });
                        } else {
                            res.status(401).json({ errors: 'Invalid Credentials' });
                        }
                    });
            } else {
                    res.status(401).json({ errors: 'Invalid Credentials' });
            }
        })
        .catch(err => { console.log(err); });
}

const uuidIsValid = (req, res) => {
    User.getUserByUuid(req.params.uuid)
        .then( user => { res.json({message : "Info for one user", data: user}); })
        .catch( error => { console.log(error); });
}

module.exports = {
    login,
    uuidIsValid,
}