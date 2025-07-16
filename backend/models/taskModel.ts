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
  quantity:{
    type: Number,
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
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;