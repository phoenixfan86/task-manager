import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://task-manager-v10.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

app.use('/api/tasks', taskRoutes);

export default app;