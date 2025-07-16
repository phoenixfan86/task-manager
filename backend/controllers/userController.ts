import { Request, Response } from 'express';
import User from '../models/user';

export const loginOrCreateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      res.status(400).json({ message: 'Name and email are required' });
      return;
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('User login/create error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

