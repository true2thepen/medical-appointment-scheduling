#!/usr/bin/env node

const parse = require('csv-parse');
const program = require('commander');
const request = require('request');
const fs = require('fs');
const materialPaletts = require('google-material-color').palette;

program
  .version('0.1.0')
  .usage('[options] <file ...>')
  .parse(process.argv);
console.log(materialPaletts);
var keys = Object.keys(materialPaletts);
console.log(keys);
for (var i = 0; i < program.args.length; i++) {
  fs.createReadStream(program.args[i])
    .pipe(parse())
    .on('data', function(csvrow) {
      request({
        url: 'http://localhost:3000/api/examinations',
        method: "POST",
        json: {
          name: csvrow[1],
          createdBy: 0,
          created: Date.now(),
          modifiedBy: 0,
          modified: Date.now(),
          backgroundColor: materialPaletts[keys[ keys.length * Math.random() << 0]]['500'],
          color: '#FFFFFF'
        }
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log(body);
        }
        else {
          console.log("error: " + error);
          if(response) {
            console.log("response.statusCode: " + response.statusCode);
            console.log("response.statusText: " + response.statusText);
          }
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
