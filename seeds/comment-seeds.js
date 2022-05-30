
const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 1,
        comment_text: "Very interesting! I'm definitely going to read more up on this!"
    },
    {
        user_id: 4,
        post_id: 2,
        comment_text: "Let's gooo!"
    },
    {
        user_id: 2,
        post_id: 3,
        comment_text: "Yes! I can't wait!"
    },
    {
        user_id: 3,
        post_id: 4,
        comment_text: "👀👀👀"
    },
    {
        user_id: 5,
        post_id: 5,
        comment_text: "This is groundbreaking!"
    },
    {
        user_id: 2,
        post_id: 2,
        comment_text: "OMGGG!"
    },
    {
        user_id: 5,
        post_id: 3,
        comment_text: "Finally!"
    },
    {
        user_id: 3,
        post_id: 2,
        comment_text: "🚀🖨️!"
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;