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
* Let's use #2 for this * */

//wrap in iffy to avoid namespace errors
(function(){

    var semver = require('semver');
    var jshint = require('simplebuild-jshint');
    var mocha = require('mocha');
    var exec = require('child_process').exec;

    //*** GENERAL-PURPOSE TASKS

    desc('Default Task');
    task('default', ['node version', 'lint', 'automated-tests', 'run' ], function(){
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
                globals: {}
            }, complete, fail);
        }, { async: true });

    desc('Automated Tests:');
    task('automated-tests', function(){
        exec('node_modues/.bin/mocha src/test.js', function(error, stdout, stderr){
            process.stdout.write('Running Automated Tests:\n\n');
            var results = mocha.Runner.result;
            console.log(results);
        });
    });


}());