(async function () {
  const preparingTheData = require("./preparing-the-data");
  const tallyScores = require("./tally-scores");

  // Our source files
  const preTestCSV = "./csv/Spring2021 - Library Prestest - ENG119Reynolds.csv";
  const postTestCSV =
    "./csv/Spring2021 - Library Post-test - ENG119Reynolds.csv";

  /* 
      This file does a fair bit:
        * Normalize email addresses
        * Uses emails to determine who took both the pre and post tests
        * Creates new array of test scores that only includes students who took both  
  */
  let processedData = await preparingTheData(preTestCSV, postTestCSV);

  console.log("STUDENTS WHO TOOK BOTH: ", processedData.tookOneOnly);
  console.log(
    "STUDENTS WHO ONLY TOOK ONE (their scores weren't tallied): ",
    processedData.tookBoth
  );

  /* 
      Takes our processed scores data and then 
        * tallies the scores 
        * logs out the scores based on defined ranges 
        * Defined ranges correspond to ACRL outcomes
  */
  await tallyScores(processedData.preTestDataForTallying, "Pre-Test");
  await tallyScores(processedData.postTestDataForTallying, "Post-Test");
})();
