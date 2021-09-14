// const csvFilePath = "./see-es-vees/Spring2021 - Library Post-test - ENG119Reynolds.csv";
const csvFilePath = "./csv/Spring2021 - Library Prestest - ENG119Reynolds.csv";

const csv = require("csvtojson");

const arrayOfStudents = [];
const scoresArray = [];

// So, this will iterate over JSON to find nested keys and let me do something with them
// Currently, valIWant is either a 1 or 0 to represent correct or incorrect.
function iterateObject(obj) {
  console.log(obj);
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
}

//Convert our CSV to JSON and then get things started
csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    jsonObj.forEach((i) => getNameAndScores(i));
    const possiblePoints = arrayOfStudents.length * 5;
    const sumOutcomeOne = sumScoresAcrossOutcome(arrayOfStudents, "OutcomeOne");
    const sumOutcomeTwo = sumScoresAcrossOutcome(arrayOfStudents, "OutcomeTwo");
    const sumOutcomeThree = sumScoresAcrossOutcome(
      arrayOfStudents,
      "OutcomeThree"
    );
    const sumOutcomeFour = sumScoresAcrossOutcome(
      arrayOfStudents,
      "OutcomeFour"
    );
    // console.log("Array of students: ", arrayOfStudents);
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
  });

function getNameAndScores(obj) {
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
}

function addArrayValues(arr) {
  let total = 0;

  arr.forEach((i) => {
    if (typeof i === "number") {
      total += i;
    }  else total = false; 
  });

  return total;
}

function sumScoresAcrossOutcome(arr, outcome) {
  let total = null;
  arr.forEach((i) => {
     
    if (typeof i[outcome] === "number" ) {
     total += i[outcome];
    }
    else {return false}
  });
  return total;
}

module.exports = { iterateObject, addArrayValues, sumScoresAcrossOutcome };
