const router = require('express').Router();
const { User, Post } = require('../../models');

// GET /api/users
// select all users from the user table in the database and send it back as JSON when client makes GET request to /api/users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/users/?
// only returns one user based on value of req.params.id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        // equivalent to SQL query --> SELECT * FROM users WHERE id = ?;
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                // if user with nonexistent id value is searched, send back a 404 status code to indicate the wrong piece of data was requested
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST to /api/users
router.post('/', (req, res) => {
    // use sequelize's built-in .create() method to insert data
    // equivalent to SQL query --> INSERT INTO users (username, email, password) VALUES (?, ?, ?);
    User.create({
        // pass in key: value pairs; where keys are what is defined in the User model and values are what is received in req.body from client
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => {
            // req.session.save() method will initiate creation of the session and then run the callback function once complete
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                // boolean describing if user is logged in or not
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
});

// http://localhost:3001/api/users/login
// POST carries request parameter in req.body
// GET carries request parameter appended in URL string
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }

        // if email found in database, verify user's identity by matching user password to the hashed password
        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            // if match returns false value, sned back error message to client
            res.status(400).json({ message: 'Incorrect password!' });
            // exit out of function immediately
            return;
        }

        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            // if match returns true value, ignore conditional statement and send back data with message
            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});

// allow user to logout
// destroy session variables and reset the cookie
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

            // // PUT /api/users/?
            // // update existing data
            // router.put('/:id', withAuth, (req, res) => {
            //     // similar to SQL query --> UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?;
            //     User.update(req.body, {
            //         individualHooks: true,
            //         where: {
            //             id: req.params.id
            //         }
            //     })
            //         .then(dbUserData => {
            //             if (!dbUserData[0]) {
            //                 res.status(404).json({ message: 'No user found with this id' });
            //                 return;
            //             }
            //             res.json(dbUserData);
            //         })
            //         .catch(err => {
            //             console.log(err);
            //             res.status(500).json(err);
            //         });
            // });

            // // DELETE /api/users/?
            // // delete user from database
            // router.delete('/id', withAuth, (req, res) => {
            //     User.destroy({
            //         where: {
            //             id: req.params.id
            //         }
            //     })
            //         .then(dbUserData => {
            //             if (!dbUserData) {
            //                 res.status(404).json({ message: 'No user found with this id' });
            //                 return;
            //             }
            //             res.json(dbUserData)
            //         })
            //         .catch(err => {
            //             console.log(err);
            //             res.status(500).json(err);
            //         });
            // });

module.exports = router;

