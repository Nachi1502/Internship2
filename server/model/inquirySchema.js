const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  pinCode: {
    type: String,
    required: true
  },
  photo: {
    type: String, // Store the path to the photo
    required: true
  }
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;
