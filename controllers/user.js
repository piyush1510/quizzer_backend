const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = exports.login = async (req, res) => {
    try {
      const user = await User.findOne({email: req.body.email}).exec();
      if (user == null) throw new Error('wrong email id');
  
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        const token = await jwt.sign(
          {name: user.name, email: user.email},
          process.env.SECRET_KEY
        );
        res.json({token});
      } else throw new Error('wrong password');
    } catch (err) {
      res.sendStatus(404);
    }
};
exports.authenticate = (req, res, next) => {
    // check if the token is valid or not
    const authHeader = req.headers['authorization'];
    if (authHeader == null) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(404);
      req.user = user;
      console.log('here');
      next();
    });
  };
exports.signUp =async (req,res)=>{
    var {email,name,password,confirmPassword} = req.body;
    
    if(password!==confirmPassword) return res.sendStatus(401);
    try {
        const exist = await User.findOne({email});
    
        if (exist != null) return res.status(406).json({message:'already exits'});
    
        bcrypt.hash(password, 8, async (err, hash) => {
          if (!err) {
              const newUser = new User({email,name,password:hash,createdQuizzes:[]});
              console.log('here');
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