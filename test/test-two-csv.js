// var assert = require("chai").assert;
// const {
//   iterateObject,
//   addArrayValues,
//   sumScoresAcrossOutcome,
//   getNameAndScores,
// } = require("../process-and-compare-two-csv");

// describe("addArrayValues Tests", function () {
//   it("should add an array of numbers", () => {
//     assert.isNumber(addArrayValues([1, 1]));
//   });
//   it("should fail if a non-number is passed in", () => {
//     assert.isNotOk(addArrayValues(["cat", 1, "1"]));
//   });
// });

// describe("sumScoresAcrossOutcome Tests", () => {
//   const testArray = [
//     {
//       name: "Test Name",
//       OutcomeOne: 4,
//     },
//     {
//       name: "Test Name 2",
//       OutcomeOne: 4,
//     },
//   ];

//   it("Should add and return a number", () => {
//     assert.isNumber(sumScoresAcrossOutcome(testArray, "OutcomeOne"));
//   });
//   it("Should fail when passed anything incorrect", () => {
//     assert.isNotOk(sumScoresAcrossOutcome(testArray, "OutcomeFive"));
//     assert.isNotOk(sumScoresAcrossOutcome(["cats!"], "OutcomeOne"));
//     assert.isNotOk(sumScoresAcrossOutcome([true], "OutcomeOne"));
//     assert.isNotOk(sumScoresAcrossOutcome(["cats!"], true));
//   });
// });

// describe("iterateObject Testing", () => {
//   it("should fail if not passed an object", () => {
//     assert.isNotOk(iterateObject(false));
//     assert.isNotOk(iterateObject(true));
//     assert.isNotOk(iterateObject("cats!"));
//     assert.isNotOk(iterateObject(undefined));
//     assert.isNotOk(iterateObject(null));
//   });
// });

// describe("getNameAndScores Testing", () => {
//   it("should fail with not an object", () => {
//     assert.isNotOk(getNameAndScores(true));
//     assert.isNotOk(getNameAndScores(false));
//     assert.isNotOk(getNameAndScores(true));
//     assert.isNotOk(getNameAndScores("cats!"));
//     assert.isNotOk(getNameAndScores(undefined));
//     assert.isNotOk(getNameAndScores(null));
//   });
// });