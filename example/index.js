'use strict';

var infector = require('../lib/infector');

infector.registerModules({
  'moduleOne': { type: require('./moduleOne') },
  'moduleTwo': { value: require('./moduleTwo') },
  'moduleThree': { type: require('./moduleThree') }
});

infector.get('moduleOne').greet();