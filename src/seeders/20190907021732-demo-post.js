'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Posts', [{
        title: 'WOW',
        body: 'You will not belive',
        photo: './photos/pic.png', 
        likes: 3,
        lat: 40.7143528,
        lon: -74.0059731,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Posts', null, {});
  }
};
