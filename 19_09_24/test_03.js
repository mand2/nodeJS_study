//js 객체 생성
var obj = {};

//객체에 val 추가
obj.name = 'yon';
obj.hello = function () {
    console.log('얘 이름은 ::: ' + this.name);
};

obj.hello();


//Person 객체 생성
var Person = function () { }
//prototype 정의 (공용메서드)
Person.prototype.sayHello = function () {
    console.log('하이하이이이잇~~!!!');
};

class Member { }

var person = new Person();
var member = new Member();
person.sayHello(); //person function 불러오기~!


/**---------------------------
 *       상속처리 연습 
--------------------------- */
//전역모듈 가져오기::이벤트 등록을 위해 EventEmitter 생성
var util = require('util');
var EventEmitter = require('events').EventEmitter;

//Person에 EventEmitter 상속시키기 
//:: .inherites(상속받는 애(child) , 상속해주는 애(parent));
util.inherits(Person, EventEmitter);
person.on('hi', function () {
   console.log('이벤트 등록 처리 후 :::::\n\t\t\t안녕 반가워!^^');
});

//이벤트 강제발생
person.emit('hi');




