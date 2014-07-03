# Infector

[![Build Status](https://travis-ci.org/tanem/infector.png)](https://travis-ci.org/tanem/infector)
[![Coverage Status](https://coveralls.io/repos/tanem/infector/badge.png?branch=master)](https://coveralls.io/r/tanem/infector?branch=master)
[![NPM version](https://badge.fury.io/js/infector.svg)](http://badge.fury.io/js/infector)

[![browser support](https://ci.testling.com/tanem/infector.png)](https://ci.testling.com/tanem/infector)

Dependency injection for Node.js and the browser. Inspired by the dependency injection approaches in [AngularJS](https://github.com/angular/angular.js) and [node-di](https://github.com/vojtajina/node-di). No relation to [Infector++](https://code.google.com/p/infectorpp/).


## Usage

### Grab `Infector`

In the browser, [Underscore](http://underscorejs.org/) is a dependency and `Infector` is exposed as a global. So do something like:

```html
<script src="underscore.js"></script>
<script src="infector.js"></script>
```

Using [Bower](http://bower.io/):

```
$ bower install infector --save
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
infector.register({ foo: { type: Foo } });
```

If you want the module to be returned as a singleton:

```js
infector.register({ foo: { type: Foo, isSingleton: true } });
```

 * `value`: the registered `value` will be returned:

```js
infector.register({ foo: { value: 'Foo' } });
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


## Testing

In the browser:

```sh
$ make browser-test
```

In Node.js:

```sh
$ make test
```

To generate a coverage report:

```sh
$ make test-cov
```


## Credits

 * This great article by Chad Perry: [DIY-DI](http://blacksheep.parry.org/wp-content/uploads/2010/03/DIY-DI.pdf)
 * [@vojtajina](https://github.com/vojtajina), whose injector recipe in [node-di](https://github.com/vojtajina/node-di) gave me ideas for module registration
 * [AngularJS](https://github.com/angular/angular.js), where the idea of [how to specify dependencies to be injected](http://docs.angularjs.org/guide/di) came from
 * [Infector++](https://code.google.com/p/infectorpp/), where the name for this component came from ;)