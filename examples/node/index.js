'use strict';

var Infector = require('../../lib/infector'),
  infector = new Infector();

infector.register({
  moduleOne: { type: require('./moduleOne') },
  moduleTwo: { value: require('./moduleTwo') },
  moduleThree: { type: require('./moduleThree') }
});

infector.get('moduleOne').greet();