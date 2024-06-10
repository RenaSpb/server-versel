const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    priority: { type: Number, required: true }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
