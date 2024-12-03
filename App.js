const inquirer = require('inquirer').default;
const { questions, API_BASE_URL } = require('./constants.js');

var userId = "";
var token = "";

inquirer.prompt({
  type: "list",
  name: "what",
  message: "What would you like to do?",
  choices: ['Exit']
})
.then((answer) => {
  if (answer.what === 'Exit') {
      process.exit();
  }
});
// runApp();

function runApp(){
  inquirer.prompt(questions).then(answers => {
    console.log(`${answers.originLat}`);
    console.log(`${answers.originLng}`);
    console.log(`${answers.destinationLat}`);
    console.log(`${answers.destinationLng}`);
    console.log(`${answers.numSeats}`);
  });
}

async function login(id, password){
  let URL = API_BASE_URL + "/api/verifylogincredentials";
  
  let payload = {
    "id": id,
    "password": password
  };


}
function searchPost(){};

function getLoginCredentials(id, password){

};

function createHeaders(){
  
}