const express = require('express');
const app = express();
const bodyParser = require('body-parser')
// use it only in routes that needs them
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const router = express.Router();
const authenticate = require('./middlewares/authenticate')
const User = require('./models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('./middlewares/config')
const cookieParser = require('cookie-parser')
// const uuid = require('uuid/v4')
// const session = require('express-session')



// app.use(session({
//       genid: (req) => {
//         console.log('Inside the session middleware')
//         console.log(req.sessionID)
//         return uuid() // use UUIDs for session IDs
//       },
//       secret: 'keyboard cat',
//       resave: false,
//       saveUninitialized: true
// }))
app.use(cookieParser());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// router.route('/')
// .all(authenticate, (req,res) => { 
//       res.json({message : "Please go to /"});
// });



 
router.route('/api')
.all((req,res) => { 
      res.json({message : "❤️ Welcome to Matcha API ❤️"});
});

router.route('/api/checkToken')
.get(authenticate, (req,res) => {
      res.sendStatus(200)
})

router.route('/api/auth')
.post((req,res) => { 
      const { username, password } = req.body
      User.usernameIsValid(username)
            .then(user =>  {
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
            .catch(err => {console.log(err)})
});


router.route('/api/users')
.get(authenticate, (req,res) => {
      User.getUsers().then((users) => {
            res.json({message : "List all users", data: users});
      }).catch(() => {
            console.log(error)
      })
})
.post((req,res) => {
      User.createUser(req.body)
            .then(user => {
            res.json({message : "New user created"})})
            .catch(error => {
            console.log(error)
      })
})
.put((req,res) => { 
      res.json({message : "Update a user"});
})
.delete((req,res) => { 
res.json({message : "Delete a user"});  
}); 




router.route('/api/users/:id_user')
.get((req,res) => {
      User.getUser(req.params.id_user).then((user) => {
            console.log(user)
            res.json({message : "Info for user #" + req.params.id_user, data: user});
      }).catch(() => {
            console.log(error)
      })
})
.put((req,res) => { 
	  res.json({message : "Update info for user #" + req.params.id_user});
})
.delete((req,res) => { 
	  res.json({message : "Delete user #" + req.params.id_user});
});





app.use(router);  

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
