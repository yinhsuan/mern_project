import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/posts', postRoutes); // http://localhost:7777 => http://localhost:7777/posts
app.use('/user', userRoutes);

// https://www.mongodb.com/cloud/atlas
// const CONNECTION_URL = "mongodb+srv://sandy:0123@cluster0.s6fz0.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 7777;

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error));

// mongoose.set('useFindAndModify', false);