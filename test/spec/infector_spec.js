'use strict';

var _ = require('underscore'),
  expect = require('expect.js'),
  Infector = require('../../lib/infector');

describe('infector', function(){

  var infector;

  beforeEach(function(){
    infector = new Infector();
  });

  it('should register new modules', function(){
    infector.register({
      'one': { value: true },
      'two': { type: Object }
    });
    expect(infector.registry).to.eql({
      'one': { value: true },
      'two': { type: Object }
    });
  });

  it('should overwrite previously registered modules with the same name', function(){
    infector.register({ 'one': { value: true } });
    infector.register({ 'one': { value: false } });
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
    infector.register({ 'foo': { bar: 'Bar' } });
    expect(function(){
      infector.get('foo');
    }).to.throwException(function(e){
      expect(e.message).to.be('foo has an unknown return instruction');
    });
  });

  it('should return a module by type with dependencies specified by the constructor function\'s "inject" prop', function(){
    function Foo(bar) { this.bar = bar; }
    Foo.inject = ['bar'];
    infector.register({
      'foo': { type: Foo },
      'bar': { value: 'Bar' }
    });
    var foo = infector.get('foo');
    expect(foo instanceof Foo).to.be(true);
    expect(foo.bar).to.eql('Bar');
  });

  it('should return a module by type with dependencies specified by the constructor function\'s "infect" prop', function(){
    function Foo(bar) { this.bar = bar; }
    Foo.infect = ['bar'];
    infector.register({
      'foo': { type: Foo },
      'bar': { value: 'Bar' }
    });
    var foo = infector.get('foo');
    expect(foo instanceof Foo).to.be(true);
    expect(foo.bar).to.eql('Bar');
  });

  it('should return a module by value', function(){
    infector.register({ 'bar': { value: 'Bar' } });
    expect(infector.get('bar')).to.eql('Bar');
  });

});