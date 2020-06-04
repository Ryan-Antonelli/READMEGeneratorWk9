const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

inquirer.prompt ([
  {
    type: "input",
    name: "github",
    message: "What is your GitHub username?"
  },
  {
    type: "input",
    name: "email",
    message: "What is your email address?"
  },
  {
    type: "input",
    name: "title",
    message: "What is the name of your project?"
  },
  {
    type: "input",
    name: "description",
    message: "Please write a short description of your project"
  },
  {
    type: "list",
    name: "license",
    message: "What kind of license should your project have?",
    choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
  },
  {
    type: "input",
    name: "installation",
    message: "How is your project installed?"
  },
  {
    type: "input",
    name: "test",
    message: "What command should be run to run tests?",
    default: "npm test"
  },
  {
    type: "input",
    name: "contributing",
    message: "How can a user contribute to the project?",
  }
])
    .then(function (res) {
        const queryURL = `https://api.github.com/users/${res.github}`;

        axios.get(queryURL).then( function(res) {
            const avatar = res.data.avatar_url;
            const email = res.data.email;


            `![avatar](${avatar});


            ## ${res.title}![WordPress Theme Active Installs](https://img.shields.io/wordpress/theme/installs/twentysixteen)
            ${res.title}
            ## Table of contents
            - [Installation](#Installation)
            - [License](#License)
            - [Contributing](#Contributing)
            - [Test](#Test)
            - [Contact](#Contact)
            ## Installation
            ${res.installation}
            ## License
            ${res.liscence}
            ## Contributing
            ${res.contributing}
            ## Test
            ${res.test}
            ## Contact
            <${email}>(mailto:${email})`
  
              fs.writeFile('REAMDE.md', md, function (err) {
                  if (err) throw err
                  console.log("Here's your REAMDE")
              })
          })
    })

