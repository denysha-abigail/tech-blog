const express = require('express');
// the router instance in routes/index.js collected everything and packaged them up for server.js to use
const routes = require('./controllers');
// importing connection to sequelize
const sequelize = require('./config/connection');
// allows stylesheet to be made available to the client
const path = require('path');
// sets up handlebars.js as app's template engine of choice
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// express.static() is a built-in Express.js middleware function that can take all of the contents of a folder and serve them as static assets 
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});