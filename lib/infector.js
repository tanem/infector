(function(root){

  'use strict';

  /**
   * Require Underscore if we're on Node.js and it's not already present.
   */

  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

  /**
   * Expose `Infector`.
   */

  if (typeof exports !== 'undefined' && typeof module !== 'undefined' && module.exports) {
    exports = module.exports = Infector;
  } else {
    root.Infector = Infector;
  }

  function Infector(obj) {
    this.registry = {};
    this.register(obj);
  }

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
   * infector.register({
   *   moduleOne: { type: require('./moduleOne') },
   *   moduleTwo: { value: require('./moduleTwo') }
   * });
   * ```
   *
   * You can also defined a module as a singleton:
   *
   * ```js
   * infector.register({
   *   moduleOne: { type: require('./moduleOne'), isSingleton: true },
   * });
   * ```
   *
   * @param {Object} obj Modules to register.
   * @api public
   */

  Infector.prototype.register = function(obj){
    _.extend(this.registry, obj);
  };

  /**
   * Returns a module. If the module was registered as a singleton, this method
   * will create the instance then return a reference to the same instance in
   * any future `get` calls.
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

  Infector.prototype.get = function(name){
    var module = this.registry[name], instance;
    if (!module) throw new Error(name + ' has not been configured');
    if (_.has(module, 'type')) {
      instance = this._construct(module.type);
      if (!!module.isSingleton) this.registry[name] = { value: instance };
      return instance;
    } else if (_.has(module, 'value')) {
      return module.value;
    } else {
      throw new Error(name + ' has an unknown return instruction');
    }
  };

  /**
   * Constructs an instance of `Constructor` and injects it's dependencies.
   * 
   * @param {Function} Constructor
   * @return {Object}
   * @api private
   */

  Infector.prototype._construct = function(Constructor){
    return this._beget(Constructor, this._getDependencies(Constructor));
  };

  /**
   * Generates the array of dependencies for a `Constructor`.
   * 
   * @param {Function} Constructor
   * @return {Array}
   * @api private
   */

  Infector.prototype._getDependencies = function(Constructor){
    var dependencies = [];
    _.each(Constructor.infect || Constructor.inject, function(key, i){
      dependencies[i] = this.get(key);
    }, this);
    return dependencies;
  };

  /**
   * Like [Crockford's beget](http://javascript.crockford.com/prototypal.html)
   * except this one allows an array of arguments to be applied to the `Constructor`.
   * 
   * @param {Function} Constructor
   * @param {Array} dependencies
   * @return {Object}
   * @api private
   */

  Infector.prototype._beget = function(Constructor, dependencies){
    function F() { Constructor.apply(this, dependencies); }
    F.prototype = Constructor.prototype;
    return new F();
  };

}(this));
