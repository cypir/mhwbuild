import calculate from "./calculate";

// // Respond to message from parent thread
// self.addEventListener("message", event => {
//   let sets = calculate.generateSets(event.data);

//   // Post data to parent thread
//   self.postMessage(sets);
// });

// worker.js
var registerPromiseWorker = require("promise-worker/register");

registerPromiseWorker(function(message) {
  return calculate.generateSets(message);
});
