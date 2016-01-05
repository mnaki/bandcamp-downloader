var _ = require('lodash')
var util = require('util')
var async = require('async')
var request = require('request')
var http = require('http');
var fs = require('fs');
var Download = require('download');
var sanitize = require("sanitize-filename");

var artistPage = process.argv[2]

if (!_.startsWith(artistPage, 'http://'))
{
  console.log('bad url')
  process.exit(1)
}

request(artistPage, function (err, response, body) {
  if (!err && response.statusCode == 200) {
    var data = body.split('trackinfo : ')[1].split('}],')[0] + '}]'
    var parsed = JSON.parse(data)
    var baked = _.map(parsed, function (item) {
      return {
        title: item.title,
        url: 'http:' + item.file["mp3-128"]
      }
    })
    _.each(baked, function (item, key) {
      console.log('Downloading ' + item.title)
      new Download({mode: '755'})
        .get(item.url)
        .rename({
          basename: sanitize(item.title),
          extname: '.m4a'
        })
        .dest('./out')
        .run(function (err, files) {
          if (err) console.log(err);
          else console.log(files[0].path + ' has been downloaded');
        })
    })
  }
})