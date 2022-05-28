// collect packaged group of API endpoints and prefix them with corresponding path

const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

// if request is made to nonexistent endpoint, send 404 error to indicate user request incorrect resource
router.use((req, res) => {
    res.status(400).end();
});

module.exports = router;