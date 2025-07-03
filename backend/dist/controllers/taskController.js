"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTask = exports.getTasks = void 0;
const taskModel_1 = __importDefault(require("../models/taskModel"));
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield taskModel_1.default.find();
    res.json(tasks);
});
exports.getTasks = getTasks;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield taskModel_1.default.findById(req.params.id);
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getTask = getTask;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const newTask = new taskModel_1.default({ title });
    const savedTask = yield newTask.save();
    res.status(201).json(savedTask);
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedTask = yield taskModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.json(updatedTask);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTask = yield taskModel_1.default.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.json({ message: 'Task deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.deleteTask = deleteTask;
