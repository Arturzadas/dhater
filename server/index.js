const express = require('express');
const app = express();
const PORT = 3080;
const controller = require('./controller');
const bodyParser = require('body-parser');
const CORS = require('cors');


// app.use(bodyParser.json())
app.use(CORS());

app.use(express.json());



app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.post('/register', controller.register);
app.post('/login', controller.login);
app.put('/updatepic', controller.updatePic);

app.listen(PORT, () => {
  console.log(`server running at  localhost:${PORT} ✔`);
})