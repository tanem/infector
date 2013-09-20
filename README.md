# Infector

[![Build Status](https://travis-ci.org/tanem/infector.png)](https://travis-ci.org/tanem/infector)

A small JS dependency injection module for both the browser and Node.js. Inspired by the dependency injection approaches in [AngularJS](https://github.com/angular/angular.js) and [node-di](https://github.com/vojtajina/node-di). No relation to [Infector++](https://code.google.com/p/infectorpp/).

## Usage

### Grab `Infector`

In the browser, [Underscore](http://underscorejs.org/) is a dependency and `Infector` is exposed as a global. So do something like:

```html
<script src="underscore.js"></script>
<script src="infector.js"></script>
```

In Node.js:

```
$ npm install infector --save
```

### Specify dependencies

Use a constructor property:

```js
function Foo(bar) {}
Foo.infect = ['bar'];
// or Foo.inject = ['bar'];
```

### Register modules

There are two return options.

 * `type`: an instance of `type` will be returned via `new`:

```js
function Foo() {}
infector.register({ 'foo': { type: Foo } });
```

If you want the module to be returned as a singleton:

```js
infector.register({ 'foo': { type: Foo, isSingleton: true } });
```

 * `value`: the registered `value` will be returned:

```js
infector.register({ 'foo': { value: 'Foo' } });
```

### Get modules

Just do:

```js
infector.get('foo');
```

## Examples

### Browser

A working example is available in the `examples/browser` dir. To view:

```
$ open examples/browser/index.html
```

### Node.js

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

 * This great article by Chad Perry: [DIY-DI](http://blacksheep.parry.org/wp-content/uploads/2010/03/DIY-DI.pdf)
 * [@appleYaks](https://github.com/appleYaks), whose [grunt-express-workflow](https://github.com/appleYaks/grunt-express-workflow) I leaned heavily on when configuring Istanbul
 * [@vojtajina](https://github.com/vojtajina), whose injector recipe in [node-di](https://github.com/vojtajina/node-di) gave me ideas for module registration
 * [AngularJS](https://github.com/angular/angular.js), where the idea of [how to specify dependencies to be injected](http://docs.angularjs.org/guide/di) came from
 * [Infector++](https://code.google.com/p/infectorpp/), where the name for this component came from... it made me laugh :)