# Infector

[![Build Status](https://travis-ci.org/tanem/infector.png)](https://travis-ci.org/tanem/infector)

A small JS dependency injection module for both the browser and Node.js. Inspired by the dependency injection approaches in [AngularJS](https://github.com/angular/angular.js) and [node-di](https://github.com/vojtajina/node-di). No relation to [Infector++](https://code.google.com/p/infectorpp/).

## Usage

### Browser

#### Dependencies

 * [Underscore](http://underscorejs.org/)

#### Example

```html
...
<script src="underscore.js"></script>
<script src="infector.js"></script>
<script>
(function(){

  var infector = new Infector();

  // Inferred dependencies.
  function ModuleOne(moduleTwo) {
    this.moduleTwo = moduleTwo
  };

  // Explicit dependencies.
  function ModuleTwo(foo) {
    this.foo = foo;
  };
  ModuleTwo.infect = ['foo'];

  infector.register({
    'moduleOne': { type: ModuleOne },
    'moduleTwo': { type: ModuleTwo },
    'foo': { value: true }
  });

  var moduleOne = infector.get('moduleOne');
  console.log(moduleOne instanceof ModuleOne); // => true
  console.log(moduleOne.moduleTwo instanceof ModuleTwo); // => true

  var moduleTwo = infector.get('moduleTwo');
  console.log(moduleTwo.foo); // => true
  
}());
</script>
...
```

A working example is available in the `examples/browser` dir. To view:

```
$ open examples/browser/index.html
```

### Node.js

#### Installation

```
$ npm install infector --save
```

#### Example

```js
var Infector = require('infector'),
  infector = new Infector();

// Inferred dependencies.
function ModuleOne(moduleTwo) {
  this.moduleTwo = moduleTwo
};

// Explicit dependencies.
function ModuleTwo(foo) {
  this.foo = foo;
};
ModuleTwo.infect = ['foo'];

infector.register({
  'moduleOne': { type: ModuleOne },
  'moduleTwo': { type: ModuleTwo },
  'foo': { value: true }
});

var moduleOne = infector.get('moduleOne');
console.log(moduleOne instanceof ModuleOne); // => true
console.log(moduleOne.moduleTwo instanceof ModuleTwo); // => true

var moduleTwo = infector.get('moduleTwo');
console.log(moduleTwo.foo); // => true
```

A working example is available in the `examples/node` dir. To run:

```
$ node examples/node
```

## Development

### Setup

To generate the docs, ensure the following is installed:

 * [Pygments](http://pygments.org/download/)

Install global dependencies:

```
$ npm install -g grunt-cli istanbul
```

Clone:

```
$ git clone http://github.com/tanem/infector.git
```

Change to project dir, then install local dependencies:

```
$ cd infector && npm install
```

### Grunt Tasks

#### Documentation

To generate documentation via [Docker](https://github.com/jbt/docker):

```
$ grunt docs
```

Outputs to `_docs`. Open `_docs/README.md.html` in a browser to view.

#### Unit Tests

To run the unit tests via [Mocha](https://github.com/visionmedia/mocha):

```
$ grunt test
```

#### Code Coverage

To run the unit tests and generate an HTML code coverage report via [Istanbul](https://github.com/gotwarlost/istanbul):

```
$ grunt cover
```

Outputs to `_coverage`. Open `_coverage/index.html` in a browser to view.

#### JSHint

To run [JSHint](https://github.com/jshint/jshint/) over the required files:

```
$ grunt jshint
```

#### Start

The start task will execute certain tasks, then will watch the relevant files for changes, running appropriate tasks when required:

```
$ grunt start
```

To find out more about the various Grunt tasks, see `Gruntfile.js`.

## Credits

 * [@appleYaks](https://github.com/appleYaks), whose [grunt-express-workflow](https://github.com/appleYaks/grunt-express-workflow) I leaned heavily on when configuring Istanbul
 * [@vojtajina](https://github.com/vojtajina), whose injector recipe in [node-di](https://github.com/vojtajina/node-di) gave me ideas for module registration
 * [AngularJS](https://github.com/angular/angular.js), where the idea of [how to specify dependencies to be injected](http://docs.angularjs.org/guide/di) came from
 * [Infector++](https://code.google.com/p/infectorpp/), where the name for this component came from... it made me laugh :)