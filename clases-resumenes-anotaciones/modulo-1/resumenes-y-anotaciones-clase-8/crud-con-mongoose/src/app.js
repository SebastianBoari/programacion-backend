import express from 'express';
import studentRouter from './routes/student.router.js';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 8080;

app.listen(port, () => console.log(`Server Up on port: ${port}`));

mongoose.set('strictQuery', false)
try {
    await mongoose.connect('mongodb+srv://sebastianboari:k14t34AswjuUtUso@lsb-db.qyoux2f.mongodb.net/colegio');
  } catch (error) {
    console.log(`${error}`);
  };

app.use('/api/students', studentRouter);