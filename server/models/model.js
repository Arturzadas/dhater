const db = require('./db');


//schema
const mongoose = require('mongoose');
const { Schema } = mongoose;


const UsersSchema = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  step: Number,
  imgsrc: String,
  disliked: [{id: String}]
})

const LikesSchema = new Schema({
  topic: String,
  imgsrc: String,
  //! disliked is an array of all user id's of people who have disliked this topic
  disliked: [{id: String}]
})


const LikesModel = mongoose.model('LikesModel', LikesSchema);

const UsersModel = mongoose.model('UsersModel', UsersSchema);

module.exports = {UsersModel:UsersModel, LikesModel:LikesModel};
