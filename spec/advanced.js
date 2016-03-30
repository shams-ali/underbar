(function() {
  'use strict';

  describe('Advanced', function() {

    describe('invoke, when provided a function reference', function() {
      checkForNativeMethods(function() {
        _.invoke(['dog', 'cat'], _.identity);
      });

 _.invoke = function(array, fn){
  var res = [];
  for(var i = 0; i < array.length; i++){
    if(typeof fn === "function"){
      res.push(fn.apply(array[i]));
    }
    if(typeof fn === "string"){
      res.push(array[i][fn]());
    }
  }
  return res;
};


      it('runs the input function on each item in the array, and returns a list of results', function() {
        var reverse = function(){
          return this.split('').reverse().join('');
        };

        var reversedStrings = _.invoke(['dog', 'cat'], reverse);

        expect(reversedStrings).to.eql(['god', 'tac']);
      });

    });

    describe('invoke, when provided a method name', function() {
      checkForNativeMethods(function() {
        _.invoke(['dog', 'cat'], 'toUpperCase');
      });

      it('runs the specified method on each item in the array, and returns a list of results', function() {
        var upperCasedStrings = _.invoke(['dog', 'cat'], 'toUpperCase');

        expect(upperCasedStrings).to.eql(['DOG', 'CAT']);
      });
    });

    describe('sortBy', function() {
      checkForNativeMethods(function() {
        _.sortBy([{name : 'curly', age : 50}, {name : 'moe', age : 30}], function(person) {
          return person.age;
        });
      });


/*_.sortBy = function(collection, fn){
  return collection.sort(function(a,b){
    if(typeof fn === "function"){
      return fn(a)-fn(b);
    }else{
      if(typeof fn === "string"){
        return a[fn] - b[fn];
      }
    }
  });
};*/

_.sortBy = function(collection, fn){
  return collection.sort(function(a,b){
    return typeof fn === "function" ? fn(a)-fn(b) : a[fn] - b[fn];
  });
};

      it('should sort by age', function() {
        var people = [{name : 'curly', age : 50}, {name : 'moe', age : 30}];
        people = _.sortBy(people, function(person) {
          return person.age;
        });

        expect(_.pluck(people, 'name')).to.eql(['moe', 'curly']);
      });

      it('should handle undefined values', function() {
        var list = [undefined, 4, 1, undefined, 3, 2];
        var result = _.sortBy(list, function(i) { return i; });

        expect(result).to.eql([1, 2, 3, 4, undefined, undefined]);
      });

      it('should sort by length', function() {
        var list = ['one', 'two', 'three', 'four', 'five'];
        var sorted = _.sortBy(list, 'length');

        expect(sorted).to.eql(['one', 'two', 'four', 'five', 'three']);
      });

      it('should produce results that change the order of the list as little as possible', function() {
        function Pair(x, y) {
          this.x = x;
          this.y = y;
        }

        var collection = [
          new Pair(1, 1), new Pair(1, 2),
          new Pair(1, 3), new Pair(1, 4),
          new Pair(1, 5), new Pair(1, 6),
          new Pair(2, 1), new Pair(2, 2),
          new Pair(2, 3), new Pair(2, 4),
          new Pair(2, 5), new Pair(2, 6),
          new Pair(undefined, 1), new Pair(undefined, 2),
          new Pair(undefined, 3), new Pair(undefined, 4),
          new Pair(undefined, 5), new Pair(undefined, 6)
        ];

        var actual = _.sortBy(collection, function(pair) {
          return pair.x;
        });

        expect(actual).to.eql(collection);
      });
    });

    describe('flatten', function() {
      checkForNativeMethods(function() {
        _.flatten([1, [2], [3, [[[4]]]]]);
      });

/*var flatten = function(collection){
  collection = reduce(collection, function(prev,curr){
    return prev.concat(curr);
  }, []);
  var check = any(collection, function(value){
    return Array.isArray(value);
  });
  if(check){
    return flatten(collection);
  }else{
    return collection;
  }
};*/

/*_.flatten = function(collection){
  collection = _.reduce(collection, function(prev,curr){
    return prev.concat(curr);
  }, []);
  return _.some(collection, function(value){
    return Array.isArray(value);
  }) ? _.flatten(collection) : collection;
};*/

_.flatten = function(nestedArray, result) {
  var concatenatedArr = _.reduce(nestedArray, function(acc, value){
      return acc.concat(value);
  }, []);
  for (var i = 0; i < concatenatedArr.length; i++){
    if(Array.isArray(concatenatedArr[i])){
      return _.flatten(concatenatedArr, result);
    }
  }
  result = concatenatedArr;
  return result;
};

      it('can flatten nested arrays', function() {
        var nestedArray = [1, [2], [3, [[[4]]]]];

        expect(_.flatten(nestedArray)).to.eql([1,2,3,4]);
      });
    });

    describe('zip', function() {
      checkForNativeMethods(function() {
        _.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true]);
      });

_.zip = function(){
  var args = Array.prototype.slice.call(arguments);
  var res = [];
  var count = [];
  for(var k = 0; k<args.length;k++){
    count.push(args[k].length);
  }
  var counter = Math.max.apply(Math, count);
  for(var i = 0; i < args.length; i++){
    res[i] = [];
    for(var j = 0; j < counter; j++){
      res[i].push(args[j][i]);
    }
  }
  return res;
};

      it('should zip together arrays of different lengths', function() {
        var names = ['moe', 'larry', 'curly'], ages = [30, 40, 50], leaders = [true];

        expect(_.zip(names, ages, leaders)).to.eql([
          ['moe', 30, true],
          ['larry', 40, undefined],
          ['curly', 50, undefined]
        ]);
      });
    });

    describe('intersection', function() {
      checkForNativeMethods(function() {
        _.intersection(['moe', 'curly', 'larry'], ['moe', 'groucho']);
      });

_.intersection = function(){
  var args = Array.prototype.slice.call(arguments);
  var res = [];
    for(var i = 0; i < args[0].length; i++){
      for(var j = 0; j < args[1].length; j++){
        if(args[0][i] === args[1][j]){
          res.push(args[0][i]);
        }
      }
    }
  return res;
};

      it('should take the set intersection of two arrays', function() {
        var stooges = ['moe', 'curly', 'larry'];
        var leaders = ['moe', 'groucho'];

        expect(_.intersection(stooges, leaders)).to.eql(['moe']);
      });

    });

    describe('difference', function() {
      checkForNativeMethods(function() {
        _.difference([1,2,3], [2,30,40]);
      });



      it('should return the difference between two arrays', function() {
        var diff = _.difference([1,2,3], [2,30,40]);

        expect(diff).to.eql([1,3]);
      });

      it('should return the difference between three arrays', function() {
        var result = _.difference([1, 2, 3, 4], [2, 30, 40], [1, 11, 111]);

        expect(result).to.eql([3, 4]);
      });

    });

    describe('throttle, when given a wait of 100ms', function() {
      var callback;

      beforeEach(function() {
        callback = sinon.spy();
      });

      checkForNativeMethods(function() {
        _.throttle(callback, 100);
      });

_.throttle = function(callback, delay){
  var standby = false;
  return function(){
    if(!standby){
      callback.call();
      standby = true;
      setTimeout(function(){
        standby = false;
      }, delay);
    }
  };
};


      it('should return a function callable twice in the first 200ms', function() {
        var fn = _.throttle(callback, 100);
        fn(); // called
        setTimeout(fn, 50);
        setTimeout(fn, 100); // called
        setTimeout(fn, 150);
        setTimeout(fn, 199);
        clock.tick(200);

        expect(callback).to.have.been.calledTwice;
      });

    });

  });

  function checkForNativeMethods(runUnderbarFunction) {
    it('should not use the native version of any underbar methods in its implementation', function() {
      // These spies are set up in testSupport.js
      runUnderbarFunction();
      expect(Array.prototype.map.called).to.equal(false);
      expect(Array.prototype.indexOf.called).to.equal(false);
      expect(Array.prototype.forEach.called).to.equal(false);
      expect(Array.prototype.filter.called).to.equal(false);
      expect(Array.prototype.reduce.called).to.equal(false);
      expect(Array.prototype.every.called).to.equal(false);
      expect(Array.prototype.some.called).to.equal(false);
    });
  }
}());
