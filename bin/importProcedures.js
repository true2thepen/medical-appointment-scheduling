#!/usr/bin/env node

const parse = require('csv-parse');
const program = require('commander');
const request = require('request');
const fs = require('fs');

program
  .version('0.1.0')
  .usage('[options] <file ...>')
  .parse(process.argv);

for (var i = 0; i < program.args.length; i++) {
  fs.createReadStream(program.args[i])
    .pipe(parse())
    .on('data', function(csvrow) {
      request({
        url: 'http://localhost:3000/api/examinations',
        method: "POST",
        json: {
          name: csvrow[2],
          createdBy: 0,
          created: Date.now(),
          modifiedBy: 0,
          modified: Date.now()
        }
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log(body);
        }
        else {
          console.log("error: " + error);
          console.log("response.statusCode: " + response.statusCode);
          console.log("response.statusText: " + response.statusText);
        }
      })
    })
    .on('end',function() {
      console.log('Finished reading file.');
    })
    .on('error', function(error) {
      console.log(error);
    });
}
