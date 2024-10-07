const express = require('express');
const app = express();


app.get('/', (req, res) => {
  res.send('Hello World! from test server');
});

app.get('/publishers', (req, res) => {
  res.send('Hello World! from test server');
});



app.listen(4000, ()=>{
  console.log('listening on 4000');
});
