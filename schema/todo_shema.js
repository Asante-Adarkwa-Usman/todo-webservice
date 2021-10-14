import mongoose from "mongoose";
const {Schema, model} = mongoose;

const todoShema = Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    date_time:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        required: true,
        default: false
    },
});

const todoModel = model('todo', todoShema);

export default todoModel;

