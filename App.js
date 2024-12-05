import inquirer from 'inquirer';
import axios from 'axios';
import crypto from 'crypto';
import { questions, API_AUTH_URL, API_BASE_URL } from './constants.js';

let terminateCLI = false;
main();

async function main(){

  while(!terminateCLI){
    let answers = await inquirer.prompt(questions);
    console.log("Please wait while we log you in...");
    let {userID, logicToken, dbToken} = await getLoginCredentials(answers.email, answers.password);

    // login was successful
    if(userID && logicToken && dbToken){
      console.log("Login successful. Fetching your Posts...");
      await getPosts(userID, logicToken, dbToken);
    }
  }
}

async function getPosts(userID, logicToken, dbToken){
  let headers = createHeaders(userID, logicToken, dbToken);
    let url = `${API_BASE_URL}/api/Posts/${userID}`;
    
    await axios.get(url, {headers: headers})
    .then(function (response) {
      console.log("\nYour Posts: ");
      console.log(response.data);
      terminateCLI = true;
    })
    .catch(function (error) {
      handleError(error);
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
    handleError(error);
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

function handleError(error){
  if (error.code === 'ENOTFOUND') {
    console.error("Error: Invalid URL or the domain cannot be reached.");
    exitApp();
  } else if (error.response) {
    // The server responded with a status code outside the range of 2xx
    console.log("[Error: " + error.response.status + " " + error.response.statusText + "] " + error.response.data);
    
    if(error.response.status == 400 || error.response.status == 401){
      console.log("Please try again...");
    }else{
      console.error("Please try again later.");
      exitApp();
    }
  } else {
    // Something else happened
    console.error("Unexpected error:", error.message);
    exitApp();
  }
}

function exitApp(){
  console.log("Exiting...");
  terminateCLI = true;
}