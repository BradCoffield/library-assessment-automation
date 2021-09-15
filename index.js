(async function () {
  const preparingTheData = require("./preparing-the-data");
  const tallyScores = require("./tally-scores");

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

  /* 
      Logs that are part of our desired output.
  */
  console.log("\nClass: Biology Fall 2021 \n");
  console.log(
    `${processedData.tookBoth.length} STUDENTS TOOK BOTH:  `,
    processedData.tookBoth
  );
  console.log(
    `${processedData.tookOneOnly.length} STUDENTS ONLY TOOK ONE: `,
    processedData.tookOneOnly
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
