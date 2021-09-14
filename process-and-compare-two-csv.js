// TODO: when seeing if students are in both will need to normalize the strings. Also, will need to output the names in each that didn't get included to check for people who somehow should have been included but typoed too badly

// should prob compare email addresses

const csv = require("csvtojson");

(async function () {
  /* Source files */
  const preTestCSV = "./csv/Spring2021 - Library Prestest - ENG119Reynolds.csv";
  const postTestCSV =
    "./csv/Spring2021 - Library Post-test - ENG119Reynolds.csv";

  const preTestJson = await csv().fromFile(preTestCSV);
  const postTestJson = await csv().fromFile(postTestCSV);

  const removeStudentsWhoDidNotTakeBothTests = (preTest, postTest) => {
    //pull all of the emails and make them uppercase and remove leading/trailing spaces. Emails are unique and potentially less prone to error than their names. Maybe.

    let preTestEmails = preTest.map((i) => i.Email.toUpperCase().trim());
    let postTestEmails = postTest.map((i) => i.Email.toUpperCase().trim());

    const studentsWhoTookBoth = preTestEmails.filter((value) =>
      postTestEmails.includes(value)
    );
    return studentsWhoTookBoth;
  };

  const studentsWhoTookBoth = removeStudentsWhoDidNotTakeBothTests(
    preTestJson,
    postTestJson
  );

  /* So now, need to use the studentsWhoTookBoth array against the raw JSON and only care about those students */

const preTestDataForUse = preTestJson.filter((i) => {
return studentsWhoTookBoth.includes(i.Email.toUpperCase().trim())
})

const postTestDataForUse = postTestJson.filter((i) => {
return studentsWhoTookBoth.includes(i.Email.toUpperCase().trim())
})

 

})();
