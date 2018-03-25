import calculate from "./calculate";

var registerPromiseWorker = require("promise-worker/register");

registerPromiseWorker(function(obj) {
  return calculate.generateSets(obj.skillsWanted, obj.includeCharms);
});
