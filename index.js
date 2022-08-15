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

      const preTestCSV = "./20212022csv/BioPreTest 2021.csv";
      const postTestCSV = "./20212022csv/BioPostTest 2021.csv";

            // const preTestCSV = "./20212022csv/ReynoldsPreSpring2022.csv";
            // const postTestCSV = "./20212022csv/ReynoldsPostSpring2022.csv";

  

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
