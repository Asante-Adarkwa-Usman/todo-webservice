// const  http = require('http');
// import {createServer} from 'http';

// const server = createServer((request, response) => {
// console.log('Server has been created');
// response.end(`${response.method}`);
// });
// server.listen(4000, () => {
// console.log('Server running at http://127.0.0.1:4000/');
// });
import dotenv from 'dotenv';

import express  from "express";
import mongoose  from "mongoose";
import TodoModel from "./schema/todo_shema.js";

dotenv.config();
const app = express();
//middleware
app.use(express.json());
//port
const PORT = 3000;
const db = process.env.DB_URL || process.env.PORT;

//mongodb connection
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDb');
})


//home
app.get('/', (req, res) => {
return res.status(200).json({
    message: 'Welcome to the Todo API'
})
});

//get all todos
app.get('/todos',async(req, res) => {
    const todoModel = await TodoModel.find({});
    if(todoModel){
        return res.status(200).json({
            status: true,
            message: 'Todos fetched successfully',
            data: todoModel,
        })
    }else {
        return res.status(400).json({
            status:false,
            message: 'Unable to fetch all todos'
        })
    }
  
 });

//get one todo
app.get('/todos/:id',async(req, res) => {
    const {id} = req.params;
    const todo = await TodoModel.findById(id);
    if(todo){
        return res.status(200).json({
            status: true,
            message: 'Todo fetched Successfully',
            data: todo,
        })
    }else {
        return res.status(400).json({
            status:false,
            message: 'Unable to fetch todo'
        })
    }
 });

//create todo
app.post('/todo',async(req, res) => {
    const {title, description, date_time} = req.body;
    const todoModel = await TodoModel.create({
        title,
        description,
        date_time,
    });
    if(todoModel){
        return res.status(200).json({
            status: true,
            message: 'Todo Created Successfully',
            data: todoModel,
        })
    }else {
        return res.status(400).json({
            status:false,
            message: 'Unable to create todo'
        })
    }
 });

//Update a todo
app.patch('/todos/:id', async(req, res) => {
  const {id} = req.params;
  const {status} = req.body;
  const todoModel = await TodoModel.updateOne({
      status:status
  }).where({id: id});
    if(todoModel){
        return res.status(200).json({
            status: true,
            message: 'Todo marked as completed',
            data: todoModel,
        })
    }else {
        return res.status(400).json({
            status:false,
            message: 'Unable to update field'
        })
    }
 });

 //Delete a todo
 app.delete('/todos/:id',async(req, res) => {
   const todoModel = await TodoModel.findByIdAndDelete(req.params.id)
    if(todoModel){
        return res.status(200).json({
            status: true,
            message: 'Todo Deleted',
        })
    }else {
        return res.status(400).json({
            status:false,
            message: 'Unable to delete todo'
        })
    }
 });













app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});