'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name:{ 
      type: DataTypes.STRING,
      allowNull: false,
    },
    email:{ 
      type: DataTypes.STRING,
      allowNull: false,
    },
    city:{ 
      type: DataTypes.STRING,
      allowNull: false,
    },
    password:{ 
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_pic: { 
      type: DataTypes.STRING,
    },

  }, {});
  User.associate = function(models) {
    User.hasMany(models.Post)
    User.hasMany(models.Like);
  };
  return User;
};
