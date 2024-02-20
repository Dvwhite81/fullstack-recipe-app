require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');

const app = express();

const urlEncodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlEncodedParser);
app.use(cors());

const dbURI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

mongoose.connect(dbURI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server live on port ${PORT}`));
  })
  .catch((err) => console.log(`Error connecting: ${err}`));

app.use('/', authRouter);
app.use('/users', userRouter);
