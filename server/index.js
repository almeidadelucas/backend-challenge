const express = require('express');
const bodyParser = require('body-parser');
const routers = require('./src/routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routers);

const server = app.listen(3000, () => console.log('Server listening on port 3000!'));

module.exports = {
  app,
  server,
};
