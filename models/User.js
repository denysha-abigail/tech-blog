const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create User model
class User extends Model {
    checkPassword(loginpw) {
        return bcrypt.compareSync(loginpw, this.password)
    }
}

// define table columns and configuration
User.init(
    {
        // define an id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define an email column
        email: {
            type: DataTypes.STRING,
            // avoid accepting null values so that validators can be applied
            allowNull: false,
            // avoid duplicate email values
            unique: true,
            validate: {
                // ensure email data follows the pattern of an email address
                isEmail: true
            }
        },
        // define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // set password to be at least 4 characters long
                len: [4]
            }
        }
    },
    {
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality to execute bcrypt hash function on plaintext password
            async beforeCreate(newUser) {
                // pass in plaintext password and saltRound value of 10 in the newUser object
                newUser.password = await bcrypt.hash(newUser.password, 10);
                return newUser;
            },
            // set up beforeUpdate lifecyle "hook" functionality
            async beforeUpdate(updateUser) {
                updateUser.password = await bcrypt.hash(updateUser.password, 10);
                return updateUser;
            }
        },
        // pass in imported sequelize connection (direct connection to database)
        sequelize,
        // avoid automatically creating createdAt/updatedAt timestamp fields
        timestamps: false,
        // avoid pluralizing name of database table
        freezeTableName: true,
        // use underscores instead of camel-casing
        underscored: true,
        // make it so that model name stays lowercase in the database
        modelName: 'user'
    }
);

// export model for use in other parts of the application
module.exports = User;

