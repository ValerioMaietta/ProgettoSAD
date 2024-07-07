import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userRoutes from './routes/user.routes.js';

import connectToMongoDB from './db/connectToMongoDB.js';

dotenv.config();

const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json()); //per fare il parsing tra le richieste che arrivano con il payload JSON (da req.body nel controller)

//app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

/*const cors = require('cors');
app.use(
  cors({
    origin: 'https://progettosad-ughz.onrender.com',
  })
);*/

app.use(cookieParser());

app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, '..', '..', '/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(
    path.join(__dirname, '..', '..', 'frontend', 'dist', 'index.html')
  );
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
