const express = require('express');
const app = express();
const PORT = 3080;
const controller = require('./controller');
const bodyParser = require('body-parser');
const CORS = require('cors');


// app.use(bodyParser.json())
app.use(CORS());

app.use(express.json());

require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log('addr: ' + add);
})



app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

  //! Routes

app.post('/register', controller.register);
app.post('/login', controller.login);
app.put('/updatepic', controller.updatePic);
app.post('/addquestion', controller.addQuestion); //! to add topics, not needed for full application
app.get('/topics', controller.getTopics);
app.put('/updatelike', controller.updateLikes);
app.put('/updatestep', controller.updateSteps);
app.post('/getpeople', controller.getPeople);
app.post('/sendlike', controller.handleLike);
app.post('/getmatchprofiles', controller.getAllMatchProfiles);
app.post('/getchats', controller.getMatches);
app.post('/postmessage', controller.postMessage);
app.post('/getdislikes', controller.getDislikes);
app.post('/getmatchchat', controller.getChat);
app.post('/getnewtopics', controller.getNewTopics);
app.post('/sendblacklist', controller.handleDislike);




app.listen(PORT, () => {
  console.log(`server running at  localhost:${PORT} ✔`);
})