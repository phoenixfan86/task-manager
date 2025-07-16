import { Request, Response } from 'express';
import Task from '../models/taskModel';


export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const tasks = await Task.find();
  res.json(tasks);
};

export const getTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, quantity, dueDate, isPriority } = req.body;

    if (!title || title.trim() === '') {
      res.status(400).json({ message: 'Title is required' });
      return;
    }

    console.log('req.body:', req.body);

    const newTask = new Task({
      title,
      description,
      quantity,
      dueDate,
      isPriority,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};