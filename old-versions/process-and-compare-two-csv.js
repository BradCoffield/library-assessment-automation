const csv = require("csvtojson");
const regEx = /@.*$/; //using this regex throughout to remove '@emaildomain.com' because sometimes students mistakenly put @gmail.com instead of @rocky.edu

// const OutcomeOneRange = {begin: 0, end: 5}
// const OutcomeTwoRange = {begin: 5, end: 10}
// const OutcomeThreeRange = {begin: 10, end: 15}
// const OutcomeFourRange = {begin: 15, end: 20}


(async function () {
  /* Source files */
  const preTestCSV = "../csv/Spring2021 - Library Prestest - ENG119Reynolds.csv";
  const postTestCSV =
    "../csv/Spring2021 - Library Post-test - ENG119Reynolds.csv";

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

  const studentsWhoTookBoth = removeStudentsWhoDidNotTakeBothTests(
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

const getNameAndScores = (obj) => {
  if (obj == undefined) {
    return;
  }
  const tempObj = {};
  tempObj.name = obj["Name"];
  scoresArray.length = 0;
  iterateObject(obj);
  //NOTE: these slice parameters are valid for the old pre/post test that was 5 questions in each outcome, 20 total questions.
  tempObj.OutcomeOne = addArrayValues(scoresArray.slice(0, 5));
  tempObj.OutcomeTwo = addArrayValues(scoresArray.slice(5, 10));
  tempObj.OutcomeThree = addArrayValues(scoresArray.slice(10, 15));
  tempObj.OutcomeFour = addArrayValues(scoresArray.slice(15, 20));
  arrayOfStudents.push(tempObj);
  return;
}

console.log("Students who took both: ", studentsWhoTookBoth);
console.log("Students who didn't take both: ", studentsWhoOnlyTookOne());
})();
