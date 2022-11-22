/* 

    USAGE: 
      * You'll probably need to change the slice parameters at the top of tally-scores.js. OutcomeOneRange etc
      * Change testMetadata in this file with the appropriate values
      * 
      * Download the CSV from Google Drive / Docs for the assessment you wish to process.
      * Change the variables preTestCSV and postTestCSV to point to them.
      * Change the values in the object testMetadata below.

*/

(async function () {
  const preparingTheData = require("./preparing-the-data");
  const tallyScores = require("./tally-scores");
  const outputTextReport = require("./output-text-report");

  let testMetadata = (test) => {
    return {
      area: "Biology",
      semester: "Fall",
      year: "2022",
      whichTest: test
    };
  };
  let preTestMetadata = testMetadata("Pre-Test");
  let postTestMetadata = testMetadata("Post-Test");

  /* 
      Our source test results
  */
  const preTestCSV = "./csv/Biology Pre-Test - RMC Library - Fall2022.csv";
  const postTestCSV = "./csv/Biology Post-Test - RMC Library - Fall2022.csv";

  // const preTestCSV = "./csv/old/Spring2021 - Library Prestest - ENG119Reynolds.csv";
  // const postTestCSV = "./csv/old/Spring2021 - Library Post-test - ENG119Reynolds.csv";

  /* 
      This file does a fair bit:
        * Normalize email addresses
        * Uses emails to determine who took both the pre and post tests
        * Creates new array of test scores that only includes students who took both and another of the rest
        * If after examining the list of students who took only one test you discover that there are people who really took both on that list, go back to source files and adjust the discrepancies. 
  */
  let processedData = await preparingTheData(preTestCSV, postTestCSV);
  let processedDataReport = {
    tookBoth: processedData.tookBoth,
    tookOneOnly: processedData.tookOneOnly,
  };

  /* 
      Takes our processed data and then 
        * tallies the scores 
        * uses ACRL outcomes to section the scores
  */
  const preTestTallied = await tallyScores(
    processedData.preTestDataForTallying,
    preTestMetadata.whichTest
  );
  const postTestTallied = await tallyScores(
    processedData.postTestDataForTallying,
    postTestMetadata.whichTest
  );

  /* 
      Now we build a report in markdown and save it to ./reports/
 */
  outputTextReport(
    testMetadata(),
    processedDataReport,
    preTestTallied,
    postTestTallied
  );
})();
