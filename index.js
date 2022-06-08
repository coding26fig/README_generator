const inquirer = require("inquirer");
const fs = require("fs");
inquirer
  .prompt([
    {
      type: "input",
      message: "What is the title of your project?",
      name: "Title",
    },
    {
      type: "input",
      message: "Please provide some general information about your project",
      name: "GeneralInfo",
    },
    {
      type: "input",
      message: "Please provide installation instructions for your App?",
      name: "Instructions",
    },
    {
      type: "input",
      message: "How can your application be used?",
      name: "Usage",
    },
    {
      type: "list",
      message: "Please select the license used for this app?",
      name: "License",
      choices: ["MIT", "GPLv2", "Apache", "None"],
    },
    {
      type: "input",
      message: "Please list all who contributed to this app",
      name: "Contributors",
    },
    {
      type: "input",
      message: "Please list the necessary tests to run?",
      name: "TestDirections",
    },
    {
      type: "input",
      message: "What is your github username if people have questions?",
      name: "Github",
    },
    {
      type: "input",
      message: "What is your email if people have questions?",
      name: "Email",
    },
  ])
  .then((data) => {
    let badge = "";
    let license = "";
    let link = "";

    if (data.License === "MIT") {
      badge =
        "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
      license = "mit";
      link = "https://choosealicense.com/licenses/mit/";
    } else if (data.License === "GPLv2") {
      badge =
        "[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)";
      license = "GPLv2";
      link = "https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html";
    } else if (data.License === "Apache") {
      badge =
        "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
      license = "Apache";
      link = "https://choosealicense.com/licenses/apache-2.0/";
    } else if (data.License === "None") {
      badge = "<img src='https://img.shields.io/badge/license-none-blue.svg'>";
      license = "None";
      link = "https://choosealicense.com/licenses/unlicense/";
    }

    readMeString = `
${badge}

# Table of Contents
1. [${data.Title}](#title)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Contributors](#contributors)
5. [Tests](#tests)
6. [Questions](#questions)
7. [License](#license)


<div id='title' />
# ${data.Title}

${data.GeneralInfo}

<div id='installation' />
## Installation

${data.Instructions}

<div id='usage' />
## Usage

${data.Usage}

<div id='contributors' />
## Contributors

${data.Contributors}

<div id='tests' />
##Tests

${data.TestDirections}

<div id='questions' />
##Questions

please contact me at https://github.com/${data.Github} or ${data.Email} if you have any questions!

<div id='license' />
## License
[${data.License}](${link})
    `;

    fs.writeFile("README.md", readMeString, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("README created!");
      }
    });
  });
