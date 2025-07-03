import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  dueDate:{
    type:Date,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  isPriority: { 
    type: Boolean, 
    default: false 
  },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;