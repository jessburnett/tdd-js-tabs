//Copyright 2018 Jessica Burnett. All rights reserved.
// builds should 1-self documenting 2-command-line process 3-dependency resolution
// 4- code, not configuration 5-straightforward and simple (Jake, Grunt, Gulp)
/* dependency management schools:
* 1 - automatically install dependencies
*     a - con: dependency version may not be available.
*     b - pro: less weight on source control
* 2 - include dependencies in source code
*     a - con: weighs down performance of source control
*     b - pros: guaranteed correct version and handles obsolete dependencies
* Let's use #2 for this though usually 1 is used in work environments. I want you to be able to just install and run with one command * */

//

//wrap in iffy to avoid namespace errors
(function(){

    var semver = require('semver');
    var jshint = require('simplebuild-jshint');
    var mocha = require('mocha');
    var exec = require('child_process').exec;
    var karma = require('simplebuild-karma');
    var KARMA_CONFIG = 'karma.conf.js';


    //*** GENERAL-PURPOSE TASKS
    desc('Start Karma Server ( run this task first! )');
    task('karma', function(){
        console.log('Starting Karma Server');
        karma.start({
            configFile: KARMA_CONFIG
        }, complete, fail);
    }, { async: true });

    desc('Default Task');
    task('default', ['node version', 'lint', 'karma', 'automated-tests', 'run' ], function(){
        console.log('\n\nPASS: BUILD OK!');
    });

    desc('Run a localhost server');
    task('run', function(){
        jake.exec('node node_modules/http-server/bin/http-server src', { interactive: true }, complete);
    });


    //*** SUPPORTING

    //check external dependencies
    desc('Checking Node Version...');
    task('node version', function(){

        var packageJson = require('./package.json');
        var expectedVersion = 'v' + packageJson.engines.node;
        console.log(expectedVersion);


        exec('node --version', function(error, stdout, stderr) {
            var actualVersion = stdout;
            if (semver.neq(expectedVersion, actualVersion))
            {
                fail('Incorrect npm version: expected ' + expectedVersion + ', but was ' + actualVersion);
            }
            complete();
        });
    }, { async: true });

    //linting
    desc('Linting JavaScript Code');
    task('lint', function(){
        process.stdout.write('Linting Javascript:');
            jshint.checkFiles({
                files: [ "Jakefile.js", "src/**/*.js" ],
                options: {
                    bitwise: true,
                    eqeqeq: true,
                    freeze: true
                },
                globals: {
                    //Mocha globals to ignore
                    describe: false,
                    it: false,
                    before: false,
                    after: false,
                    beforeEach: false,
                    afterEach: false
                }
            }, complete, fail);
        },
        { async: true});

    desc('Testing Javascript:');
    task("automated-tests", function() {
        karma.run({
            configFile: KARMA_CONFIG,
            expectedBrowsers: [
                "Chrome 42.0.2311 (Mac OS X 10.10.3)",
                "Firefox 37.0.0 (Mac OS X 10.10)"
            ]
        }, complete, fail);
    }, { async: true });

}());