(async function () {
  const preparingTheData = require("./preparing-the-data");
  const tallyScores = require("./tally-scores");
  const outputTextReport = require("./output-text-report");

  let testMetadata = (whichTest) => {
    if (whichTest === "Pre-Test" || "Post-Test") {
      return {
        area: "Biology",
        semester: "Fall",
        year: "2021",
        whichTest,
      };
    }
    
  };
  let preTestMetadata = testMetadata("Pre-Test")
  let postTestMetadata = testMetadata("Post-Test")

  /* 
      Our source test results
  */
  const preTestCSV = "./csv/RMC Library PreTest 2021 - Biology.csv";
  const postTestCSV = "./csv/RMC Library PostTest 2021 - Biology.csv";

  // const preTestCSV = "./csv/old/Spring2021 - Library Prestest - ENG119Reynolds.csv";
  // const postTestCSV = "./csv/old/Spring2021 - Library Post-test - ENG119Reynolds.csv";

  /* 
      This file does a fair bit:
        * Normalize email addresses
        * Uses emails to determine who took both the pre and post tests
        * Creates new array of test scores that only includes students who took both 
        * If after examining the list of students who took only one test you discover that there are people who really took both on that list, go back to source files and adjust the discrepancies. 
  */
  let processedData = await preparingTheData(preTestCSV, postTestCSV);
  let processedDataReport = {tookBoth:processedData.tookBoth, tookOneOnly: processedData.tookOneOnly}

 

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
 
 outputTextReport(testMetadata(), processedDataReport, preTestTallied, postTestTallied  );
})();
