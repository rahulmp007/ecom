const express = require("express");

const productRouter = express.Router();

productRouter.route("/").get().post();
productRouter.route("/:productId").get().put().delete();
