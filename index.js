const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

const questions = [
    {
        name: "Username",
        message: "Enter your GitHub username:"
      },
      {
        name: "Title",
        type: "input",
        message: "Provide a project title."
      },
      {
        name: "Description",
        type: "input",
        message: "Provide a description of the project."
      },
      {
        name: "Installation",
        type: "input",
        message: "How is the project installed?"
      },
      {
        name: "Usage",
        type: "input",
        message: "How can the project be used?"
      },
      {
        name: "License",
        type: "input",
        message: "Does the project require a license?"
      },
      {
        name: "Credits",
        type: "input",
        message: "Who contributed to the project?"
      },

];

function init() {
    inquirer
  .prompt(questions)
  .then(function(response) {
    const queryUrl = `https://api.github.com/users/${response.Username}`;
     axios.get(queryUrl).then(function(res) {
         const data = 
         `# ${response.Title} 
         \n## Description \n${response.Description}

         \n## Table of Contents 
         \n* [Installation](#installation) 
         \n* [Usage](#usage) 
         \n* [License](#license) 
         \n* [Contribution](#contribution) 
         \n* [Test](#test) 
         \n* [Questions](#questions)

         \n## Installation \n${response.Installation} 
         \n## Usage \n${response.Usage} 
         \n## License \n${response.License} 
         \n## Contribution \n${response.Credits} 
         \n## Tests 
         \n## Questions 
         \n ![profile image](${res.data.avatar_url}) 
         \n${res.data.email} \n`;

         fs.writeFile("README.md", data, function(err) {

          if (err) {
            return console.log(err);
          }
        
          console.log("README Generated!");
        
        })
     });
  });
}

init();