'use strict';
module.exports = (sequelize, DataTypes) => {
  const song = sequelize.define('song', {
    songName: DataTypes.STRING,
    artistName: DataTypes.STRING,
    year: DataTypes.INTEGER,
    genre: DataTypes.STRING
  }, {});
  song.associate = function(models) {
    // associations can be defined here
  };
  return song;
};