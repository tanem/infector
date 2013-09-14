'use strict';

var infector = lib('infector');

describe('infector', function(){

  afterEach(function(){
    infector.modules = {};
  });

  describe('register method', function(){

    it('should register new modules', function(){
      infector.register({
        'one': { value: true },
        'two': { type: Object }
      });
      expect(infector.modules).to.eql({
        'one': { value: true },
        'two': { type: Object }
      });
    });

    it('should overwrite previously registered modules with the same name', function(){
      infector.register({ 'one': { value: true } });
      infector.register({ 'one': { value: false } });
      expect(infector.modules).to.eql({ 'one': { value: false } });
    });

  });

  describe('get method', function(){

    it('should throw an error if an unknown module is requested', function(){
      expect(function(){
        infector.get('foo');
      }).to.throwException(function(e){
        expect(e.message).to.be('foo has not been configured');
      });
    });

    it('should throw an error if a module has an unknown return instruction', function(){
      infector.register({ 'foo': { bar: true } });
      expect(function(){
        infector.get('foo');
      }).to.throwException(function(e){
        expect(e.message).to.be('foo has an unknown return instruction');
      });
    });

    it('should construct an instance of "type" if a module\'s return instruction is "type"', function(){
      var stub = sinon.stub(infector, '_construct');
      infector.register({ 'foo': { type: Object } });
      infector.get('foo');
      expect(stub.args[0]).to.eql([Object]);
      infector._construct.restore();
    });

    it('should return "value" if a module\'s return instruction is "value"', function(){
      infector.register({ 'foo': { value: true } });
      expect(infector.get('foo')).to.be(true);
    });

  });

  describe('_construct method', function(){

    it('should return an instance of an object with it\'s dependencies injected', function(){
      sinon.stub(infector, '_getDependencies').returns(['foo', 'bar']);
      sinon.stub(infector, 'get').returns('qux');
      function Baz(foo, bar) {
        this.foo = foo;
        this.bar = bar;
      }
      expect(infector._construct(Baz)).to.eql({
        foo: 'qux',
        bar: 'qux'
      });
      infector._getDependencies.restore();
      infector.get.restore();
    });

  });

  describe('_getDependencies method', function(){

    it('should prioritise explicit over inferred dependencies', function(){
      sinon.stub(infector, '_getExplicitDependencies').returns(['foo']);
      sinon.stub(infector, '_getInferredDependencies').returns(['bar']);
      expect(infector._getDependencies()).to.eql(['foo']);
      infector._getExplicitDependencies.restore();
      infector._getInferredDependencies.restore();
    });

    it('should return inferred dependencies', function(){
      sinon.stub(infector, '_getExplicitDependencies').returns(null);
      sinon.stub(infector, '_getInferredDependencies').returns(['bar']);
      expect(infector._getDependencies()).to.eql(['bar']);
      infector._getExplicitDependencies.restore();
      infector._getInferredDependencies.restore();
    });

  });

  describe('_getExplicitDependencies method', function(){

    it('should return dependencies specified via "infect"', function(){
      function Foo(bar) {}
      Foo.infect = ['bar'];
      expect(infector._getExplicitDependencies(Foo)).to.eql(['bar']);
    });

    it('should return dependencies specified via "inject"', function(){
      function Foo(bar) {}
      Foo.inject = ['bar'];
      expect(infector._getExplicitDependencies(Foo)).to.eql(['bar']);
    });

    it('should prioritise "infect" over "inject"', function(){
      function Foo(bar) {}
      Foo.infect = ['bar'];
      Foo.inject = ['baz'];
      expect(infector._getExplicitDependencies(Foo)).to.eql(['bar']);
    });

  });

  describe('_getInferredDependencies method', function(){

    it('should return dependencies via inferred constructor arguments', function(){
      expect(infector._getInferredDependencies(function Foo() {})).to.be(null);
      expect(infector._getInferredDependencies(function Foo(bar) {})).to.eql(['bar']);
      expect(infector._getInferredDependencies(function Foo(bar, baz) {})).to.eql(['bar', 'baz']);
      expect(infector._getInferredDependencies(function Foo(bar,    baz) {})).to.eql(['bar', 'baz']);
      expect(infector._getInferredDependencies(function Foo(bar) { if (true) {} })).to.eql(['bar']);
    });

  });

});