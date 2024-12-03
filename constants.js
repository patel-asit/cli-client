export const API_AUTH_URL = "https://grs-accountmanager-dev.azurewebsites.net";
export const API_BASE_URL = "https://grs-logic-dev.azurewebsites.net";

export const questions = [
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email:',
    validate: async (input) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input)) {
        return 'Please enter a valid email address. (e.g. abc@email.com)';
      }
      return true;
    }
  },
  {
    type: 'password',
    name: 'password',
    mask: '*',
    message: 'Enter your password:',
    validate: async (input) => {
      if (input.length < 8) {
        return 'Password must be at least 8 characters long';
      }
      return true;
    }
  }
];
