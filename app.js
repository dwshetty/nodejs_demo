const watch = require('fs').watch;
const read = require('read-last-lines').read;

const filePath = './text.txt';

read(filePath, 10)
    .then(lines => console.log(lines));

watch(filePath, (event, fileName) => {
  if (fileName && event ==='change') {
    read(filePath, 10)
        .then(lines => console.log(lines));
  } else {
    console.log('Error: Unable to access the file');
  }
});