var fs = require('fs');
var Mustache = require('mustache');
var hogan = require('hogan.js');
var _ = require('underscore');
var exec = require('child_process').exec;
var digest = require('string-hash');
var util = require('util');

var production = !_.isUndefined(process.env.NODE_ENV);
var indexTemplate = './index.mustache';

var recompileTemplate = function() {
    console.log('Recompiling ' + indexTemplate + "...");
    var d = new Date();
    exec('node make index');
    console.log('time spent on recompile: ', new Date() - d);
};

if (!production) {
    console.log('Watching ' + indexTemplate + ' for file changes...');
    fs.watchFile(indexTemplate, { interval: 500 }, recompileTemplate);
}


var getData = function() {
  return {
    jsFile: 'target/app.js',
    cssFile: 'target/style.css',
    prod: production,
    date: "new Date().toString()"
  }
};

var getIndexFile = function() {
    return production ? './target/index.html' : 'index.html';
};

exports.build = function() {
    var mustache = fs.readFileSync(getIndexFile()).toString();
    var template = hogan.compile(mustache);
    var html = template.render(getData());
    return html;
};