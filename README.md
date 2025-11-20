# Library Assessment Automation

Taking CSVs from Google Forms and analyzing them based on our assessment needs.

## What this does

- **Takes two CSV exports** from Google Forms (pre-test and post-test).
- **Normalizes student emails** and finds students who took both tests.
- **Tallies scores by outcome** (using ranges defined in `tally-scores.js`).
- **Generates a markdown report** in `./reports/` summarizing participation and scores.

The main entry point is `index.js`.

## Prerequisites

- Node.js (LTS or later) and npm installed.
- CSV exports from Google Forms for the assessment you want to process.
  - Each CSV should at least include `Name`, `Email`, and question score columns in the same format as the existing forms.

## Installation

1. Clone or download this repository.
2. From the project root, install dependencies:

```bash
npm install
```

## Preparing your data

1. **Export your Google Form results** (pre-test and post-test) as CSV files.
2. **Place the CSVs** in the `./csv/` directory (or another directory inside this project).
3. Open `index.js` and update:
   - `testMetadata` to reflect the current assessment:
     - `area` (e.g., "Biology")
     - `semester` (e.g., "Fall")
     - `year` (e.g., `2025`)
   - `preTestCSV` and `postTestCSV` to point to your actual CSV files, for example:

```js
const preTestCSV = "./csv/Your Pre-Test File.csv";
const postTestCSV = "./csv/Your Post-Test File.csv";
```

4. If your assessment uses **different question counts per outcome**, open `tally-scores.js` and adjust the `OutcomeOneRange`, `OutcomeTwoRange`, etc. so the `begin`, `end`, and `totalQuestionsInRange` values match your form structure.

5. Make sure there is a `./reports/` directory in the project root. If it does not exist, create it before running:

```bash
mkdir reports
```

## Running the script

From the project root, run:

```bash
node index.js
```

This will:

- Read the pre- and post-test CSVs.
- Normalize email addresses and determine:
  - Which students took **both** tests.
  - Which students took **only one** test.
- Tally scores by outcome for both the pre-test and post-test.
- Write a markdown report file into the `./reports/` directory.

## Output

- Reports are saved as markdown files under `./reports/` with a name like:

  ```
  <Area> <Semester> <Year>_<timestamp>.md
  ```

- Each report includes:
  - The assessment metadata (area, semester, year).
  - A list of students who took both tests.
  - A list of students who only took one test.
  - Outcome totals and percentages for pre-test and post-test.

## Report Troubleshooting

You may need to, after running a report, go back in and edit the CSV to get people from both reports who are obviously the same person but used different email addresses to be registered as the same person by making their emails match between the two CSVs.

## Adapting to other assessments

- If your Google Form uses different column names or structure, you may need to adjust:
  - `preparing-the-data.js` for how `Name` and `Email` are read and how students are matched.
  - `tally-scores.js` for how score columns are detected and grouped into outcomes.

Use the existing files and the comments in `index.js` and `tally-scores.js` as a reference when adapting the logic.