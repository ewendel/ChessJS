#! /usr/bin/env node

require('shelljs/make');
require('colors');

var _ = require('underscore'),
    fs = require('fs'),
    pad = require('pad'),
    glob = require('glob'),
    path = require('path'),
    zlib = require('zlib'),
    hogan = require('hogan.js'),
    moment = require('moment');

var isWin = (process.platform === 'win32');

/*** CONFIG ********/

var version = process.env.VERSION || moment().format('YYYYMMDD-hh.mm.ss');
    targetDir = process.env.OUTPUT_DIR || path.join('target');

var webapp = path.join('js'),
    config = path.join('config'),

    indexFile = path.join('index.mustache'),
    mainLessFile = path.join('css', 'app.less'),

    jsFileName = 'app.js',
    jsFile = path.join(targetDir, jsFileName),
    cssFileName = 'style.css',
    cssFile = path.join(targetDir, cssFileName);

    rjsConfig = path.join(config, 'build.js'),
    jshintConfig = path.join(config, 'jshint.json');


/*** TARGETS ********/

target.all = function() {
    // target.check();
    // target.jshint();
    // target.test();
    target.build();
};

target.css = function() {
    buildCss();
};

target.jshint = function() {
    var files = glob.sync(path.join('js', '**', '*.js'));

    section('Running JSHint');
    npmBin('jshint', '--config ' + jshintConfig, files.join(' '));
};

// target.test = function() {
//     section('Running JavaScript tests');
//     npmBin('karma', 'start', 'karma.conf.js', '--browsers PhantomJS', '--single-run');
// };

target.index = function() {
    buildIndexHtml();
};

target.build = function() {
    createCleanDir(targetDir);

    buildIndexHtml();
    buildJavaScript();
    buildCss();

    gzip(jsFile);
    gzip(cssFile);

//     optimizeImages();

    echo();echo();
    success("Build succeeded!");
};

// target.check = function() {
//     failIfOnlySubsetOfTestsAreRunning();
// };


/*** APP FUNCTIONS ********/

var buildIndexHtml = function() {
    var htmlFileProduction = path.join(targetDir, 'index.html');
    var htmlFileDev = path.join('index.html');
    var productionEnv = !_.isUndefined(process.env.NODE_ENV) || false;
    
    section('Building HTML → ' + htmlFileDev);

    renderAndWriteMustache(indexFile, htmlFileDev, {
        prod: false,
        players: "{{{players}}}",
        games: "{{{games}}}",
        sessions: "{{{sessions}}}",
        date: (new Date()).toString()
    });

    section('Building HTML → ' + htmlFileProduction);

    renderAndWriteMustache(indexFile, htmlFileProduction, {
        prod: true,
        cssFile: path.join(targetDir, cssFileName),
        jsFile: path.join(targetDir, jsFileName),
        players: "{{{players}}}",
        games: "{{{games}}}",
        sessions: "{{{sessions}}}",
        date: (new Date()).toString()
    });
};

var buildJavaScript = function() {
    section('Building JavaScript → ' + jsFile);
    npmBin('r.js', '-o ' + rjsConfig, 'out=' + jsFile);
};

var buildCss = function() {
    section('Building Less → ' + cssFile);
    npmBin('lessc', mainLessFile, cssFile, '-x');
};

var gzip = function(file) {
    var gzip = zlib.createGzip();
    var input = fs.createReadStream(file);
    var output = fs.createWriteStream(file + '.gz');

    section('Gzipping ' + file);
    input.pipe(gzip).pipe(output);
    success();
};

var addVersions = function() {
    // add versions to css and html files
};

var optimizeImages = function() {
    var pngs = glob.sync(path.join(webapp, 'images', '*.png'));

    section('Optimizing pngs');

    var to = path.join(targetDir, 'images');

    npmBin('optipng-bin', '-strip all', '-dir ' + to, pngs.join(' '))
};

var renderAndWriteMustache = function(from, to, data) {
    var mustache = fs.readFileSync(from).toString();
    var template = hogan.compile(mustache);
    var html = template.render(data);

    fs.writeFileSync(to, html);

    success();
};

var failIfOnlySubsetOfTestsAreRunning = function() {
    var specs = glob.sync(path.join('src', 'test', 'js', '**', '*Spec.js'));

    section('Checking for "ddescribe" and "iit" in tests');

    var ddescribe = grep("ddescribe", specs);
    var iit = grep("iit", specs);

    if (ddescribe === '' && iit === '') {
        success();
    } else {
        fail();
    }
};


/*** HELPER FUNCTIONS ********/

// helper to call an NPM binary, which resides in node_modules/.bin/name
// the rest of the arguments are used as space-separated arguments for the binary
var npmBin = function(name) {
    var bin = path.join('node_modules', '.bin', name);

    // call the correct on Windows
    if (isWin) {
        bin = bin + '.cmd';
    }

    if (!test('-e', bin)) {
        echo('Binary does not exist: ' + bin);
        exit(1);
    }

    var res = exec(bin + ' ' + _.rest(arguments).join(' '));
    done(res);
}

var createCleanDir = function(dir) {
    if (test('-d', dir)) {
        rm('-rf', dir);
    }

    mkdir('-p', dir);

    return dir;
};

var section = function(header) {
    echo();
    echo('    ' + header.bold);
};

var done = function(res) {
    if (res.code === 0) {
        success();
    } else {
        fail();
    }
};

var success = function(text) {
    text = text || 'done';
    var s = isWin ? '»' : '✓';
    echo('    ' + s.green + ' ' + text.green);
};

var fail = function(text) {
    text = text || 'failed';
    var s = isWin ? '×' : '✘';
    echo('    ' + s.red + ' ' + text.red);
    exit(1);
};
