const express = require('express');
const cors = require('cors');

const app = express();
const frontend = require('./static/assets/json/frontend.json');

app.use(cors());
app.use(express.static('static'));


app.get('/api/v1/frontend', (req, res) => {
  res.json(frontend);
});

app.listen(3005, () => {
  console.log('>>> START', new Date());
});
