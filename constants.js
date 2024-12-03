const API_AUTH_URL = "https://grs-accountmanager-dev.azurewebsites.net";
const API_BASE_URL = "https://grs-logic-dev.azurewebsites.net";

const questions = [
  {
    type: 'number',
    name: 'originLat',
    message: "What is your starting latitude?",
  },
  {
    type: 'number',
    name: 'originLng',
    message: "what is your starting longitude"
  },
  {
    type: 'number',
    name: 'destinationLat',
    message: "what is your destination latitude"
  },
  {
    type: 'number',
    name: 'destinationLng',
    message: "what is your destination longitude"
  },
  {
    type: 'number',
    name: 'numSeats',
    message: "How many seats do you need?"
  },
];

module.exports = {
    questions,
    API_AUTH_URL,
    API_BASE_URL,
};
