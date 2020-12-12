var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var crypto = require('crypto');

var User = require('../models/user');
var passport = require('passport');
var Token = require('../models/token');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/confirmation', (req, res, next) => {
  confirmationPost(req, res, next);
});

router.post('/signup', (req, res, next) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(501).json({message: 'Email Alresdy Exists!!!'});
    } else {
      addToDB(req, res); 
      
        // Create a verification token for this user
       var token = new Token({email: req.body.email, token: crypto.randomBytes(16).toString('hex') });

        // Save the verification token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }

            // Send the email
            var transporter = nodemailer.createTransport({ service: 'Gmail', auth: { user: 'riturajchoi@gmail.com', pass: 'Ritu@Choi' } });
            var mailOptions = { from: 'no-reply@yourwebapplication.com', to: req.body.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/127.0.0.1:4200' + '\/confirmation\/' + token.token + '\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send('A verification email has been sent to ' + user.email + '.');
            });
      return;
    });
  }});
});

async function addToDB(req, res) {
  var user = new User({
    photo: req.body.photo,
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now()
  });
  try {
    doc = await user.save();
    return res.status(201).json(doc);
  }
  catch(err) {
    return res.status(501).json(err);
  }
}
 
async function confirmationPost(req, res, next) {
 // Find a matching token
  Token.findOne({ token: req.body.token }, function (err, token) {
      if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' + req.body.token });
      // If we found a token, find a matching user
      User.findOne({email: req.body.email }, function (err, user) {
          if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' + req.body.email});
          if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

          // Verify and save the user
          user.isVerified = true;
          user.save(function (err) {
              if (err) { return res.status(500).send({ msg: err.message }); }
              res.status(200).send("The account has been verified. Please log in.");
          });
      });
  });
};


router.post('/login', (req, res, next) => {
     User.findOne({ email: req.body.email }).then(user => {
            // Make sure the user has been verified
            if (user.isVerified) {
              passport.authenticate('local', function(err, user, info) {
                if (err) { return res.status(501).json(err); }
                if (!user) { return res.status(501).json(info); }
                req.logIn(user, function(err) {
                  if (err) { return res.status(501).json(err); }
                  return res.status(201).json({message: 'Login Success!!!'});
                });
              })(req, res, next);
            }; 
 
        });
    });

router.get('/user', isValidUser, (req, res, next) => {
  return res.status(201).json(req.user);
});

router.get('/logout', isValidUser, (req, res, next) => {
  req.logOut();
  return res.status(201).json({message: 'Logout Successfully!!!'});
})

function isValidUser(req, res, next) {
  if(req.isAuthenticated()) next();
  else return res.status(401).json({message: 'Unauthorized Request!!!'});
};

module.exports = router;
