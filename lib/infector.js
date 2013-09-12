'use strict';

var _ = require('lodash');

/**
 * Expose `infector`.
 */

var infector = module.exports = {};

/**
 * Holds the registered modules.
 */

infector.modules = {};

/**
 * Registers modules and defines how they are to be returned. Objects should
 * define required dependencies using the registered names.
 *
 * There are two ways a module can be obtained from the infector:
 *
 * * `type`: a new instance will be created via `new` and returned.
 * * `value`: the registered value will be returned.
 *
 * Example:
 *
 * ```js
 * infector.registerModules({
 *   'moduleOne': { type: require('./moduleOne') },
 *   'moduleTwo': { value: require('./moduleTwo') }
 * });
 * ```
 *
 * @param {Object} obj Modules to register.
 * @api public
 */

infector.registerModules = function(obj){
  _.extend(this.modules, obj);
};

/**
 * Returns a module.
 *
 * Example:
 *
 * ```js
 * infector.get('moduleOne');
 * ```
 *
 * @param {String} name The name of the module to return.
 * @return {Object} The module instance or value.
 * @api public
 */

infector.get = function(name){
  var module = this.modules[name];
  if (!module) throw new Error(name + ' has not been configured');
  if (module.type) return this._construct(module.type);
  else if (module.value) return module.value;
  else throw new Error(name + ' has an unknown return instruction');
};

/**
 * Constructs an object and injects the dependencies specified by the
 * `inject` property. If you want to stay consistent with the whole
 * `infector` thing, you can use the `infect` property as well. Either
 * way, they both do the same thing ;)
 *
 * @param {Function} Constructor
 * @return {Object}
 * @api private
 */

infector._construct = function(Constructor){
  var args = [];
  var dependencies = Constructor.infect || Constructor.inject;
  _.each(dependencies, function(key, i){
    args[i] = infector.get(key);
  });
  return this._beget(Constructor, args);
};

/**
 * Constructs an object with the given `args` array. Based on
 * [Crockford's beget](http://javascript.crockford.com/prototypal.html).
 *
 * @param {Function} Constructor
 * @param {Array} args
 * @return {Object}
 * @api private
 */
infector._beget = function(Constructor, args){
  function F() { Constructor.apply(this, args); }
  F.prototype = Constructor.prototype;
  return new F();
};