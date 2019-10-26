if (process.env.NODE_ENV == 'development')
  require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
console.log(process.env);

const db = require('./config/database');


db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(cors());
app.use(express.json());
app.use(express.static('../public'));
app.use(postRoutes)
app.use(authRoutes)
app.use(userRoutes)

app.get('/', (req, res) => res.json({message: "OK"}));

app.listen(PORT, console.log(`Server running on ${PORT}`));
