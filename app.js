const express = require ('express');
const logger = require ('morgan');

const app = express();
app.set ('view engine, hbs');
app.set ('views', `${__dirname}/views`);

app.use(logger('dev'));

const routes = requiere('../config/routes.config');
app.use('/', routes);

const PORT = porecess.dev.PORT || 3000;
app.listen (PORT, () => console.log(`Aplication running at port${PORT}`));
