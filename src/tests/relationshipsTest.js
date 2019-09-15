const models = require('../models');
const User = models.User;
const Post = models.Post;
const Like = models.Like;

User.create({
  name: "Gustavo",
  username: "gusup12",
  email: "gustavo@email.com",
  city: "Sorocaba",
  password: "senha"
})
  .then((newUser) => {
    console.log(newUser.dataValues);
  })
  .catch(err => console.log(err));

Post.create({
  title: 'WOW',
  body: 'You will not belive',
  photo: './photos/pic.png', 
  lat: 40.7143528,
  lon: -74.0059731,
  userId:1
})
  .then(newPost => {
    console.log(newPost.dataValues);
  })
  .catch(err => console.log(err));

Like.create({
  userId: 1,
  postId: 1
})
  .then(like => {
    console.log(`User ${like.userId} liked ${like.postId}`)
  })
  .catch()


User.findByPk(1, {
  include:[{
    model: models.Like,
    as: 'Likes',
    atributes: ['id'],
  }],
    where: {id: 1}
  }) 
  .then(user => {
    user.Likes.map(like => {
    console.log(`User ${user.id} liked ${like.postId}`) 
    })
  }
  )
  .catch();
