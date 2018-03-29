//Copyright 2018 Jessica Burnett. All rights reserved.

//wrap in iffy to avoid namespace errors
(function () {
    "use strict";

    //lets create a parent object called Person
    //let's assume Teachers are still people and not robots :)
    function Person(first, last) {
        this.first = first;
        this.last = last;
    }

    //let's create a Teacher child object to inherit and extend Person
    // I assume each teacher teaches only 1 subject
    function Teacher(first, last, subject) {
        Person.call(first, last);
        this.subject = subject;
        this.first = first;
        this.last = last;
    }

    Teacher.prototype = Object.create(Person.prototype);
    Teacher.prototype.constructor = Teacher;
    Teacher.prototype.createQuiz = function() {
        console.log('Now I am going to grade your quiz.');
    };
    var teacher1 = new Teacher('Albis', 'Dumbledore', 'sorcery');
    console.log(teacher1);

    // Student class!
    function Student(first, last, subject) {
        Teacher.call( first, last, subject);
    }
    Student.prototype = Object.create(Teacher.prototype);
    Student.prototype.constructor = Student;
    Student.prototype.takeQuiz = function() {
        console.log('Hi! I\'m ' + this.first + '. I am going to take a quiz');
    };
    var student1 = new Student('Harry', 'Potter', 'sorcery');

}());