const express = require('express');
const watch = require('fs').watch;
const read = require('read-last-lines').read;

const app = express();
const filePath = './text.txt';

app.get('/:noOfLines?', (request, response) => {
  const {
    params: {
      noOfLines = 10,
    } = {},
  } = request;
  read(filePath, noOfLines)
    .then(lines => { response.send(lines); })
    .catch((error) => { console.log('Error:', error); });
  watch(filePath, (event, filename) => {
    if (filename && event ==='change') {
      read(filePath, noOfLines)
        .then(lines => { response.send(lines); })
        .catch((error) => console.log('Error:', error));
      } else {
      response.send('Error: Unable to access the file');
    }
  });
});

const {
  env: {
    PORT = 5000,
  } = {},
} = process;
app.listen(PORT);