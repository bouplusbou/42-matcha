const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../middlewares/config');

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.userFromUsername(username);
        if (user !== null) {
            if (user.confirmed) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {
                        const token = jwt.sign({ uuid: user.uuid }, config.jwtSecret, { expiresIn: '6h' });
                        res.json({ token: token, userId: user.userId });
                    } else {
                        res.status(401).json({ errorMsg: 'wrong credentials' });
                    }
                });
            } else {
                res.status(401).json({ errorMsg: 'you need to confirm your email first' });
            }
        } else {
                res.status(401).json({ errorMsg: 'wrong credentials' });
        }
    } catch {
        res.status(401).json({ errorMsg: 'something went wrong' });
    }
}

const uuidIsValid = (req, res) => {
    UserModel.getUserByUuid(req.params.uuid)
        .then( user => { res.json({message : "Info for one user", data: user}); })
        .catch( error => { console.log(error); });
}

module.exports = {
    login,
    uuidIsValid,
}


// const login = async (req, res) => {
//     const { username, password } = req.body;
//     const user = await UserModel.userFromUsername(username);
    
//         .then(user =>  {
//             if (user !== null) {
//                 if (user.confirmed) {
//                     bcrypt.compare(password, user.password, (err, result) => {
//                         if (result) {
//                             const token = jwt.sign({ uuid: user.uuid }, config.jwtSecret, { expiresIn: '6h' });
//                             res.json({ token: token, username: user.username });
//                         } else {
//                             res.status(401).json({ errorMsg: 'wrong credentials' });
//                         }
//                     });
//                 } else {
//                     res.status(401).json({ errorMsg: 'you need to confirm your email first' });
//                 }
//             } else {
//                     res.status(401).json({ errorMsg: 'wrong credentials' });
//             }
//         })
//         .catch(err => { console.log(err); });
// }