import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import messageRoutes from './routes/message.routes.js';

import connectToMongoDB from './db/connectToMongoDB.js';
import { app, server } from './socket/socket.js';

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //per fare il parsing tra le richieste che arrivano con il payload JSON (da req.body nel controller)
/*app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);*/

app.use(cors());

app.use(cookieParser());

app.use('/api/messages', messageRoutes);

app.use(express.static(path.join(__dirname, '..', '..', '/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(
    path.join(__dirname, '..', '..', 'frontend', 'dist', 'index.html')
  );
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
