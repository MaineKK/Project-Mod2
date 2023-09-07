const express = require ('express');
const logger =require('morgan');
const flash = require('connect-flash');
require("./config/db.config");


const app = express();
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

app.use(express.urlencoded());
app.use(logger('dev'));

const sessionConfig = require('./config/session.config');
app.use(sessionConfig.session);
app.use(sessionConfig.loadSessionUser);
app.use(flash());

app.use((req, res, next) => {
  res.locals.navigationPath = req.path;
  const fashData = req.flash('data');
  console.log(fashData);
  if (fashData?.length > 0) {
    const data = JSON.parse(fashData[0]);
    Object.keys(data)
      .forEach((key) => res.locals[key] = data[key])
  }
  next();
});

const routes = require('./config/routes.config');
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen (PORT, () => console.log(`Aplication running at port${PORT}`));