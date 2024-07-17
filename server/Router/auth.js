const express = require('express');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authanticate = require('../Middleware/authanticate');
const Inquiry = require('../model/inquirySchema');
const User = require('../model/userSchema');

require('../DB/conn');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

//----Home Route------
router.get('/', (req, res) => {
  res.send('hello world from server router');
});

router.get('/register', (req, res) => {
  res.send('hello world from register');
});
router.get('/signin', (req, res) => {
  res.send('hello world from signin');
});
router.get('/signup', (req, res) => {
  res.send('hello world from signin');
});

//----Register Route using async await-------------
router.post('/register', async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: 'Please fill the fields properly' });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(409).json({ message: 'Email already exist' });
    } else if (password != cpassword) {
      return res.status(409).json({ message: 'Passwords do not match' });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });

      await user.save();

      res.status(201).json({ message: 'User registered successfully' });
    }
  } catch (err) {
    console.log(err);
  }
});

//----Login Route------
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ error: 'Please fill the fields properly' });
    }

    const userLogin = await User.findOne({ email: email });
    if (!userLogin) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, userLogin.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect Password' });
    }

    const token = await userLogin.generateAuthToken();
    res.cookie('jwtoken', token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });

    res.json({ message: 'User signed in successfully' });
  } catch (err) {
    console.log(err);
  }
});

//----About Us Route------
router.get('/about', authanticate, (req, res) => {
  console.log('My about page');
  res.send(req.rootUser);
});

//----Logout Route------
router.get('/logout', (req, res) => {
  console.log('My logout page');
  res.clearCookie('jwtoken', { path: '/' });
  res.status(200).send('User logged out');
});

//----Admin Route------
router.get('/admin', async (req, res) => {
  const userData = await User.find({});
  console.log(userData);
  res.status(200).send(userData);
});

// POST route to handle form submission
router.post('/inquiries', upload.single('photo'), async (req, res) => {
  try {
    const { name, contactNo, address, city, pinCode } = req.body;
    const photo = req.file ? req.file.filename : null;

    const newInquiry = new Inquiry({
      name,
      contactNo,
      address,
      city,
      pinCode,
      photo,
    });

    await newInquiry.save();

    res.status(201).json(newInquiry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to store inquiry data' });
  }
});

// GET route to fetch all inquiries
router.get('/inquiries', async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.json(inquiries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
