const express = require('express');
const app = express();
const bodyParser = require('body-parser')
// use it only in routes that needs them
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const router = express.Router();
const authenticate = require('./middlewares/authenticate')
const User = require('./models/User')
const Tag = require('./models/Tag')
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
      User.usernameExists(username)
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
            .catch(err => { console.log(err) })
});






const emailIsOK = email => {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(String(email).toLowerCase())
}
const firstNameIsOK = firstName => {
      const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ-]{3,15}$/
      return regex.test(String(firstName))
}
const lastNameIsOK = lastName => {
      const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]{3,15}$/
      return regex.test(String(lastName))
}
const usernameIsOK = username => {
      const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]{5,10}$/
      return regex.test(String(username))
}
const passwordIsOK = password => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
      return regex.test(String(password))
}

const newUserIsOK = async (email, firstName, lastName, username, password) => {
      const helpers = {}
      if (!emailIsOK(email)) { helpers.emailKO = true }
      if (!firstNameIsOK(firstName)) { helpers.firstNameKO = true }
      if (!lastNameIsOK(lastName)) { helpers.lastNameKO = true }
      if (!usernameIsOK(username)) { helpers.usernameKO = true }
      if (!passwordIsOK(password)) { helpers.passwordKO = true }
      const emailUser = await User.emailExists(email)
      if (emailUser) { helpers.emailTaken = true }
      const usernameUser = await User.usernameExists(username)
      if (usernameUser) { helpers.usernameTaken = true }
      return helpers
}

router.route('/api/users')
.get(authenticate, (req,res) => {
      User.getUsers().then( users => {
            res.json({message : "List all users", data: users});
      }).catch(error => { console.log(error) })
})
.post((req,res) => {
      const manageNewUser = async (email, firstName, lastName, username, password) => {
            const helpers = await newUserIsOK(email, firstName, lastName, username, password)
            if (helpers.emailKO
                  || helpers.firstNameKO
                  || helpers.lastNameKO
                  || helpers.usernameKO
                  || helpers.passwordKO
                  || helpers.usernameTaken
                  || helpers.emailTaken) {
                    res.status(400).json(helpers)
                    return
            }
            const user = await User.createUser(email, firstName, lastName, username, password)
            res.status(200).json({ message: 'User created' })
      }
      const { email, firstName, lastName, username, password } = req.body
      manageNewUser(email, firstName, lastName, username, password)
})
.put((req,res) => { 
      res.json({message : "Update a user"});
})
.delete((req,res) => { 
      res.json({message : "Delete a user"});  
}); 



router.route('/api/search')
.get((req,res) => {
      
})
.post((req,res) => {
      const { age, fame, latlng, tags } = req.body
      User.getUsers(age, fame, latlng, tags).then( users => {
            res.json({message : "List all users", data: users});
      }).catch(error => { console.log(error) })
})



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



router.route('/api/tags')
.post((req,res) => {
      console.log(req.body)
      Tag.getTags()
            .then( tags => {
                  for (tag of tags) {
                        tag['value'] = tag['id_tag']
                        delete tag['id_tag']
                        tag['label'] = tag['name']
                        delete tag['name']
                  }
                  return tags
            })
            .then( tags => {
                  // console.log(tags)
                  res.json({message : "List of tags", data: tags});
            })
            .catch(error => { console.log(error) })
})




const tags = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ]

app.use(router);  

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
