'use strict';

var infector = require('../lib/infector');

infector.register({
  'moduleOne': { type: require('./moduleOne') },
  'moduleTwo': { value: require('./moduleTwo') },
  'moduleThree': { type: require('./moduleThree') },
  'moduleFour': { type: require('./moduleFour') }
});

infector.get('moduleFour').greet();