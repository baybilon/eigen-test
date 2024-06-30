const express = require('express');
const router = express.Router();
const BookModel = require('../models/Book');

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - code
 *         - title
 *         - author
 *         - stock
 *       properties:
 *         code:
 *           type: string
 *           description: The code of the bok
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         stock:
 *           type: string
 *           description: Stock of the book that can be borrowed
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book managing API
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

/**
 * @swagger
 *   /addBook:
 *   post:
 *     summary: Entry a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The added book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * tags:
 *   name: Borrowing
 *   description: Managing borrowed book API
 */

/**
 * @swagger
 * /borrow:
 *  post:
 *    summary: Entry a new borrowed book
 *    tags: [Borrowing]
 *    description: Borrow a book
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - memberCode
 *              - bookCode
 *            properties:
 *              memberCode:
 *                type: string
 *              bookCode:
 *                type: string
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

/**
 * @swagger
 * tags:
 *   name: Returning
 *   description: Managing returned book API
 */


/**
 * @swagger
 * /return:
 *  post:
 *    summary: Entry a new borrowed book
 *    tags: [Returning]
 *    description: Borrow a book
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - memberCode
 *              - bookCode
 *            properties:
 *              memberCode:
 *                type: string
 *              bookCode:
 *                type: string
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

module.exports = router;
