import calculate from "./calculate";

var registerPromiseWorker = require("promise-worker/register");

registerPromiseWorker(function(message) {
  return calculate.generateSets(message);
});
