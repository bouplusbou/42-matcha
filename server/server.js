const express = require('express');
const app = express();
const bodyParser = require('body-parser')
// use it only in routes that needs them
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const db = require('./queries')
const router = express.Router()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// router.get('/api/users', db.getUsers );

router.route('/')
.all((req,res) => { 
      res.json({message : "Please go to /api"});
});

router.route('/api')
.all((req,res) => { 
      res.json({message : "❤️ Welcome to Matcha API ❤️"});
});




router.route('/api/users')
.get((req,res) => {
      db.getUsers().then((users) => {
            res.json({message : "List all users", data: users});
      }).catch(() => {
            console.log(error)
      })
})
.post((req,res) => {
      // db.createUser(req.body).then((users) => {
      //       res.json({message : "List all users", data: users});
      // }).catch(() => {
      //       console.log(error)
      // })
})
.put((req,res) => { 
      res.json({message : "Update a user"});
})
.delete((req,res) => { 
res.json({message : "Delete a user"});  
}); 




router.route('/api/users/:id_user')
.get((req,res) => {
      db.getUser(req.params.id_user).then((user) => {
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
 






// app.get('/api/users/:id', db.getUser(req.params.piscine_id) );

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
