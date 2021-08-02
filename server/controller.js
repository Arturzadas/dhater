// hello
const { UsersModel } = require('./models/model');
const { LikesModel } = require('./models/model');
const { ChatModel } = require('./models/model');


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
    const update = await UsersModel.findOneAndUpdate({ _id: user._id }, { imgsrc: user.imgsrc }, { new: true });
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

module.exports.getDislikes = async (req, res) => {
  try {
    const topics = [];
    const dislikes = req.body.dislike;
    if (!dislikes.length) return
    for (let i of dislikes) {
      const oneDislike = await LikesModel.findOne({ _id: i });
      topics.push(oneDislike);
    }
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
    const updateLike = await LikesModel.findOneAndUpdate(
      { _id: dislike.topic._id },
      { $push: { disliked: { id: dislike.user._id } } },
      { new: true }
    );
    const updateUser = await UsersModel.findOneAndUpdate(
      { _id: dislike.user._id },
      { $push: { disliked: { id: dislike.topic._id } } },
      { new: true }
    );
    const response = { user: updateUser, dislike: updateLike };
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
    const updateUser = await UsersModel.findOneAndUpdate(
      { _id: user._id },
      { step: 1 },
      { new: true }
    );
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
  } catch (err) {
    res.status(500);
    console.log('Error at controller:    ', err);
  }
}

module.exports.getPeople = async (req, res) => {
  try {
    const likesArray = req.body;
    // console.log(likesArray, 'REQUEST')
    if (!likesArray.disliked) {
      res.send('nothing')
      return
    }
    const response = await topicFinder(likesArray);
    // console.log(response, 'response!!!!')
    const newPeople = await peopleFinder(response, req.body.id);
    response.users = newPeople;
    res.status(201);
    res.json(response);
  } catch (err) {
    res.status(500);
    console.log('Error at controller:    ', err);
  }
}

module.exports.getAllMatchProfiles = async (req, res) => {
  try {
    const userArray = req.body.matches;
    const id = req.body.user;
    const response = [];
    for (let i = 0; i < userArray.length; i++) {
      const currentUser = await UsersModel.findOne({ _id: userArray[i] });
      response.push(currentUser)
    }
    res.status(201);
    res.json(response);
  } catch (err) {
    res.status(500);
    console.log('Error at controller:    ', err);
  }
}


module.exports.handleLike = async (req, res) => {
  try {
    const request = req.body;
    // console.log(request);
    const checkMatch = await UsersModel.findOne({ _id: request.liked });
    //helper function to loop through likes
    const isMatch = await checkLikeBack(request.user, request.liked);
    //TODO check if previously liked
    const updateUser = await UsersModel.findOneAndUpdate(
      { _id: request.liked },
      { $push: { likedUsers: { id: request.user } } },
      { new: true }
    );
    if (matchBool) {
      res.status(201);
      console.log('ITS A MATCH')
      const addMatchToUser = await UsersModel.findOneAndUpdate(
        { _id: request.user },
        { $push: { matches: newMatchChat } },
        { new: true }
      )
      const addMatchToLiked = await UsersModel.findOneAndUpdate(
        { _id: request.liked },
        { $push: { matches: newMatchChat } },
        { new: true }
      )
      res.json({
        user: updateUser,
        chat: newMatchChat
      });
      return
    }
    res.status(201);
    res.json(false);
  } catch (err) {
    res.status(500);
    console.log('Error at controller: handleLike    ', err);
  }
}

async function checkLikeBack(userId, likedId) {
  const me = await UsersModel.findOne({ _id: userId });
  for (let k of me.likedUsers) {
    if (likedId === k.id) {
      //add match to both users and chats database
      return createMatch(userId, likedId);
    }
  }
  matchBool = false;
}
async function createMatch(userId, likedId) {
  const newChat = await ChatModel.create({
    user1: userId,
    user2: likedId,
    chat: []
  })

  newMatchChat = newChat;
  // console.log(newChat);
  matchBool = true;
}
module.exports.getMatches = async (req, res) => {
  try {
    const userId = req.body.user;
    const matches = await ChatModel.find({ $or: [{ user1: userId }, { user2: userId }] });
    res.json(matches)
  } catch (err) {
    console.log('error at getMatches:        ', err)
  }



  let matchBool = false;

  let newMatchChat;


}
//! helper function for asynchronicity
async function topicFinder(list) {
  const response = { dislikes: [], users: [] };

  for (let el of list.disliked) {
    const like = await LikesModel.find({ _id: el.id });
    response.dislikes.push(like[0]);
  }
  return response;
}

async function peopleFinder(list, blackListID) {
  const users = [];
  // console.log(list, 'list')

  for (let el of list.dislikes) {
    for (let i of el.disliked) {
      const oneuser = await UsersModel.findOne({ _id: i.id })
      // console.log(oneuser, 'oneuser!!!!!!k!!!!!!!!');
      const id = oneuser._id;
      // console.log(id,'id', blackListID.toString(), 'blacklist')
      for (let i = 0; i < users.length; i++) {
        // console.log(users[i]._id.toString(), 'userId')
        if (users[i]._id.toString() === id.toString() || users[i]._id.toString() === blackListID.toString()) { //check later so I don't see myself --> DONE
          // console.log('found duplicate or bug', users[i])
          users.splice(i, 1);
        }
      }
      users.push(oneuser)
    }
  }
  return users;
}

module.exports.postMessage = async (req, res) => {
  try {
    const message = req.body;
    const updateChat = await ChatModel.findOneAndUpdate(
      { _id: message.id },
      {
        $push: {
          chat: {
            content: message.content,
            timestamp: message.timestamp,
            sender: message.sender
          }
        }
      },
      { new: true }
    )
    const newChat = await ChatModel.findOne({ _id: message.id })
    res.json(newChat)
  } catch (err) {
    console.log('error at getMatches:        ', err)
  }
}

module.exports.getChat = async (req, res) => {
  try {
    const id = req.body.id;
    const updatedChat = await ChatModel.findOne({ _id: id });
    res.status(200);
    res.json(updatedChat);
  } catch (err) {
    console.log('error at getChat:   ', err)
  }
}

module.exports.getNewTopics = async (req, res) => {
  try {
    const user = req.body.user;
    console.log(user, 'userID');
    const newTopics = await LikesModel.find();
    let result = [];
    for (let k = 0 ; k < newTopics.length; k ++) {
      let pushable = true;
      for (let i = 0; i < newTopics[k].disliked.length; i++) {
        if (newTopics[k].disliked[i].id === user) {
          pushable = false;
        }
      }
      if (pushable) {
        result.push(newTopics[k]);
      }
    }
    console.log(result, 'result');
    res.json(result);
  } catch (err) {
    console.log('error at getNewTopics, :', err)
  }
}