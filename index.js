require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const MemberModel = require('./models/Member');
const BookModel = require('./models/Book');
const BorrowModel = require('./models/Borrow');
const ReturnModel = require('./models/Return');
const swaggerJSDoc = require("swagger-jsdoc");

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT;

let books = [];
let members = [];
let borrowedBooks = [];
let penalties = [];

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
          title: 'Eigen Test',
          version: '1.0.0',
          description: 'API documentation'
        },
        servers: [
          {
            url: `http://localhost:${PORT}`
          }
        ]
      },
      apis: ['./routes/*.js']
}
const swaggerDocument = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

mongoose.connect(process.env.DB_URL)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// app.get('/', async(req, res) => {
//     res.send("Hello there !")
// })

app.get('/members', async (req, res) => {
    try {
      const members = await MemberModel.find();
      res.json(members);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

app.post('/addMember', async(req, res) => {
    MemberModel.create(req.body)
    .then(member => res.json(member))
    .catch(err => res.json(err.message))
})

// app.post('/addMember', async (req, res) => {
//     console.log(req.body);
//     const member = new MemberModel(req.body);
//     try {
//         const newMember = await member.save();
//         res.status(201).json(newMember);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

app.get('/books', async (req, res) => {
    try {
      const books = await BookModel.find();
      res.json(books);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

app.post('/addBook', async(req, res) => {
    BookModel.create(req.body)
    .then(book => res.json(book))
    .catch(err => res.json(err.message))
})

// app.post('/addBook', async (req, res) => {
//     console.log(req.body);
//     const book = new BookModel(req.body);
//     try {
//         const newBook = await book.save();
//         res.status(201).json(newBook);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

app.get('/getname', async(req, res) =>{
    // try{
    //   const members = await MemberModel.find({code: {$eq: req.body.code}})
    //   members.map(member => member.name)
    //   res.json(members);
    //   // console.log(res.json(members))
    // }
    // catch(err){
    //     console.log(err.message);
    // }
    
    try{
      const query = await MemberModel.find({code: {$eq: req.body.code}}).select('name -_id');
      res.json(query);
    }
    catch(err){
      console.log(err.message);
    }
})

app.post('/borrow', async(req, res) => {
    
    const { memberCode, bookCode} = req.body;
    const member = await MemberModel.findOne({ code: memberCode });
    const book = await BookModel.findOne({ code: bookCode });

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
  
    if(!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const borrowedByMember = await BorrowModel.countDocuments({memberCode: memberCode});
    if (borrowedByMember >= 2) {
      return res.status(400).json({ message: 'Member cannot borrow more than 2 books' });
    }

    // const penalty = await ReturnModel.find({ memberCode: memberCode, status: "banned" });
    // if (penalty){
    //   return res.status(400).json({ message: 'Member is banned, available to borrow after 3 days' });
    // }


    // const allowed = await ReturnModel.find({ memberCode: memberCode, status: "banned" });

    if(book.stock <= 0){
      return res.status(400).json({ message: 'Book out of stock' });
    }

      try{
        const borrow = BorrowModel.create(req.body);
        const updatedBook = await BookModel.findOneAndUpdate(
          {code: req.body.bookCode}, 
          {$inc: {stock: -1}},
          {new: true, useFindAndModify: false }
        );
  
        if (!updatedBook) {
          return res.status(404).send({ message: 'Book not found' });
        }
  
        // Send the updated book information as a response
        res.status(200).send(updatedBook);
  
        // borrowedBooks.push({ memberCode, bookCode });
        res.json({ message: 'Book borrowed successfully' }, borrow)
        // res.json({ message: 'Book borrowed successfully' });
        
      }
      catch (err){
        console.log(err.message);
      }

  });


  app.post('/count', async (req, res) => {
    const { memberCode, bookCode } = req.body;

    try {
      // const member = await MemberModel.findOne({ code: memberCode });
      // const book = await BookModel.findOne({ code: bookCode });

      const borrowedByMember = await BorrowModel.countDocuments({memberCode: memberCode});
      // res.json(borrowedByMember);
  
      if (borrowedByMember >= 2) {
        res.status(200).json({ message: 'Member cannot borrow more than 2 books' });
      }

    }
    catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }

  });
  app.get('/date', async (req, res) => {
    const { memberCode } = req.body;

    const penalty = await ReturnModel.find({memberCode: memberCode});
    const returnedDates = penalty.map(record => record.returnedDate)
    const dates = returnedDates;
    // console.log(dates)
    // return res.json(dates)

    // const returnedDate = penalty.returnedDate;

    const allowdate = new Date(dates);
    allowdate.setDate(allowdate.getDate() + 3);
    // console.log(allowdate)
    // return res.json(allowdate)

    const d1 = new Date(dates)
    const d2 = new Date(allowdate)

    // const diff = penalty.returnedDate.setDate(getDate() + 3) 
    
    if (d1 > d2){
      // return res.json({ message: 'Member can borrow' });
      
    }

  })

  app.post('/api/borrow', async (req, res) => {
    const { memberCode, bookCode } = req.body;
  
    try {
      const member = await MemberModel.findOne({ code: memberCode });
      const book = await BookModel.findOne({ code: bookCode });
  
      if (!member) {
        return res.status(404).json({ message: 'Member not found' });
      }
  
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      const borrowedByMember = BorrowModel.count({memberCode: memberCode});
  
      if (borrowedByMember.length >= 2) {
        return res.status(400).json({ message: 'Member cannot borrow more than 2 books' });
      }
  
      const isBookBorrowed = BorrowModel.some({bookCode: bookCode});
  
      if (isBookBorrowed) {
        return res.status(400).json({ message: 'Book is already borrowed by another member' });
      }
  
      const isPenalized = penalties.some(p => p.memberCode === memberCode);
  
      if (isPenalized) {
        return res.status(400).json({ message: 'Member is currently penalized' });
      }
  
      if (book.stock <= 0) {
        return res.status(400).json({ message: 'No stock available for this book' });
      }
  
      book.stock -= 1;
      await book.save();
      borrowedBooks.push({ memberCode, bookCode });
  
      res.json({ message: 'Book borrowed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });

app.post('/return', async(req, res) => {

  const { memberCode, bookCode } = req.body;

  const member = await BorrowModel.find({code: memberCode});
  const book = await BorrowModel.find({code: bookCode});
    
  if (!member) {
    return res.status(404).json({ message: 'Member not found' });
  }

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  try{
    let penalty;
    if(member.returnDate > Date()){
      return res.json({message: "banned"});
      penalty = "banned";
    }

    else{
      penalty = "";
    }
    
    const returning = ReturnModel.create({
      memberCode: req.body.memberCode,
      bookCode: req.body.bookCode,
      // returnDate: returnDate,
      returnedDate: Date(),
      status: penalty
    });

    const updatedBook = await BookModel.findOneAndUpdate(
      {code: req.body.bookCode}, 
      {$inc: {stock: +1}},
    );

    if (!updatedBook) {
      return res.status(404).send({ message: 'Book not found' });
    }

    // Send the updated book information as a response
    res.status(200).send(updatedBook);

    // borrowedBooks.push({ memberCode, bookCode });
    res.json(returning)
    res.json({ message: 'Book rerturned' });
    
  }
  catch (err){
    console.log(err.message);
  }
  
})
  
app.listen(process.env.PORT, () =>{
    console.log("Server is established");
})