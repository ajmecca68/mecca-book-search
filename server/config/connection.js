const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb:mongodb+srv://amecca1968:Password1234@cluster0.nqnpz74.mongodb.net/googlebooks');

module.exports = mongoose.connection;
