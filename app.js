require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(
process.env.MONGO_URL
, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify:true,
  dbName:process.env.DB_NAME
});
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.error("database connected"));

const app = express();
app.use(require('morgan')('dev'));
app.use(express.json());

app.use('/user',require('./routes/user'))
// app.use('/admin',require('./routes/admin'))

app.use('/quiz',require('./routes/quiz'))

//errors
app.use((err, req, res, next) => {
    res.status(500).send('500 - Something was error!');
});
app.use((req, res, next) => {
    res.status(404).send('404 - Not Found!');
});

const port = process.env.PORT | 5000
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});