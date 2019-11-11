const Post = require('../models').Post;
const User = require('../models').User;
const Like = require('../models').Like;


async function checkLiked(userId, postId) {
  return await Like.findOne({ where: {userId, postId} }).then(like => 
    {
      if(like) return true
      else return false
    });
}

module.exports = {
  store(req, res) {
    const {title, body, city} = req.body;
    const userId = req.user_id
    const photo = req.file.url

    Post.create({
      title,
      body,
      photo,
      city,
      userId
    })
      .then(post => 
        { 
          return res.status(200).json({message: `Post: ${post.title} published.`})
        })
        .catch(err => {
          res.status(400).json({message: err})
        });

  },
  async index(req, res) {
    const {city} = req.headers
    let options = {}
    if (city){
      options = {
        page: req.headers.page, // Default 1
        paginate: 10, // Default 25
        order: [['createdAt', 'DESC']],
        where: {city},
      }
    } else {
      options = {
        page: req.headers.page, // Default 1
        paginate: 10, // Default 25
        order: [['createdAt', 'DESC']],
        include: [{model: User, attributes: ['name', 'profile_pic']}]
      }
    }
    
    
    if (req.headers.page <= 0)
      return(res.status(400).json({message: "Page is invalid"}));
    
    const { docs, pages } = await Post.paginate(options);
    
    if (docs.length < 1)
      return(res.status(404).json({message: "Page not Found."}));

    posts= []
    docs.map(doc => {
      const newDoc = doc.toJSON()
      newDoc.liked = "fuck"
      posts.push(newDoc)

    })
    for(i = 0; i<= posts.length-1; i++){
      const liked = await checkLiked(req.user_id, posts[i].id)
      posts[i].liked = liked ? true : false
    }
    return res.json({posts, pages});
  }

};
