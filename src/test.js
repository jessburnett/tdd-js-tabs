//Copyright 2018 Jessica Burnett. All rights reserved.

//wrap in iffy to avoid namespace errors
(function () {
    "use strict";

    var assert = require('chai').assert;

    describe("Addition", function(){

        it("adds positive numbers", function(){
            assert.equal(add(3,4), 7);
        });


    });

    function add(a, b){
        return a + b;
    }

}());