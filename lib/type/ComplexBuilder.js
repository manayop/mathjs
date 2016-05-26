'use strict'

var util = require('../util/index'),
    Unit = require('./Unit'),
    
    isNumber = util.number.isNumber,
    isUnit =  Unit.isUnit;

function ComplexBuilder() {

}

ComplexBuilder.construct = function(theArguments) {

    ComplexBuilder._checkArgumentCountExceeded(theArguments);

    var builderArgumentsCountMap = {
        0: function () {
          return ComplexBuilder._contructZero()
        },
        1: function (theArguments) {
          return ComplexBuilder._constructFromObject(theArguments)
        },
        2: function (theArguments) {
          return ComplexBuilder._constructFromNumbers(theArguments[0], theArguments[1])
        }
    }

    return builderArgumentsCountMap[theArguments.length](theArguments);

};


ComplexBuilder._contructZero = function() {

  return { re: 0, im: 0 };
};

ComplexBuilder._constructFromNumbers = function(real, imaginary) {
  ComplexBuilder._checkBothNumbers(real, imaginary);

  return {re: real, im: imaginary};
}

ComplexBuilder._constructFromObject = function(theArguments) {
    var arg = theArguments[0];
    ComplexBuilder._checkIsObject(arg);
    var construct;

    if(ComplexBuilder._hasBinomialParameters(arg)) {
      construct = ComplexBuilder._constructFromBinomial(arg); // pass on input validation

    } else {
      construct = ComplexBuilder._contructFromPolar(arg.r, arg.phi);
    }

    return construct;
};

ComplexBuilder._constructFromBinomial = function(arg) {
  return { re: arg.re, im: arg.im } ;
};


ComplexBuilder._contructFromPolar = function (r, phi) {

  ComplexBuilder._checkRaduisIsNumber(r);

  if (isUnit(phi) && phi.hasBase(Unit.BASE_UNITS.ANGLE)) {
    phi = phi.toNumber('rad');
  }

  ComplexBuilder._checkPhiIsNumber(phi);

  return {re: r * Math.cos(phi), im: r * Math.sin(phi)};

};

ComplexBuilder._hasBinomialParameters = function(subject) {
  return ('re' in subject && 'im' in subject);
};

ComplexBuilder._hasPolarParameters = function(subject) {
  return ('r' in subject && 'phi' in subject);
};

ComplexBuilder._checkIsObject = function(subject) {
  var isRightType = (typeof subject === 'object');
  var hasBinomialParameters = ComplexBuilder._hasBinomialParameters(subject);
  var hasPolarParameters = ComplexBuilder._hasPolarParameters(subject);

  if((!isRightType || !(hasBinomialParameters || hasPolarParameters))) {
    throw new SyntaxError('Object with the re and im or r and phi properties expected.');
  }
};

ComplexBuilder._checkArgumentCountExceeded = function(theArguments) {
  if (theArguments.length > 2) {
      throw new SyntaxError('One, two or three arguments expected in Complex constructor'); 
  }
};

ComplexBuilder._checkBothNumbers = function(aNumber, anotherNumber) {
  if (!isNumber(aNumber) || !isNumber(anotherNumber)) {
      throw new TypeError('Two numbers expected in Complex constructor');
    }
};

ComplexBuilder._checkRaduisIsNumber = function (subject) {
  if (!isNumber(subject)){
    throw new TypeError('Radius r is not a number.');
  }
};

ComplexBuilder._checkPhiIsNumber = function (subject) {
  if (!isNumber(subject)){
    throw new TypeError('Phi is not a number nor an angle unit.');
  }
};


module.exports = ComplexBuilder;