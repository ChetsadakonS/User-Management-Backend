const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authController = require('./controllers/auth.controller');
const userController = require('./controllers/user.controller');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true               
}));
app.use(express.json());
app.use(cookieParser());

// Auth
app.post('/register', authController.register);
app.post('/login', authController.login);

app.get('/me', authController.authMiddleware, authController.getCurrentUser);
app.get('/users', authController.authMiddleware, userController.getUsers);
app.post('/AddUser/' , authController.authMiddlewareadmin, userController.AddUser);
app.get('/getUsersbyId/:id' , authController.authMiddlewareadmin, userController.getUserById);
app.get('/AllRole' , authController.authMiddlewareadmin, userController.getAllRole);
app.put('/updateUser' , authController.authMiddlewareadmin, userController.updateUser);
app.delete('/deleteUser/:id' ,authController.authMiddlewareadmin, userController.deleteUser);
module.exports = app;
