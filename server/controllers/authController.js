const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../middlewares/config')

const login = (req, res) => {
    const { username, password } = req.body
    User.usernameExists(username)
        .then( user =>  {
            if (user) {
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (result) {
                                const token = jwt.sign({
                                    id: user.id_user,
                                    username: user.username
                                }, config.jwtSecret, { expiresIn: '6h'})
                                res.cookie('token', token, { httpOnly: true }).sendStatus(200);
                        } else {
                                res.status(401).json({ errors: 'Invalid Credentials' })
                        }
                    });
            } else {
                    res.status(401).json({ errors: 'Invalid Credentials' })
            }
        })
        .catch( err => { console.log(err) })
}


module.exports = {
    login
}