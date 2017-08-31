const express = require('express');
const router = express.Router();
const knex = require('../knex');
const jwt = require('jsonwebtoken');
const saltRounds = 8;
const bcrypt = require('bcrypt');

router.post('/login', (req, res, next) => {
  // console.log(req.body);
  knex('users')
  .select('*')
  .where('users.user_name', req.body.user_name)
  .then(function(user) {
    console.log(user, 'USER');
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
  console.log('TEDDI1');
  console.log(req.body.password, 'PW');

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
    console.log('TEDDI2');
    res.json(newUserObj);
  })
  .catch((error) => {
    console.log(error, 'NEW USER ERROR');
  })
});

router.post('/cheers', (req, res, next) => {

  // let newBeersObj = { //can I insert into multiple tables in a post route
    //I have joins in my Get route - will these carry over to my post route
    //how do i store the name of the person who bought me a beer in the database?
    // first_name: req.body.first_name,
    // last_name: req.body.last_name,
    // hashed_password: 'poop' //test with poop but then implement hashing
    // number_beers: req.body.number_beers, //beers
    // location_name: req.body.location_name //locations
  // }
  knex('locations')
  .select('id')
  .where('location_name', req.body.location_name)
  .then(locationId => {
    console.log(locationId);
    knex('users')
    .select('id')
    .where('first_name', req.body.first_name)
    .then(userId => {
      console.log(userId);
      knex('beers')
      .returning('*')
      .insert({
        user_id: userId[0].id,
        location_id: locationId[0].id,
        number_beers: req.body.number_beers,
        friend_name: req.body.friend_name
      })
      .then(beersObj => {
        // res.json(beersObj[0])
        console.log(beersObj);
      })
      console.log(userId);
    })
    // .insert(newBeersObj)
    // res.json(newBeersObj);
  })
  .catch((error) => {
    console.log(error, 'NEW CHEERS ERROR');
  })
  // console.log(newBeersObj);
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
  // console.log(id);
  res.sendStatus(200);
});

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  let body = req.body;
  // console.log(id);
  res.sendStatus(200);
});

router.get('/:id', (req, res, next) => {
  knex('users')
  .where('users.id', req.params.id)
  .join('beers', 'users.id', '=', 'beers.user_id')
  .join('locations', 'beers.location_id', '=', 'locations.id')
  .select('user_id', 'first_name', 'last_name', 'number_beers', 'location_name')
  .then((beers) => {
    console.log('HERE', beers);
    return res.send(beers);
  });
});

module.exports = router;
