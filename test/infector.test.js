'use strict';

var expect = require('expect.js');
var Infector = require('../lib/infector');

describe('Infector', function(){

  var infector;

  beforeEach(function(){
    infector = new Infector();
  });

  it('should allow registration of modules during instantiation', function(){
    infector = new Infector({
      one: { value: true },
      two: { type: Object }
    });
    expect(infector.registry).to.eql({
      one: { value: true },
      two: { type: Object }
    });
  });

  it('should register new modules', function(){
    infector.register({
      one: { value: true },
      two: { type: Object }
    });
    expect(infector.registry).to.eql({
      one: { value: true },
      two: { type: Object }
    });
  });

  it('should overwrite previously registered modules with the same name', function(){
    infector.register({ one: { value: true } });
    infector.register({ one: { value: false } });
    expect(infector.registry).to.eql({ 'one': { value: false } });
  });

  it('should throw an error if an unknown module is requested', function(){
    expect(function(){
      infector.get('foo');
    }).to.throwException(function(e){
      expect(e.message).to.be('foo has not been configured');
    });
  });

  it('should throw an error if a module is requested that has an unkown return instruction', function(){
    infector.register({ foo: { bar: 'Bar' } });
    expect(function(){
      infector.get('foo');
    }).to.throwException(function(e){
      expect(e.message).to.be('foo has an unknown return instruction');
    });
  });

  ['infect', 'inject'].forEach(function(prop){
    it('should return a module by type with dependencies specified by the constructor function\'s "' + prop + '" prop', function(){
      function Foo(bar) { this.bar = bar; }
      Foo[prop] = ['bar'];
      infector.register({
        foo: { type: Foo },
        bar: { value: 'Bar' }
      });
      var foo = infector.get('foo');
      expect(foo instanceof Foo).to.be(true);
      expect(foo.bar).to.eql('Bar');
    });
  });

  it('should return a module by value', function(){
    infector.register({ foo: { value: 'Foo' } });
    expect(infector.get('foo')).to.eql('Foo');
  });

  it('should return a reference to the same object if it was registered with the singleton option', function(){
    function Foo() {}
    infector.register({ foo: { type: Foo, isSingleton: true } });
    var fooOne = infector.get('foo');
    var fooTwo = infector.get('foo');
    expect(fooOne).to.equal(fooTwo);
  });

  it('should return a new instance of an object by type each time by default', function(){
    function Foo() {}
    infector.register({ foo: { type: Foo } });
    var fooOne = infector.get('foo');
    var fooTwo = infector.get('foo');
    expect(fooOne).not.to.equal(fooTwo);
  });

  it('should return a returned value from a constructor', function(){
    function Foo() { return { test: 'testvalue' }; }
    infector.register({ foo: { type: Foo } });
    var foo = infector.get('foo');
    expect(foo).to.have.property('test');
    expect(foo.test).to.equal('testvalue');
  });

});