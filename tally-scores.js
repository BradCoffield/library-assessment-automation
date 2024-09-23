module.exports = async (rawData, whichTest) => {
  const scoresArray = [];
  const arrayOfStudents = [];
  const OutcomeOneRange = { begin: 0, end: 4, totalQuestionsInRange: 4 };
  const OutcomeTwoRange = { begin: 4, end: 8, totalQuestionsInRange: 4 };
  const OutcomeThreeRange = { begin: 8, end: 13, totalQuestionsInRange: 5 };
  const OutcomeFourRange = { begin: 13, end: 15, totalQuestionsInRange: 2 };

  const getNameAndScores = (obj) => {
    if (obj == undefined) {
      return;
    }
    const tempObj = {};
    tempObj.name = obj["Name"];
    scoresArray.length = 0;
    iterateObject(obj);
    //NOTE: these slice parameters are valid for the old pre/post test that was 5 questions in each outcome, 20 total questions.
    tempObj.OutcomeOne = addArrayValues(
      scoresArray.slice(OutcomeOneRange.begin, OutcomeOneRange.end)
    );
    tempObj.OutcomeTwo = addArrayValues(
      scoresArray.slice(OutcomeTwoRange.begin, OutcomeTwoRange.end)
    );
    tempObj.OutcomeThree = addArrayValues(
      scoresArray.slice(OutcomeThreeRange.begin, OutcomeThreeRange.end)
    );
    tempObj.OutcomeFour = addArrayValues(
      scoresArray.slice(OutcomeFourRange.begin, OutcomeFourRange.end)
    );
    arrayOfStudents.push(tempObj);
    return;
  };

  const iterateObject = (obj) => {
    for (prop in obj) {
      if (typeof obj[prop] == "object") {
        iterateObject(obj[prop]);
      } else {
        if (prop.substr(-7) == "[Score]" && obj[prop].charAt(0) != "-") {
          scoresArray.push(parseFloat(obj[prop].charAt(0)));
        }
        if (prop == "Score") {
          scoresArray.push(parseFloat(obj["Score"].charAt(0)));
        }
      }
    }
  };

  function addArrayValues(arr) {
    let total = 0;

    arr.forEach((i) => {
      if (typeof i === "number") {
        total += i;
      } else total = false;
    });

    return total;
  }

  function sumScoresAcrossOutcome(arr, outcome) {
    let total = null;
    arr.forEach((i) => {
      if (typeof i[outcome] === "number") {
        total += i[outcome];
      } else {
        return false;
      }
    });
    return total;
  }

  /* Starting Things */
  rawData.forEach((i) => getNameAndScores(i));

  //   const possiblePoints = arrayOfStudents.length * 5;
  const sumOutcomeOne = sumScoresAcrossOutcome(arrayOfStudents, "OutcomeOne");
  const sumOutcomeTwo = sumScoresAcrossOutcome(arrayOfStudents, "OutcomeTwo");
  const sumOutcomeThree = sumScoresAcrossOutcome(
    arrayOfStudents,
    "OutcomeThree"
  );
  const sumOutcomeFour = sumScoresAcrossOutcome(arrayOfStudents, "OutcomeFour");

  return {
    whichTest,
    numberOfStudents: arrayOfStudents.length,
    outcomeOne: {
      sum: sumOutcomeOne,
      outOfPossible:
        arrayOfStudents.length * OutcomeOneRange.totalQuestionsInRange,
    },
    outcomeTwo: {
      sum: sumOutcomeTwo,
      outOfPossible:
        arrayOfStudents.length * OutcomeTwoRange.totalQuestionsInRange,
    },
    outcomeThree: {
      sum: sumOutcomeThree,
      outOfPossible:
        arrayOfStudents.length * OutcomeThreeRange.totalQuestionsInRange,
    },
    outcomeFour: {
      sum: sumOutcomeFour,
      outOfPossible:
        arrayOfStudents.length * OutcomeFourRange.totalQuestionsInRange,
    },
  };
};
