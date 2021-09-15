const csv = require("csvtojson");
const regEx = /@.*$/; //using this regex throughout to remove '@emaildomain.com' because sometimes students mistakenly put @gmail.com instead of @rocky.edu

module.exports = async function (preTestCSV, postTestCSV) {
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
    postTestDataForTallying: postTestDataForUse,
  };
};
