'use strict';

// Inferred dependencies.
var ModuleFour = module.exports = function ModuleFour(moduleOne){
  if (!moduleOne) throw new Error('moduleOne is a required dependency');
  this.one = moduleOne;
};

ModuleFour.prototype.greet = function(){
  console.log('Hello from module four');
  this.one.greet();
};