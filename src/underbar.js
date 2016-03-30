(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if(n === undefined){
      return array.pop();
    }else if(n === 0){
      return [];
    }else if(n > array.length){
      return array;
    }else{
      return array.slice(0 - n);
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
_.each = function(collection, callback){
  if(Array.isArray(collection)){
    for(var i = 0; i<collection.length; i++){
        callback(collection[i], i, collection);
    }
  }else{
    for(var prop in collection){
      callback(collection[prop], prop, collection);
    }
  }
};

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var res = [];
    _.each(collection, function(value){
      if(test(value)){
        res.push(value);
      }
    });
    return res;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    var res = [];
    _.each(collection, function(value){
      if(test(value) === false){res.push(value);}
    });
    return res;
  };

  // Produce a duplicate-free version of the array.
/*  _.uniq = function(array) {
    var args = Array.prototype.slice.call(arguments);
    var iteratee = args[2];
    var copyArray = array.slice().sort();
    var res = [];
    if(!args[1]){
      copyArray = copyArray.sort();
    }
    for(var i = 0; i < array.length; i++){
      if(typeof iteratee === "function"){
        if(iteratee(copyArray[i]) !== iteratee(copyArray[i+1])){
          res.push(copyArray[i]);
        }
      }else{
        if(copyArray[i] !== copyArray[i+1]){
        res.push(copyArray[i]);
        }
      }
    }
    return res;
  };*/

  _.uniq = function(array){
    var table = {};
    var res = [];
    for(var i = 0; i < array.length; i++){
      if(!table.hasOwnProperty(array[i])){
        res.push(array[i]);
        table[array[i]] = array[i];
      }
    }
    return res;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    var res = [];
    _.each(collection, function(value, i){
      res.push(iterator(value, i));
    });
    return res;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    if(arguments.length === 2){
      var argLen = 2;
    }
    _.each(collection, function(value, i){
      if(argLen === 2){
        accumulator = value;
        argLen++;
      }else{
        accumulator = iterator(accumulator, value, i);
      }
    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

/*  _.contains = function(collection, target) {
    return _.reduce(collection, function(wasFound, item) {
      return wasFound ? true : item === target;
    }, false);
  };*/


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    return _.reduce(collection, function(prev, curr){
        prev = !iterator ?
        !curr ? false : prev
        :
        !iterator(curr) ? false : prev;
      return prev;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if(!iterator){
      return !(_.every(collection, function(value){
        return !(value);
      }));
    }else{
      return !(_.every(collection, function(value){
        return !iterator(value);
      }));
    }
  };

/*_.some = function(collection, predicate){
  return _.reduce(collection, function(prev, curr){
    prev = !predicate ?
      curr ? true : prev :
      predicate(curr) ? true : prev;
      return prev;
  }, false);
};*/



  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
  var args = Array.prototype.slice.call(arguments);
  for(var i = 0; i < args.length; i++){
    for(var prop in args[i]){
      obj[prop] = args[i][prop];
    }
  }
  return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
  var args = Array.prototype.slice.call(arguments);
  for(var i = 0; i < args.length; i++){
    for(var prop in args[i]){
      if(obj[prop] === undefined){
        obj[prop] = args[i][prop];
      }
    }
  }
  return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var memo = {};
    return function (arg) {
      var args = Array.prototype.slice.call(arguments);
      if (memo.hasOwnProperty(arg)) {
        return memo[arg];
      } else {
        memo[args] = func.apply(this, args);
        return memo[args];
      }
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var callbackArgs = Array.prototype.slice.call(arguments, 2);
    return setTimeout(function () {
      return func.apply(null, callbackArgs);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var copy = Array.prototype.slice.call(array);
    var shuffled = [];
    for(var i = 0; i < array.length; i++){
      shuffled.push(copy.splice(Math.floor(Math.random() * copy.length), 1).pop());
    }
    return shuffled;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  var res = [];
  for(var i = 0; i < collection.length; i++){
    if(typeof functionOrKey === "function"){
      res.push(functionOrKey.apply(collection[i]));
    }
    if(typeof functionOrKey === "string"){
      res.push(collection[i][functionOrKey]());
    }
  }
  return res;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    return collection.sort(function(a,b){
      return typeof iterator === "function" ? iterator(a)-iterator(b) : a[iterator] - b[iterator];
    });
  };

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

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var args = Array.prototype.slice.call(arguments);
    var longest = _.sortBy(args.slice(0), "length").pop();
    return _.map(longest, function(value, index){
      return _.map(args, function(val){
        return val[index];
      });
    });
  };

/*_.zip = function(){
  var args = Array.prototype.slice.call(arguments);
  var count = _.sortBy(args.slice(0), "length").pop().length;
  var res = [];
  for(var i = 0; i < args.length; i++){
    res[i] = [];
    for(var j = 0; j < count; j++){
      res[i].push(args[j][i]);
    }
  }
  return res;
};*/

//using reduce
/*_.zip = function(){
  var args = Array.prototype.slice.call(arguments);
  var longest = _.sortBy(args.slice(0), "length").pop();
  return _.reduce(longest, function(prev,curr,i){
    var res = _.reduce(args, function(prevArg, currArg){
      prevArg.push(currArg[i]);
      return prevArg;
    },[]);
    prev.push(res);
    return prev;
  },[]);
};*/

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    nestedArray = _.reduce(nestedArray, function(prev,curr){
      return prev.concat(curr);
    }, []);
    return _.some(nestedArray, function(value){
      return Array.isArray(value);
    }) ? _.flatten(nestedArray) : nestedArray;
  };

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

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var args = Array.prototype.slice.call(arguments);
    var longest =  _.sortBy(args.slice(0), "length").pop();
    return _.reduce(longest, function(prev, value, index){
      var res = _.reduce(args, function(pre, val){
        if(_.contains(val,value)){
          pre.push(value);
        }
        return pre;
      },[]).length;
      if(res === args.length){
        prev.push(value);
      }
      return prev;
    }, []);
  };

  /*_.intersection = function(){
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
};*/

/*_.intersection = function(){
  var args = Array.prototype.slice.call(arguments);
  var longest =  _.sortBy(args.slice(0), "length").pop();
  return _.reduce(longest, function(prev, value, index){
    var res = _.map(args, function(val){
      if(_.contains(val,value)){
        return value;
      }
    });
    if(_.every(res, function(element){return element === value;})){
      prev.push(value);
    }
    return prev;
  }, []);
};*/

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var args = Array.prototype.slice.call(arguments);
    var longest =  args[0];
    return _.reduce(longest, function(prev, value, index){
      var res = _.reduce(args, function(pre, val){
        if(_.contains(val,value)){
          pre.push(value);
        }
        return pre;
      }, []);
      if(res.length === 1){
        prev.push(value);
      }
      return prev;
    }, []);
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  var standby = false;
    return function(){
      if(!standby){
        func.call();
        standby = true;
        setTimeout(function(){
          standby = false;
        }, wait);
      }
    };
  };
}());
