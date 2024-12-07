### A CLI Application for Go Ride Sharing App

This is a simple CLI application that touches the backend of [Go Ride sharing app](https://github.com/Go-Ride-Share).

This cli applicaiton is implementing a key feature of the Go Ride Sharing app, which is the ability to view your own posts after logging in.

## Getting Started

### Installation
Clone this repository and run the following command in the root directory of the project:
```npm install```

### Usage
To run the application, run the following command in the root directory of the project:
```npm start```

To exit the application, press `Ctrl + C`.

You should be able to use email id testapp@email.com and password `12345678` to login and view sample posts that are already created.

### Debugging

If the logins fail, you might have to visit the app website and create an account for yourself [here](https://salmon-bay-0bbe0cf0f.5.azurestaticapps.net/signup). And perhaps some posts as well, so that you can view them using this CLI application.

### WORKSHEET

Why did using distributed/n-tier make this straightforward to add the interface?
- Using the n-tier architecture made it straightforward to add the interface because the business logic was already separated by functionality, making it easy to create functions that pull results from the logic API.

Did this code base actually adhere to n-tier (are concepts leaking between layers)?
- Yes, the codebase adhered to the n-tier architecture. The separation of concerns was well-maintained, ensuring that each layer handled its specific responsibilities without unnecessary overlap.

Was the documentation in the project (architecture diagram, issues) accurate and understandable?
- The documentation provided by the team was comprehensive and well-prepared. The architecture diagram was clear and easy to follow, and the issues were well-documented.

Did you have to change code outside of the UI layer? Where and why, or why not?
- No, I did not need to modify any code outside of the UI layer. The Logic API was well-structured, adhering to common HTTP protocols and practices. This allowed me to log in and retrieve data with a single, standard HTTP call.
