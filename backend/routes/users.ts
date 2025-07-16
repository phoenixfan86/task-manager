import express from 'express';
import { loginOrCreateUser, getAllUsers } from '../controllers/userController';

const router = express.Router();

router.get('/', getAllUsers)
router.post('/loginOrCreate', loginOrCreateUser);

export default router;
