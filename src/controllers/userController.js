const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models').User;


module.exports = {
  async store(req, res){
    const {username, name, email, city, password, password2} = req.body;
    //Verificando se dados basicos foram preenchidos
    if(!username)
      return res.status(400).json({message: "Username is missing."});
    if(!name)
      return res.status(400).json({message: "Name is missing."});
    if(!email)
      return res.status(400).json({message: "Email is missing."});
    if(!city)
      return res.status(400).json({message: "City is missing."});
    if(!password)
      return res.status(400).json({message: "Password is missing."});
    if(password != password2)
      return res.status(400).json({message: "Passwords do not match."});

    //Verificando email no banco.
    try{
      var userVerify = await User.findOne({where: {email}});
    }catch(err){
      return res.status(500).json({error: "Cannot reach DataBase."});
    }
    if (userVerify)
      return res.status(400).json({message: "Email is in use."});
    userVerify = null;
    //Verificando username no banco.
    userVerify = await User.findOne({where: {username}});
    if (userVerify)
      return res.status(400).json({message: "Username is in use."});
    const newUser = new User({username, name, email, city, profile_pic, password});

    bcrypt.hash(password, 10, async function(err, hash) {
      newUser.password = hash;
      await newUser.save()
        .then(() => {
            const token = jwt.sign({ id: newUser.id }, "secret", {
					    expiresIn:1000,
            });
              return res.json({message: `Bearer ${token}`});
        })
        .catch(err => {return res.status(400).json({error: "Error while trying to register user."})});
    });

  },
  async changeProfilePic(req, res) {
    const storage = multer.diskStorage({
      destination: '../public/profile_pic',
    })
    console.log(req.file);
    return res.status(200).json({message: "Amazing"});
  }

}
