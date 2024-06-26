const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task');
const Status = require('./models/Status');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

const dbUri = process.env.MONGODB_URI;

mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/statuses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Status.findByIdAndDelete(id);
        res.json({ message: 'Status deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Получение всех статусов
app.get('/statuses', async (req, res) => {
    try {
        const statuses = await Status.find();
        res.json(statuses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/statuses', async (req, res) => {
    try {
        const status = new Status(req.body);
        await status.save();
        res.status(201).json(status);
    } catch (error) {
        console.error('Error during POST /statuses:', error);
        res.status(500).json({ error: error.message });
    }
});

app.patch('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
