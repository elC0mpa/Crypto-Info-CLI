const inquirer = require("inquirer");

module.exports = {
  askCurrencyInfo: () => {
    const questions = [
      {
        name: "currency",
        type: "checkbox",
        message: "Enter your currency:",
        choices: ["USD", "EUR"],
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
        choices: ["Configuration", "Show Market Data"],
        validate: function (value) {
          if (value !== 0 && value !== 1) {
            return "Select a valid option";
          } else {
            return true;
          }
        },
      },
    ];
    return inquirer.prompt(options);
  },
};
