const express = require('express');
const app = express();
const userRouter = require('./routes/user.route');
const errorHandler = require('./middleware/error_handler.middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const productRouter = require('./routes/product.route');
const categoryRouter = require('./routes/category.route');
app.use(express.json());

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))
app.use("/api/v1/user",userRouter);
app.use("/api/v1/product",productRouter);
app.use("/api/v1/category",categoryRouter);



app.use(errorHandler);

module.exports = app;