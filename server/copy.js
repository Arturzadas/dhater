const {UsersModel} = require('./models/model');
const {LikesModel} = require('./models/model');


module.exports.register = async (req, res) => {
  try {
    //TODO check if user already exists!
    //TODO use bcrypt!
    //TODO sessions!
    //TODO sanitize data before input into database!
    const reqUser = req.body;
    // console.log(reqUser);
    const newUser = await UsersModel.create(reqUser);
    // console.log(newUser)
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
      // console.log(verify, 'verify', loginInfo, 'loginInfo');
      res.status(201)
      res.json(verify);
    } else {
      res.status(500);
      // console.log('wrong credentials');
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
    // console.log('user-------------', user);
    // console.log('update-------------------', update);
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
    // console.log(topics);
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
    // console.log(response);
    res.json(response);
  } catch (err) {
    res.status(500)
    console.log('Error at controller:    ', err)
  }
}

module.exports.updateSteps = async (req, res) => {
  try {
    const user = req.body
    const updateUser = await UsersModel.findByIdAndUpdate({_id: user._id}, {step: 1}, {new: true});
    res.status(200);
    // console.log(updateUser);
    res.json(updateUser);
  } catch (err) {
    res.status(500)
    console.log('Error at controller:    ', err)
  }
}


module.exports.addQuestion = async (req, res) => {
  try {
    const question = await req.body;
    const insert = await LikesModel.create(question);
    res.status(201);
    // console.log(question, 'request');
    // console.log(insert, 'response');
    res.json(insert);
  } catch(err) {
    res.status(500);
    console.log('Error at controller:    ', err);
  }
}

module.exports.getPeople = async (req, res) => {
  try {
    const likesArray = req.body;
    console.log(likesArray, 'REQUEST')
    if (!likesArray.disliked) {
      res.send('nothing')
      return
    }
    const response = await topicFinder(likesArray);
    const newPeople = await peopleFinder(response);
    response.users = newPeople;
    res.status(201);
    res.json(response);
  } catch(err) {
    res.status(500);
    console.log('Error at controller:    ', err);
  }
}

module.exports.handleLike = async (req, res) => {
  try {
    const request = req.body;
    const checkMatch = await UsersModel.findOne({_id: request.liked});
    //helper function to loop through likes
    checkLikeBack(request.user, request.liked);

    const updateUser = await UsersModel.findByIdAndUpdate({_id: request.liked}, {$push : {likedUsers : {id: request.user}}}, {new: true});
    // console.log(updateUser, 'updateuser')
    res.status(201);
    res.json(updateUser);
  } catch(err) {
    res.status(500);
    console.log('Error at controller: handleLike    ', err);
  }
}

async function checkLikeBack (userId, likedId) {
  const me = await UsersModel.findOne({_id: userId});
  for (let k of me.likedUsers) {
    if (likedId === k.id) {
      console.log('MATCH!!!');
    }
  }
}


//! helper function for asynchronicity
async function topicFinder (list) {
  const response = {dislikes: [], users: []};

  for (let el of list.disliked) {
    const like = await LikesModel.find({_id: el.id});
    response.dislikes.push(like[0]);
  }
  return response;
}

async function peopleFinder (list) {
  const users = [];
  // console.log(list, 'list')

    for (let el of list.dislikes) {
      for (let i of el.disliked) {
        const oneuser = await UsersModel.findOne({_id: i.id})
        console.log(oneuser, 'oneuser!!!!!!!!!!!!!!');
        const id = oneuser._id;
        for (let i = 0; i < users.length; i++) {
          if (users[i]._id.toString() === id.toString()) {
            console.log('found duplicate')
            users.splice(i, 1);
          }
        }
        users.push(oneuser)
      }
    }
  return users;
}






const mock = {
  dislikes: [
    //dislikes objects
    //dislikes objects
    //dislikes objects
  ],
  users: [
    //users objects
    //users objects
    //users objects
  ]
}