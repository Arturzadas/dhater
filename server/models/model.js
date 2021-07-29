const db = require('./db');


//schema
const mongoose = require('mongoose');
const { Schema } = mongoose;


const UsersSchema = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  step: Number
})

const LikesSchema = new Schema({
  likes: {
    topic: String,
    userEmail: String,
    disliked: Boolean
  }
})

const LikesModel = mongoose.model('LikesModel', LikesSchema);

const UsersModel = mongoose.model('UsersModel', UsersSchema);

module.exports = UsersModel, LikesModel;
