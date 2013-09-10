'use strict';

var path = require('path');

global.expect = require('expect.js');
global.sinon = require('sinon');
global.lib = function(filePath){
  return require(path.join(__dirname, '../../lib', filePath));
};