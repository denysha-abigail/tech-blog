const { Post } = require('../models');

const postData = [
    {
        title: "AI is making headlines!",
        post_content: "Forbes recently published an article stating that extraordinary AI applications will soon be developed and built using drag-and-drop graphical interfaces!",
        user_id: 2
    },
    {
        title: "3D Rocket Printer!?",
        post_content: "Elon Musk recently announced that SpaceX completed its first 3D printed Spacecraft!",
        user_id: 1
    },
    {
        title: "Smart Home Update!",
        post_content: "According to NY Times, Apple, Samsung, Google, and Amazon are all planning to release and update their home technologies to work with a new standard that allows smart home devices to communicate with one another regardless of the virtual assistant or phone brand you may own!",
        user_id: 5

    },
    {
        title: "Emerging Technologies!",
        post_content: "Self-fertilizing crops are a thing! While some plants already produce their own nitrogen, others like corn and cereals do not; it is for this reason that scientists are working hard to figure out a way to get these crops to self-fertilize!",
        user_id: 4
    },
    {
        title: "VR creating job opportunities!",
        post_content: "The new VR technology trend is welcoming more professionals as it only requires basic programming skills and a growth mindset!",
        user_id: 3
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;