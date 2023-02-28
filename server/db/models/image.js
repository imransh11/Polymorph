'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.UserProfile, {
        foreignKey: 'imageableId',
        constraints: false
      });
      Image.belongsTo(models.BlogPost, {
        foreignKey: 'imageableId',
        constraints: false
      });
    }
    getImageable(){
      if(this.imageableType === 'BlogPost') return this.getBlogPost();
      else if(this.imageableType === 'UserProfile') return this.getUserProfile();
      else return Promise.resolve(null);
    }
  };
  Image.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNotEmpty(value){
          if(value === '') throw new Error('URL cannot be empty');
        }
      }
    },
    imageableType: DataTypes.ENUM('BlogPost', 'UserProfile'),
    imageableId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
