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
 * components:
 *   schemas:
 *     Borrow:
 *       type: object
 *       required:
 *         - memberCode
 *         - bookCode
 *         - entryDate
 *       properties:
 *         memberCode:
 *           type: string
 *           description: Member code who borrow a book
 *         bookCode:
 *           type: string
 *           description: Book code that borrowed by member
 *         entryDate:
 *           type: string
 *           description: Date member start borrowing
 *         returnDate:
 *           type: string
 *           description: Date member must return the book
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Return:
 *       type: object
 *       required:
 *         - memberCode
 *         - bookCode
 *         - returnDate
 *         - returnedDate
 *         - status
 *       properties:
 *         memberCode:
 *           type: string
 *           description: Member code who return a book
 *         bookCode:
 *           type: string
 *           description: Book code that returned by member
 *         returnDate:
 *           type: string
 *           description: Date member must retruning the book
 *         returnedDate:
 *           type: string
 *           description: Date member returning the book
 *         status:
 *           type: string
 *           description: Member status that currently being penalty
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
 *   /countBook:
 *   get:
 *     summary: Count a books being borrowed by each member
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The number of books being borrowed by each member
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
 *    summary: Entry a new returned book
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
