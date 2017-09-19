const express = require("express");
const bodyParser = require('body-parser');
const routes = require('./server/routes');
const app = express();
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const config = require('./config/config.js').getConfig();

app.use(morgan("dev"));

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
//pug needs a basedir or else it won't work
app.locals.basedir = path.join(__dirname, '/views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

app.use((request, response) => {
  response.status(404).send("That page wasn't found");
});

const port = config.server.port || 3000;
app.listen(port, console.log(`I'm listening on port ${port}`));
