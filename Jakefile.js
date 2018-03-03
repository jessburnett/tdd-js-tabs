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
    "use strict";

    var semver = require("semver");

    desc("Default Task");
    task("default", ["node version"], function(){
        console.log("\n\nPASS: BUILD OK!");
    });

    //check external dependencies
    desc("Checking Node Version...");
    task("node version", function(){

        var packageJson = require("./package.json");
        var expectedVersion = "v" + packageJson.engines.node;
        console.log(expectedVersion);


        var exec = require('child_process').exec;
        exec('node --version', function(error, stdout, stderr) {
            var actualVersion = stdout;
            if (semver.neq(expectedVersion, actualVersion))
            {
                fail('Incorrect npm version: expected ' + expectedVersion + ', but was ' + actualVersion);
            }
            complete();
        });
    }, { async: true
    });

}());