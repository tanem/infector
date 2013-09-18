'use strict';

var Infector = require('../lib/infector'),
  infector = new Infector();

infector.register({
  'moduleOne': { type: require('./moduleOne') },
  'moduleTwo': { value: require('./moduleTwo') },
  'moduleThree': { type: require('./moduleThree') },
  'moduleFour': { type: require('./moduleFour') }
});

infector.get('moduleFour').greet();