'use strict';

var injector = require('../lib/injector');

injector.registerModules({
  'moduleOne': { type: require('./moduleOne') },
  'moduleTwo': { value: require('./moduleTwo') },
  'moduleThree': { type: require('./moduleThree') }
});

injector.get('moduleOne').greet();