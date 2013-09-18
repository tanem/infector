'use strict';

var path = require('path');

global.expect = require('expect.js');
global.lib = function(filePath){
  return require(path.join(__dirname, '../../lib', filePath));
};