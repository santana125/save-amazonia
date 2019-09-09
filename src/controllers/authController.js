const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models').User;

module.exports = {
  async login(req, res){
    const {username, password} = req.body;

    if (!username) return res.status(401).json({message: 'Username is missing.'});
    if (!password) return res.status(401).json({message: 'Password is missing.'});
    
    User.findOne({ where: { username }})
      .then(async (user) => {
        if (user){
          const matchPassword = await bcrypt.compare(password, user.password);
          if (matchPassword) {
            const token = jwt.sign({ id: user.id }, "secret", {
					    expiresIn:1000,
				    });
              return res.json({message: `Bearer ${token}`});
          }else{
           return res.status(401).json({message: 'Wrong Password.'});
          }
        }else {
           return res.status(401).json({message: 'User not Found.'});
          }

      })
      .catch(err => {return res.json({message: err})})
  }

}
