var assert = require('assert');

function multiply(factor1, factor2) {
  return factor1 * factor2;
}

function testMultiply(){
  for (let i = 0; i < 100; ++i){
    let a = Math.random();
    let b = Math.random();
    let result = a*b;
    assert(multiply(a,b) === result, 'multiply failed');
  }
  return true;
}

(function(){
  let failed = false;
  r = testMultiply();
  if (r) { console.log('tests succeeded'); }
})();