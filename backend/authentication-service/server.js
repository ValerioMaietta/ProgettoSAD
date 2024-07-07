import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import connectToMongoDB from './db/connectToMongoDB.js';
import cors from 'cors';

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json()); //per fare il parsing tra le richieste che arrivano con il payload JSON (da req.body nel controller)
app.use(cookieParser());

/*const allowedOrigins = ['http://localhost:3000']; // Replace with your frontend's origin

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));*/

/*const cors = require('cors');
app.use(
  cors({
    origin: 'https://progettosad-ughz.onrender.com',
  })
);*/

app.use('/api/auth', authRoutes);

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
