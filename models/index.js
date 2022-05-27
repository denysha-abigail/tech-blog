const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');
const Comment = require('./Comment');

// associations 

// one-to-many relationships
User.hasMany(Post, {
    // associated key between both tables
    foreignKey: 'user_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

// many-to-one relationships
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

// many-to-many relationships
User.belongsToMany(Post, {
    // instruct application that User and Post models will be connected through the Vote model
    through: Vote,
    // specify that the name of the Vote model will be displayed as voted_posts when queried
    as: 'voted_posts',
    // foreign key constraint; prevents user from voting on one post multiple times
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

module.exports = { User, Post, Vote, Comment };
