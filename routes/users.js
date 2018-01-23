const express = require('express');
const router = express.Router();
const knex = require('../knex');
const jwt = require('jsonwebtoken');
const saltRounds = 8;
const bcrypt = require('bcrypt');

router.post('/login', (req, res, next) => {
  knex('users')
  .select('*')
  .where('users.user_name', req.body.user_name)
  .then(function(user) {
    res.send(user);
  })
})
// router.post('/login', (req, res, next) => {
//   // console.log(req.body);
//   knex('users')
//   .select('*')
//   .where('users.user_name', req.body.user_name)
//   .then(function(user) {
//     console.log(user, 'USER');
//     if(Object.keys(user).length === 0) {
//       res.setHeader('Content-Type', 'text/plain');
//       res.send('Incorrect username or password');
//     } else {
//       console.log(req.body.password, user);
//       bcrypt.compare(req.body.password, user.hashed_password, function(err, decode) {
//         if (err) {
//           console.log(err);
//           return res.send('Invalid usename or password');
//         } else if (decode === true) {
//           var token = jwt.sign(user, 'secret');
//           return res.send({
//             jwtToken: token
//           }).status(200);
//         }
//       });
//     }
//   });
//   // console.log('login');
// });

// router.post('/create', (req, res, next) => {
//   console.log(req.body);
//   res.sendStatus(200);
// });

/* GET users listing. */
router.get('/', (req, res, next) => {
  knex('users')
  .select('id', 'user_name', 'first_name', 'last_name')
  .then(function (data) {
    return res.send(data);
  });
});

router.post('/new', (req, res, next) => {
  // console.log(req.body.password, 'PW');

  let newUserObj = {
    user_name: req.body.user_name,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    hashed_password: req.body.password
  }
  knex('users')
  .insert(newUserObj)
  .returning('*')
  .then((newUserObj) => {
    res.json(newUserObj);
  })
  .catch((error) => {
    console.log(error, 'NEW USER ERROR');
  })
});


  postLocation = (locationId, req, res) => {
    knex('users')
    .select('*')
    .where('id', req.id)
    .then(userId => {
      knex('beers')
      .returning('*')
      .insert({
        user_id: req.id,
        location_id: locationId[0].id,
        number_beers: req.number_beers,
        friend_name: req.friend_name,

      })
      .then(beersObj => {
        knex('beers')
        .select('location_name', 'number_beers',  'friend_name')
        .where('beers.id', beersObj[0].id)
        .join('locations', 'locations.id', 'beers.location_id')
        .then(displayObj => {
          res.send(displayObj)
        })
    })
  })
}

  router.post('/cheers', (req, res, next) => {
    req.body.location_name = req.body.location_name.toLowerCase();
  knex('locations')
  .select('*')
  .where('location_name', req.body.location_name)
  .then(locationId => {
    if(locationId.length) {
      postLocation(locationId, req.body, res)
    } else {
      knex('locations')
      .returning('*')
      .insert({location_name: req.body.location_name})
      .then(locationId => {
        postLocation(locationId, req.body, res)
      })
      .catch((error) => {
        console.log(error, 'locationId ERROR');
      })
    }

  })
  .catch((error) => {
    console.log(error, 'NEW CHEERS ERROR');
  })
});

router.post('/', (req, res, next) => {
  let id = req.params.id;
  let beers = req.body.number_beers;
  let beersObj = {
    user_id: id,
    number_beers: beers
  }
  knex('users')
  .insert(beersObj)
  .returning('*')
  .then((returnObj) => {
    res.send(returnObj);
  })
});

router.patch('/:id', (req, res, next) => {
  let id = req.params.id;
  let body = req.body;
  res.sendStatus(200);
});

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  let body = req.body;
  res.sendStatus(200);
});

router.get('/:id', (req, res, next) => {
  knex('users')
  .where('users.id', req.params.id)
  .join('beers', 'users.id', '=', 'beers.user_id')
  .join('locations', 'beers.location_id', '=', 'locations.id')
  .select('number_beers', 'first_name', 'friend_name', 'location_name')
  .then((beers) => {
    return res.send(beers);
  });
});

module.exports = router;
