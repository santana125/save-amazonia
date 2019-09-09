'use strict'
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
     type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    lon: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
    Post.associate = function(models) {
      Post.belongsTo(models.User);
      Post.hasMany(models.Like);
    };
    sequelizePaginate.paginate(Post);
    return Post;
};

