'use strict';

var ModuleOne = module.exports = function ModuleOne(moduleTwo, moduleThree){
  if (!moduleTwo) throw new Error('moduleTwo is a required dependency');
  if (!moduleThree) throw new Error('moduleThree is a required dependency');
  this.two = moduleTwo;
  this.three = moduleThree;
};

// The dependency array values correspond to registered module names.
ModuleOne.infect = ['moduleTwo', 'moduleThree'];

ModuleOne.prototype.greet = function(){
  this.two.greet();
  this.three.greet();
};