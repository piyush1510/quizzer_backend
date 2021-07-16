const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  var {
    email,
    password
  } = req.body;
  if (!email || !password) res.sendStatus(404);
  try {
    // finding the user by email
    const user = await User.findOne({
      email
    });
    // if not found throw error to catch and send 404
    if (user == null) res.sendStatus(404);
    // compare hashed password from db and req.body.password
    const match = await bcrypt.compare(password, user.password);
    // if match sign the user object by jwt
    if (match) {
      const token = await jwt.sign({
          name: user.name,
          email: user.email,
          _id: user._id
        },
        process.env.SECRET_KEY
      );
      res.json({
        token
      });
    } else res.sendStatus(404);
  } catch (err) {
    res.sendStatus(404);
  }
};
exports.authenticate = (req, res, next) => {
  // check if the token is in correct format "bearer token"
  const authHeader = req.headers['authorization'];
  if (authHeader == null) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  // decrypting the jwt and attaching it to req object for further functions
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(404);
    req.user = user;
    next();
  });
};
exports.signUp = async (req, res) => {
  var {
    email,
    name,
    password,
    confirmPassword
  } = req.body;

  if (password !== confirmPassword || !email || !name || !password || !confirmPassword) return res.sendStatus(401);
  try {
    const exist = await User.findOne({
      email
    });

    if (exist != null) return res.status(406).json({
      message: 'already exits'
    });

    bcrypt.hash(password, 8, async (err, hash) => {
      if (!err) {
        const newUser = new User({
          email,
          name,
          password: hash,
          createdQuizzes: []
        });
        await newUser.save();
        return res.json(newUser);
      } else {
        res.sendStatus(500);
      }
    });
  } catch (err) {
    console.log(err.message)
    res.sendStatus(406);
  }
}