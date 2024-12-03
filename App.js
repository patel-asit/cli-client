import inquirer from 'inquirer';
import axios from 'axios';
import crypto from 'crypto';
import { questions, API_AUTH_URL, API_BASE_URL } from './constants.js';


runApp();

async function runApp(){
  inquirer.prompt(questions).then(async answers => {
    // let userID, logicToken, dbToken;

    console.log("Please wait while we log you in...");
    let {userID, logicToken, dbToken} = await getLoginCredentials(answers.email, answers.password);
    console.log("Login successful. Fetching your Posts...");

    let headers = createHeaders(userID, logicToken, dbToken);
    let url = `${API_BASE_URL}/api/Posts/${userID}`;
    
    axios.get(url, {headers: headers})
    .then(function (response) {
      console.log("\nYour Posts: ");
      console.log(response.data);
    })
    .catch(function (error) {
      handleError(error.response.status, error.response.statusText, error.response.data);
    });
  });
}


async function getLoginCredentials(email, password){
  let url = API_AUTH_URL + "/api/Users/PasswordLogin";
  let userID, logicToken, dbToken;

  let payload = {
    "email": email,
    "password": hashPassword(password)
  };

  await axios.post(url, payload, createHeaders())
  .then(function (response) {
    userID = response.data.user_id;
    logicToken = response.data.logic_token;
    dbToken = response.data.db_token;
  })
  .catch(function (error) {
    handleError(error.response.status, error.response.statusText, error.response.data);
  });

  return {userID, logicToken, dbToken};  
}

function createHeaders(userID, logicToken, dbToken){
  let headers = {
    "Content-Type": "application/json",
    "X-User-ID": userID ?? "",
    "X-Db-Token": dbToken ?? "",
    "Authorization": `Bearer ${logicToken}` ?? ""
  };
  return headers;
}

function hashPassword(passwordStr){
  return crypto.createHash('sha256').update(passwordStr).digest('hex');
}

function handleError(statusCode, statusMessage, responseData){
  console.log("[Error: " + statusCode + " " + statusMessage + "] " + responseData);
  if(statusCode == 500 || statusCode == 404){
    console.log("Please try again later. Exiting...");
    process.exit(1); // Exit with error
  }else if(statusCode == 400 || statusCode == 401){
    console.log("Please try again...");
    runApp();
  }
}