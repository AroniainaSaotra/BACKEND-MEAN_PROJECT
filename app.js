// app.js

const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
require('./dbConnexion');

const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

const employeRoute = require('./routes/employeRoute');

app.use('/employe',employeRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});