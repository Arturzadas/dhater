
const UsersModel = require('./models/model');
const LikesModel = require('./models/model');


module.exports.register = async (req, res) => {
  try {
    const reqUser = req.body;
    // console.log(reqUser);
    const newUser = await UsersModel.create(reqUser);
    // console.log(newUser)
    res.status(201)
    res.send(newUser);
  } catch (err) {
    res.status(500)
    console.log('Error at postTopic:    ', err)
  }
}

module.exports.login = async (req, res) => {
  try {
    const loginInfo = await req.body;
    const verify = await UsersModel.find(loginInfo);
    if (verify.length) {
      console.log(verify, loginInfo);
      res.status(201)
      res.send(loginInfo);
    } else {
      console.log('wrong credentials');
      res.send('wrong credentials');
    }
  } catch (err) {
    res.status(500)
    console.log('Error at postTopic:    ', err)
  }
}
