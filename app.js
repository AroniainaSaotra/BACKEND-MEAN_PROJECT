// app.js

const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
require('./dbConnexion');

const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

const employeRoute = require('./routes/backOffice/employeRoute');
const managerRoute = require('./routes/backOffice/managerRoute');

app.use('/employe',employeRoute);
app.use('/manager',managerRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});