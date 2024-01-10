const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://amecca1968:Password1234@cluster0.nqnpz74.mongodb.net/mecca-books');

module.exports = mongoose.connection;
