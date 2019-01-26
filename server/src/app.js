/* eslint-disable no-console */

console.log('server started');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const port = 8081;

const app = express()
  .use(morgan('combined'))
  .use(bodyParser.json())
  .use(cors());

app.get('/status', (req, res) => {
  res.send({
    message: 'hello there from DOTA 2 drafter! server is online!',
  });
});

app.post('/register', (req, res) => {
  res.send({
    message: `Hello ${req.body.username}! You have been registered!`,
  });
});

app.listen(process.env.PORT || port);
