'use strict';

var ModuleThree = require('./moduleThree');

var ModuleOne = module.exports = function ModuleOne(moduleTwo, moduleThree){
  if (!(moduleThree instanceof ModuleThree)) throw new Error('An instance of moduleThree must be injected');
  this.two = moduleTwo;
  this.three = moduleThree;
};

ModuleOne.inject = ['moduleTwo', 'moduleThree'];

ModuleOne.prototype.greet = function(){
  this.two.greet();
  this.three.greet();
};