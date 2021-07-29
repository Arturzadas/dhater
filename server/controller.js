const {UsersModel} = require('./models/model');
const {LikesModel} = require('./models/model');


module.exports.register = async (req, res) => {
  try {
    //TODO check if user already exists!
    //TODO use bcrypt!
    //TODO sessions!
    //TODO sanitize data before input into database!
    const reqUser = req.body;
    console.log(reqUser);
    const newUser = await UsersModel.create(reqUser);
    console.log(newUser)
    res.status(201)
    res.send(newUser);
  } catch (err) {
    res.status(500)
    console.log('Error at controller:    ', err)
  }
}

module.exports.login = async (req, res) => {
  //TODO sessions!
  //TODO use bcrypt!
  try {
    const loginInfo = await req.body;
    const verify = await UsersModel.find(loginInfo);
    if (verify.length) {
      console.log(verify, 'verify', loginInfo, 'loginInfo');
      res.status(201)
      res.json(verify);
    } else {
      res.status(500);
      console.log('wrong credentials');
      res.send('wrong credentials');
    }
  } catch (err) {
    res.status(500)
    console.log('Error at controller:    ', err)
  }
}

module.exports.updatePic = async (req, res) => {
  try {
    const user = await req.body;
    const update = await UsersModel.findOneAndUpdate({_id: user._id}, {imgsrc: user.imgsrc}, {new: true});
    console.log('user-------------', user);
    console.log('update-------------------', update);
    res.status(201);
    res.json(update);
  } catch (err) {
    res.status(500)
    console.log('Error at controller:    ', err)
  }
}


module.exports.getTopics = async (req, res) => {
  try {
    const topics = await LikesModel.find();
    res.status(200);
    console.log(topics);
    res.json(topics);
  } catch (err) {
    res.status(500)
    console.log('Error at controller:    ', err)
  }
}


module.exports.updateLikes = async (req, res) => {
  try {
    const dislike = req.body
    const updateLike = await LikesModel.findByIdAndUpdate({_id: dislike.topic._id}, {$push : { disliked: {id :dislike.user._id}}}, {new: true});
    const updateUser = await UsersModel.findByIdAndUpdate({_id: dislike.user._id}, {$push : {disliked: {id: dislike.topic._id}}}, {new: true});
    const response = {user: updateUser, dislike: updateLike};
    res.status(200);
    console.log(response);
    res.json(response);
  } catch (err) {
    res.status(500)
    console.log('Error at controller:    ', err)
  }
}

// module.exports.addQuestion = async (req, res) => {
//   try {
//     const question = await req.body;
//     const insert = await LikesModel.create(question);
//     res.status(201);
//     console.log(question, 'request');
//     console.log(insert, 'response');
//     res.json(insert);
//   } catch(err) {
//     res.status(500);
//     console.log('Error at controller:    ', err);
//   }
// }