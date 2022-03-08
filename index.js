const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//Import Routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

dotenv.config();

//connect to DB
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true }, () => console.log('Connected to db!'));

//MiddleWare
app.use(express.json());
//Route MiddleWares
app.use('/api', authRoutes);
app.use('/api/users', authRoutes);
app.use('/api/post', postRoutes);

app.listen(3000, () => console.log('Server up and running'));
