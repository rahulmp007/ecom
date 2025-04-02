const express = require('express');
const app = express();
const userRouter = require('./routes/user.route');
const errorHandler = require('./middleware/error_handler.middleware');


app.use(express.json());


app.use("/api/v1/user",userRouter);


app.use(errorHandler);

module.exports = app;