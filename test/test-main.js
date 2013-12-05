var tests = Object.keys(window.__karma__.files).filter(function (file) {
      return /Spec\.js$/.test(file);
});

var preIncluded = ['sinon', 'jasmine-sinon'];

console.log(tests);
requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/js/',

    paths: {
        'jquery': 'libs/jquery/jquery',
        'underscore': 'libs/underscore/underscore',
        'backbone': 'libs/backbone/backbone',
        'hogan': 'libs/hogan/hogan',
        'hgn': 'libs/hgn/hgn',
        'text': 'text',

        'sinon': '/base/test/vendor/sinon',
        'jasmine-sinon': '/base/test/vendor/jasmine-sinon'
    },

    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'sinon': {
            exports: 'sinon'
        },
        'jasmine-sinon': ['sinon']
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: function() {
        window.__karma__.start();
    }
});


