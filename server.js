// allows stylesheet to be made available to the client
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
// the router instance in routes/index.js collected everything and packaged them up for server.js to use
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

// importing connection to sequelize
const sequelize = require('./config/connection');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 20 * 60 * 1000,
    expiration: 24 * 60 * 60 * 1000 
  })
};

app.use(session(sess));

const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

// sets up handlebars.js as app's template engine of choice
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// express.static() is a built-in Express.js middleware function that can take all of the contents of a folder and serve them as static assets 
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});