const express = require('express');
const cors = require('cors');

const app = express();
const frontend = require('./static/assets/json/frontend.json');
const backend = require('./static/assets/json/backend.json');
/* const dev = require('./static/assets/json/devops.json'); */

app.use(cors());
app.use(express.static('static'));


app.get('/api/v1/frontend', (req, res) => {
  res.json(frontend);
});
app.get('/api/v1/backend', (req, res) => {
  res.json(backend);
});
/* app.get('/api/v1/dev', (req, res) => {
  res.json(dev);
}); */

app.listen(3005, () => {
  console.log('>>> START', new Date());
});
