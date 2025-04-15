const express = require("express");

const userRouter = express.Router();

const userController = require("../controller/user.controller");
const authenticateUser = require("../middleware/authenticate_user");
const authorizeRoles = require("../middleware/authorize_roles");
const validate = require("../middleware/validate");
const { createUserSchema } = require("../utils/validation_schema");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *   put:
 *     summary: Update the logged-in user's info
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *   delete:
 *     summary: Delete all users (Admin only)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All users deleted
 */

/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details fetched
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login with token
 */

userRouter
  .route("/")
  .get(authenticateUser, authorizeRoles(["admin"]), userController.getAllUsers)
  .post(validate(createUserSchema), userController.createUser)
  .put(authenticateUser, userController.updateUser)
  .delete(authenticateUser, userController.deleteAllUsers);

userRouter
  .route("/:userId")
  .get(
    authenticateUser,
    authorizeRoles(["admin", "user"]),
    userController.getUserById
  );
userRouter.route("/login").post(userController.login);

module.exports = userRouter;
