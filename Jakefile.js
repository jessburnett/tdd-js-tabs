//Copyright 2018 Jessica Burnett. All rights reserved.
// builds should 1-self documenting 2-command-line process 3-dependency resolution
// 4- code, not configuration 5-straightforward and simple (Jake, Grunt, Gulp)
/* dependency management schools:
* 1 - automatically install dependencies
*     a - cons: dependency version may not be available.
* 2 -
* */
//wrap in iffy to avoid namespace errors
(function(){
    "use strict";

    task("default", function(){
        console.log("\n\nBUILD OK");
    })

}());//end iffy