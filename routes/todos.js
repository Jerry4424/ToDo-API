const express = require('express');
const router = express.Router();

//import controller

const todoController = require('../controllers/todo.controller');

//define API routes
router.post("/createTodo", todoController.createTodo);
router.get("/getTodos", todoController.getTodo);
router.get("/getTodosById/:id", todoController.getTodoById);
router.put("/updateTodoById/:id", todoController.updateTodoById);
router.delete("/deleteTodoById/:id", todoController.deleteTodoById);

module.exports = router; 
