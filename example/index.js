'use strict';

var infector = require('../lib/infector');

infector.registerModules({
  'moduleOne': { type: require('./moduleOne') },
  'moduleTwo': { value: require('./moduleTwo') },
  'moduleThree': { type: require('./moduleThree') },
  'moduleFour': { type: require('./moduleFour') }
});

infector.get('moduleFour').greet();