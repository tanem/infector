'use strict';

var infector = lib('infector');

describe('infector', function(){

  function Foo(name, age) {
    this.name = name;
    this.age = age;
  }
  Foo.inject = ['bar'];

  beforeEach(function(){
    infector.registerModules({
      'foo': { type: Foo },
      'bar': { value: 'bar' }
    });
  });

  afterEach(function(){
    infector.modules = {};
  });

  it('should register modules correctly', function(){
    infector.registerModules({ 'baz': { type: 'Baz' } });
    expect(infector.modules).to.eql({
      'foo': { type: Foo },
      'bar': { value: 'bar' },
      'baz': { type: 'Baz' }
    });
  });

  it('should throw an error if an unknown module is requested', function(){
    expect(function(){
      infector.get('baz');
    }).to.throwException(function(e){
      expect(e.message).to.be('baz has not been configured');
    });
  });

  it('should construct an instance of "type" if a module\'s return instruction is "type"', function(){
    var stub = sinon.stub(infector, '_construct');
    infector.get('foo');
    expect(stub.args[0]).to.eql([Foo]);
    infector._construct.restore();
  });

  it('should return "value" if a module\'s return instruction is "value"', function(){
    expect(infector.get('bar')).to.be('bar');
  });

  it('should throw an error if a module has an unknown return instruction', function(){
    infector.registerModules({ 'baz': {} });
    expect(function(){
      infector.get('baz');
    }).to.throwException(function(e){
      expect(e.message).to.be('baz has an unknown return instruction');
    });
  });

  it('should handle a constructor function\'s dependencies correctly', function(){
    var begetStub = sinon.stub(infector, '_beget');
    infector._construct(Foo);
    expect(begetStub.args[0]).to.eql([Foo, ['bar']]);
    infector._beget.restore();
  });

  it('should correctly construct an object with a given args array', function(){
    var foo = infector._beget(Foo, ['John', 30]);
    expect(foo.name).to.be('John');
    expect(foo.age).to.be(30);
    expect(foo instanceof Foo).to.be(true);
  });

});