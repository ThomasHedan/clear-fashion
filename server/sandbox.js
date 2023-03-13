/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./eshops/circle');



async function sandbox () {
  //2022-02-00T19:01:29.070Z
  var x = new Date();
  x = x- 4*1000*60*60*24;
  y = new Date(x);
  console.log(y.toISOString())
}



sandbox();
