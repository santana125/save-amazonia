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
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      default: 0,
    },
    isGood: {
      type: DataTypes.BOOLEAN,
      default: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      default: Date.now
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
    Post.associate = function(models) {
      Post.belongsTo(models.User);
      Post.hasMany(models.Like);
    };
    sequelizePaginate.paginate(Post);
    return Post;
};

