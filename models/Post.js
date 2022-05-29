const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Post model
class Post extends Model {}

// define columns and configurations
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [4, 1000]
            }
        },
        // define column that determines who posted
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                // establish foreign key by creating reference to user model (id column -> primary key)
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;