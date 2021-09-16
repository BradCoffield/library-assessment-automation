const fs = require("fs");

module.exports = (
  testMetadata,
  studentsData,
  preTestTallied,
  postTestTallied
) => {
  const scoringReport = (data) => {
    let content = `
*${data.whichTest}*

Outcome One: ${data.outcomeOne.sum} | Out of a possible: ${
      data.outcomeOne.outOfPossible
    } | Percentage ${data.outcomeOne.sum / data.outcomeOne.outOfPossible}  
Outcome Two: ${data.outcomeTwo.sum} | Out of a possible: ${
      data.outcomeTwo.outOfPossible
    } | Percentage ${data.outcomeTwo.sum / data.outcomeTwo.outOfPossible}  
Outcome Three: ${data.outcomeThree.sum} | Out of a possible: ${
      data.outcomeThree.outOfPossible
    } | Percentage ${data.outcomeThree.sum / data.outcomeThree.outOfPossible}  
Outcome Four: ${data.outcomeFour.sum} | Out of a possible: ${
      data.outcomeFour.outOfPossible
    } | Percentage ${data.outcomeFour.sum / data.outcomeFour.outOfPossible}`;

    return content;
  };

  const content = `**${testMetadata.area} ${testMetadata.semester} ${
    testMetadata.year
  }**

**${studentsData.tookBoth.length} STUDENTS TOOK BOTH:**
${studentsData.tookBoth.join("\n")}

**${studentsData.tookOneOnly.length} STUDENTS ONLY TOOK ONE:**
${studentsData.tookOneOnly.join("\n")}

**Scores**

Number of students: ${studentsData.tookBoth.length}
${scoringReport(preTestTallied)}
${scoringReport(postTestTallied)}


Report run: ${new Date().toLocaleDateString()}
`;

let reportFileName = `./reports/${testMetadata.area} ${testMetadata.semester} ${
    testMetadata.year
  }_${Date.now()}.md`;
  // console.log(content);

  try {
    const data = fs.writeFileSync(reportFileName, content);
    console.info("Report written successfully!");
    //file written successfully
  } catch (err) {
    console.error(err);
  }
};
