const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

const app = express();

const server = app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

mongoose.connect('mongodb://tran:maianh22@ds119445.mlab.com:19445/angulardyma',
  { keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("ok mongoose !")
    }
  });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app; 