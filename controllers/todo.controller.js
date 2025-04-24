//import the model
const Todo = require('../models/todo.model');

//create route handler
exports.createTodo = async(req, res) => {
    try{
        //extract title and description from request body
        const {title, description} = req.body;

        //create new todo object and insert into DB
        const response = await Todo.create({title, description});

        //send a json response with a success flag
        res.status(200).json(
            {
                success: true,
                data: response, 
                message:'Entry created successfully'
            }
        );
    }
    catch(error){
        console.error(err);
        console.log(error);
        res.status(500).json(
            {
                success: false,
                data:'internal server error',
                message: err.message,
            }
        )
    }
}


//get route handler

exports.getTodo = async(req, res) => {
    try{
        //fetch all todo items from database because the request is og get type
        const response = await Todo.find({});

        //response
        res.status(200).json({
            success: true,
            data: response,
            message:"Entire data is fetched"
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Internal server error"
        })
    }
}

exports.getTodoById = async(req, res) => {
    try{
        //fetch id from request parameters
        const id = req.params.id;
        const getTodo = await Todo.findById({_id: id});

        if(!getTodo){
            return res.status(404).json({
                success: false,
                message: "No entry with this id is found"
            })
        }
        //return success message
        res.status(200).json({
            success: true,
            data: getTodo,
            message: "Entry fetched successfully"
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: "internal server error"
        })
    }
}

//update route handler

exports.updateTodoById = async(req, res) => {
    try{
        const id = req.params.id;
        const {title, description} = req.body;

        const updateTodo = await Todo.findByIdAndUpdate(
            {_id: id},
            {title, description, updatedAt: Date.now()}
        )

        if(!updateTodo){
            return res.status(404).json({
                success: false,
                message: "No data entry found with this id"
            })
        }

        res.status(200).json({
            success: true,
            message: "Data Updated Successfully",
            data: updateTodo,
        })
    }
    catch(error){
        console.log(error);
        console.error(error);
        res.status(500).json({
            success: false,
            message: "internal server error",
            data: error,
        })
    }
}

//delete route handler

exports.deleteTodoById = async(req, res) => {
    try{
        const id = req.params.id;

        const deleteTodo = await Todo.findByIdAndDelete({_id: id});

        if(!deleteTodo){
            return res.status(404).json({
                success: false,
                message: `No Data fount with this ${id}`
            })
        }

        res.status(200).json({
            success: true,
            message: "Entry Deleted Successfully",
            Data: deleteTodo
        })
    }
    catch(error){
        console.error(error);
        console.log(error);
        res.status(500).json({
            success: false,
            data: error,
            message: "Internal server error"
        })
    }
}