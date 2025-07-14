import express from 'express';
import { loginOrCreateUser } from '../controllers/userController';

const router = express.Router();

router.post('/loginOrCreate', loginOrCreateUser);

export default router;
