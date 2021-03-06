// test data type ResultSet

var assert = require('assert');
var Complex = require('../../lib/type/Complex');
var ResultSet = require('../../lib/type/ResultSet');

describe('ResultSet', function () {

  it('should create a ResultSet without entries', function () {
    var r = new ResultSet();
    assert.deepEqual(r, {entries: []});
  });

  it('should create a ResultSet with entries', function () {
    var r = new ResultSet([1,2,3]);
    assert.deepEqual(r, {entries: [1,2,3]});
  });

  it('should throw an error when called without the new operator', function () {
    assert.throws(function () {ResultSet([1,2,3]);});
  });

  it('should return an Array when calling valueOf()', function () {
    var r = new ResultSet([1,2,3]);
    assert.deepEqual(r.valueOf(), [1,2,3]);
  });

  it('should return a string when calling toString()', function () {
    var r = new ResultSet([1,2,3, new Complex(4, 5)]);
    assert.deepEqual(r.toString(), '[1, 2, 3, 4 + 5i]');
  });

  it('toJSON', function () {
    var r = new ResultSet([1,2,3]);
    var json = {"mathjs":"ResultSet","entries":[1,2,3]};
    assert.deepEqual(r.toJSON(), json);
  });

  it('fromJSON', function () {
    var r1 = new ResultSet([1,2,3]);
    var json = {"mathjs":"ResultSet","entries":[1,2,3]};
    var r2 = ResultSet.fromJSON(json);
    assert(r2 instanceof ResultSet);
    assert.deepEqual(r2, r1);
  });

});