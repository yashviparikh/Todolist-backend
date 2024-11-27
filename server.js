const express=require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const mongoose= require('mongoose');
const PORT=process.env.PORT||5000;
const Task= require('./models/Todo');

const app= express();//created instance of the express app
app.use(bodyParser.json()); //converts incomig json payloads into js objects
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/todolist',
{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(()=> console.log('Connected to mongodb'))
.catch((err)=> console.log(err));

app.get('/tasks',async(req,res)=>
{
    try
    {
        const tasks=await Task.find();
        res.json(tasks);
    }
    catch(err)
    {
        res.status(500).json({message:'Error fetching tasks'});
    }
});

app.post('/tasks',async(req,res)=>
{
    try{
        const newTask=new Task(req.body);
        await newTask.save();
        res.status(201).json(newTask);
    }
    catch(err)
    {
        res.status(400).json({message:'Error creating the task'});
    }
});

app.put('/tasks/:id',async (req,res)=>
{
    try{
        const updatedTask=await Task.findByIdAndUpdate(req.params.id,req.bpdy,res.json(updatedTask));
    }
    catch(err)
    {
        res.status(400).json({message:'error updating task'});
    }
});

app.delete('./tasks/:id',async(req,res)=>
{
    try
    {
        await Task.findByIdAndUpdate(req.params.id);
        res.status(204).send();
    }
    catch(err)
    {
        res.status(500).json({message:'error deleting task'});
    }
});

app.listen(PORT,()=>
{
    console.log(`server is running on port ${PORT}`);
});
