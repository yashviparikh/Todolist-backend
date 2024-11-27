const mongoose= require('mongoose');
const taskSchema = new mongoose.Schema(
    {
        text:String,
        quantity:Number,
        checked:Boolean
    }
);

const Task=mongoose.model('Task',taskSchema);
module.exports=Task;