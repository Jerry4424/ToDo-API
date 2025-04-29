//import the model
const User = require("../models/user.model");
require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const myPlaintextPassword = process.env.myPlaintextPassword || "1234567";
const someOtherPlaintextPassword =
  process.env.someOtherPlaintextPassword || "hdjfjfjfjjf";

//create route handler
exports.createUser = async (req, res) => {
  try {
    //extract firstname, lastname, email, password from request body
    const { firstname, lastname, email, password } = req.body;

    bcrypt.hash(password, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      //create user account
      const response = await User.create({ firstname, lastname, email, hash });
    });

    bcrypt.hash(myPlaintextPassword, saltRounds).then(function (hash) {
      // Store hash in your password DB.

      const response = User.create({ firstname, lastname, email, hash })
        .then((user) => {
          //send a json response with a success flag
          res.status(200).json({
            success: true,
            data: user,
            message: "Entry created successfully",
          });
        })
        .catch((err) => {
          console.error("Error creating user:", err);
          res.status(500).json({
            success: false,
            data: "internal server error",
            message: err.message,
          });
        });
    });
  } catch (error) {
    // console.error(error);
    console.log(error);
    res.status(500).json({
      success: false,
      data: "internal server error",
      message: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    //extract  email, password from request body
    const { email, password } = req.body;

    //fetch users from database by email
    const response = await Todo.findOne({ email: email });

    if (!response) {
      return res.status(200).json({
        success: false,
        message: "Invalid credentials",
      });
    } else {
      //user exists.... verify password credentials

      // Load hash from your password DB.
      bcrypt.compare(password, response.password).then(function (result) {
        // result == true
        if (result) {
          
          const token = jwt.sign(response._id.toString, process.env.JWT_SECRET);


          res.status(200).json({
            success: true,
            data: response,
            message: "Login successful",
          });
        } else {
          return res.status(200).json({
            success: false,
            message: "Invalid credentials",
          });
        }
      });
    }

    //response
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal server error",
    });
  }
};

//get route handler

exports.getTodo = async (req, res) => {
  try {
    //fetch all todo items from database because the request is og get type
    const response = await Todo.find({});

    //response
    res.status(200).json({
      success: true,
      data: response,
      message: "Entire data is fetched",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal server error",
    });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    //fetch id from request parameters
    const id = req.params.id;
    const getTodo = await Todo.findById({ _id: id });

    if (!getTodo) {
      return res.status(404).json({
        success: false,
        message: "No entry with this id is found",
      });
    }
    //return success message
    res.status(200).json({
      success: true,
      data: getTodo,
      message: "Entry fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "internal server error",
    });
  }
};

//update route handler

exports.updateTodoById = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;

    const updateTodo = await Todo.findByIdAndUpdate(
      { _id: id },
      { title, description, updatedAt: Date.now() }
    );

    if (!updateTodo) {
      return res.status(404).json({
        success: false,
        message: "No data entry found with this id",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data Updated Successfully",
      data: updateTodo,
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
      data: error,
    });
  }
};

//delete route handler

exports.deleteTodoById = async (req, res) => {
  try {
    const id = req.params.id;

    const deleteTodo = await Todo.findByIdAndDelete({ _id: id });

    if (!deleteTodo) {
      return res.status(404).json({
        success: false,
        message: `No Data fount with this ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Entry Deleted Successfully",
      Data: deleteTodo,
    });
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).json({
      success: false,
      data: error,
      message: "Internal server error",
    });
  }
};
