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
  imgsrc: String
})

const LikesSchema = new Schema({
  likes: {
    topic: String,
    userEmail: String,
    disliked: Boolean
  }
})

const PicSchema = new Schema({
  uri: String,
  user: String
})

const PicModel = mongoose.model('PicModel', PicSchema);

const LikesModel = mongoose.model('LikesModel', LikesSchema);

const UsersModel = mongoose.model('UsersModel', UsersSchema);

module.exports = UsersModel, LikesModel, PicModel;
