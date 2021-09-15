module.exports = async (rawData, whichTest) => {
  const scoresArray = [];
  const arrayOfStudents = [];
  const OutcomeOneRange = { begin: 0, end: 5 };
  const OutcomeTwoRange = { begin: 5, end: 10 };
  const OutcomeThreeRange = { begin: 10, end: 15 };
  const OutcomeFourRange = { begin: 15, end: 20 };

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
        if (prop == "Score") {
          const valIWant = obj["Score"].charAt(0);
          scoresArray.push(parseFloat(valIWant));
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

  const possiblePoints = arrayOfStudents.length * 5;
  const sumOutcomeOne = sumScoresAcrossOutcome(arrayOfStudents, "OutcomeOne");
  const sumOutcomeTwo = sumScoresAcrossOutcome(arrayOfStudents, "OutcomeTwo");
  const sumOutcomeThree = sumScoresAcrossOutcome(
    arrayOfStudents,
    "OutcomeThree"
  );
  const sumOutcomeFour = sumScoresAcrossOutcome(arrayOfStudents, "OutcomeFour");
  console.log(`${whichTest}:`);
  console.log("Number of students = ", arrayOfStudents.length);
  console.log(
    `OutcomeOne: ${sumOutcomeOne} | Out of a possible: ${possiblePoints} | Percentage ${
      sumOutcomeOne / possiblePoints
    }  `
  );
  console.log(
    `OutcomeTwo: ${sumOutcomeTwo} | Out of a possible: ${possiblePoints} | Percentage ${
      sumOutcomeTwo / possiblePoints
    }  `
  );
  console.log(
    `OutcomeThree: ${sumOutcomeThree} | Out of a possible: ${possiblePoints} | Percentage ${
      sumOutcomeThree / possiblePoints
    }  `
  );
  console.log(
    `OutcomeFour: ${sumOutcomeFour} | Out of a possible: ${possiblePoints} | Percentage ${
      sumOutcomeFour / possiblePoints
    }  `
  );
};
