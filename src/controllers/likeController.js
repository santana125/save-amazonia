const Like = require('../models').Like;
const Post = require('../models').Post;

async function checkLiked(userId, postId) {
    return await Like.findOne({ where: {userId, postId} }).then(like => 
      {
        if(like) return true
        else return false
      });
  }

module.exports = {
  async store(req, res) {
    const { postId } = req.body
    const userId = req.user_id
    const likecheck = await checkLiked(userId, postId)
    if(!likecheck){
      Like.create({
        postId,
        userId,
      }).then(() => 
          { 
            Post.increment({likes:1}, {where: {id: postId}})
            return res.status(200).json({message: `Post: ${postId} liked by: ${userId}.`})
          })
          .catch(err => {
            return res.status(400).json({message: err})
          });
      
    }else {
      Like.destroy({where: {userId, postId}})
      Post.decrement({likes:1}, {where: {id: postId}})
      return res.status(200).json({message: `Post: ${postId} unliked by: ${userId}.`})
    }

  },
};
