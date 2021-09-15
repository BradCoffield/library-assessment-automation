const csv = require("csvtojson");
const regEx = /@.*$/; //using this regex throughout to remove '@emaildomain.com' because sometimes students mistakenly put @gmail.com instead of @rocky.edu

// const OutcomeOneRange = {begin: 0, end: 5}
// const OutcomeTwoRange = {begin: 5, end: 10}
// const OutcomeThreeRange = {begin: 10, end: 15}
// const OutcomeFourRange = {begin: 15, end: 20}

module.exports = async function (preTestCSV, postTestCSV) {
  /* Source files */
  // const preTestCSV =
  //   "./csv/Spring2021 - Library Prestest - ENG119Reynolds.csv";
  // const postTestCSV =
  //   "./csv/Spring2021 - Library Post-test - ENG119Reynolds.csv";

  const preTestJson = await csv().fromFile(preTestCSV);
  const postTestJson = await csv().fromFile(postTestCSV);

  const removeStudentsWhoDidNotTakeBothTests = (preTest, postTest) => {
    //pull all of the emails and make them uppercase and remove leading/trailing spaces.
    //Emails used because they are more consistent because sometimes students will just use a first name on one test.

    let preTestEmails = preTest.map((i) =>
      i.Email.toUpperCase().trim().replace(regEx, "")
    );
    let postTestEmails = postTest.map((i) =>
      i.Email.toUpperCase().trim().replace(regEx, "")
    );

    const studentsWhoTookBoth = preTestEmails.filter((value) =>
      postTestEmails.includes(value)
    );
    return studentsWhoTookBoth;
  };

  let studentsWhoTookBoth = removeStudentsWhoDidNotTakeBothTests(
    preTestJson,
    postTestJson
  );

  /* So now, need to use the studentsWhoTookBoth array against the raw JSON and only care about those students */

  const preTestDataForUse = preTestJson.filter((i) =>
    studentsWhoTookBoth.includes(
      i.Email.toUpperCase().trim().replace(regEx, "")
    )
  );

  const postTestDataForUse = postTestJson.filter((i) =>
    studentsWhoTookBoth.includes(
      i.Email.toUpperCase().trim().replace(regEx, "")
    )
  );

  const studentsWhoOnlyTookOne = () => {
    const whoTookPretest = preTestJson.map((item) =>
      item.Email.toUpperCase().trim().replace(regEx, "")
    );
    const whoTookPosttest = postTestJson.map((item) =>
      item.Email.toUpperCase().trim().replace(regEx, "")
    );
    const preTestNotTakeBoth = whoTookPretest.filter(function (item) {
      return studentsWhoTookBoth.indexOf(item) === -1;
    });

    const postTestNotTakeBoth = whoTookPosttest.filter(function (item) {
      return studentsWhoTookBoth.indexOf(item) === -1;
    });
    const merged = [...preTestNotTakeBoth, ...postTestNotTakeBoth];
    return merged;
  };

  return {
    tookOneOnly: studentsWhoOnlyTookOne(),
    tookBoth: studentsWhoTookBoth,
    preTestDataForTallying: preTestDataForUse,
    postTestDataForTallying: postTestDataForUse

  };
};

