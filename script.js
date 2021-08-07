const http = require('http');
const fs = require('fs') 
const express = require('express')
const url = require('url')
const router = express.Router();

const path = require('path');


const hostname = '127.0.0.1';

  let app = express()


const PORT = process.env.PORT || 9000;

// set the static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('server listening on PORT' + PORT));

app.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);


  
});

