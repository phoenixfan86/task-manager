import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';

const app = express();

app.use(cors({
  origin:'https://task-manager-v10.vercel.app'
}));
app.use(express.json());

app.use('/api/tasks', taskRoutes);

export default app;