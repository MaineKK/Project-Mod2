const express = require ('express');
const logger =require('morgan');
require("./config/db.config");


const app = express();
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

app.use(express.urlencoded());
app.use(logger('dev'));

const sessionConfig = require('./config/session.config');
app.use(sessionConfig.session);

const routes = require('./config/routes.config');
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen (PORT, () => console.log(`Aplication running at port${PORT}`));