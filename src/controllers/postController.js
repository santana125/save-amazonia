const Post = require('../models').Post;

module.exports = {
  store(req, res) {
    const {title, body, photo, lat, lon} = req.body;

    Post.create({
      title,
      body,
      photo,
      lat,
      lon,
      likes:0
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
    const options = {
      page: req.query.page, // Default 1
      paginate: 10, // Default 25
      order: [['createdAt', 'DESC']],
    }
    
    if (req.query.page <= 0)
      return(res.status(400).json({message: "Page is invalid"}));
    
    const { docs, pages } = await Post.paginate(options);
    
    if (docs.length < 1)
      return(res.status(404).json({message: "Page not Found."}));

    return res.json({docs, pages});
  }

};
