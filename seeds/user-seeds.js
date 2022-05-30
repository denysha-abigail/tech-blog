const { User } = require('../models');

const userData = [
    {
        username: "anaeli.m",
        email: "ana@gmail.com",
        password: "ana123"
    },
    {
        username: "thuy.n",
        email: "thuy@gmail.com",
        password: "thuy123"
    },
    {
        username: "khai.mt",
        email: "khaih@gmail.com",
        password: "khai123"
    },
    {
        username: "amir.h",
        email: "amir@gmail.com",
        password: "amir123"
    },
    {
        username: "denysha.g",
        email: "denysha@gmail.com",
        password: "den123"
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;