module.exports = function(config) {
    config.set({
        // root path from where we defines our all file paths
        basePath : './',

        files : [
            // third party specific files
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/ag-grid/dist/angular-grid.js',
            'bower_components/angular-mocks/angular-mocks.js',
            // application and test specific files
            'app/angular-demo-services.module.js',
            'app/angular-demo-app.module.js',
            'app/angular-demo.config.js',
            'components/**/*.js',
            'spec-helper.js'
        ],

        // exclude the files that we don't want to test
        exclude : [],

        // preprocess matching files before serving them to the browser
        preprocessors : {
            'app/modules/**/**/!(*spec).js': 'coverage'
        },

        reporters : ['spec', 'coverage'],

        coverageReporter : {
            type : 'html',
            dir : 'test-coverage/'
        },
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch : false,
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun : true,

        frameworks: ['mocha', 'chai'],

        browsers : ['PhantomJS']
    });
};
