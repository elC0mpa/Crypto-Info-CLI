const inquirer = require("inquirer");

module.exports = {
  askCurrencyInfo: () => {
    const questions = [
      {
        name: "currency",
        type: "list",
        message: "Select your currency:",
        choices: ["USD", "EUR", "JPY", "CAD", "NZD", "GBP", "CHF", "AUD"],
        validate: function (value) {
          if (value.length > 1) {
            return "Select just one option";
          } else if (value.length == 0) {
            return "You must select an option";
          } else {
            return true;
          }
        },
      },
    ];
    return inquirer.prompt(questions);
  },
  showMainMenu: () => {
    const options = [
      {
        name: "option",
        type: "list",
        message: "What do you want to do?",
        choices: ["Configuration", "Show Market Data", "Show Historical Data"],
      },
    ];
    return inquirer.prompt(options);
  },
  waitKeyPress: () => {
    const options = [
      {
        name: "option",
        type: "confirm",
        message: "Would you like to do something else?",
      },
    ];
    return inquirer.prompt(options);
  },
};
