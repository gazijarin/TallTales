const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../config.env') });

const mongoose = require('mongoose');

const mongoURI = process.env.ATLAS_URI;
// console.log(process.env);
// || 'mongodb://localhost:27017/TallTalesAPI';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully.');
});

module.exports = { mongoose };
