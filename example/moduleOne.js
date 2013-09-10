'use strict';

var ModuleOne = module.exports = function ModuleOne(moduleTwo, moduleThree){
  if (!moduleTwo) throw new Error('moduleTwo must be injected');
  if (!moduleThree) throw new Error('moduleThree must be injected');
  this.two = moduleTwo;
  this.three = moduleThree;
};

// The dependency array values correspond to registered module names.
ModuleOne.inject = ['moduleTwo', 'moduleThree'];

ModuleOne.prototype.greet = function(){
  this.two.greet();
  this.three.greet();
};