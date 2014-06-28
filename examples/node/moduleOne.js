'use strict';

var ModuleOne = module.exports = function ModuleOne(moduleTwo, moduleThree){
  this.two = moduleTwo;
  this.three = moduleThree;
};

// The dependency array values correspond to registered module names.
ModuleOne.infect = ['moduleTwo', 'moduleThree'];

ModuleOne.prototype.greet = function(){
  console.log('Hello from module one');
  this.two.greet();
  this.three.greet();
};