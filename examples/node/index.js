'use strict';

var Infector = require('../../lib/infector');

var infector = new Infector({
  moduleOne: { type: require('./moduleOne') },
  moduleTwo: { value: require('./moduleTwo') },
  moduleThree: { type: require('./moduleThree') }
});

infector.get('moduleOne').greet();