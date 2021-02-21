const inquirer = require("inquirer");

module.exports = {
  askCurrencyInfo: () => {
    const questions = [
      {
        name: "currency",
        type: "list",
        message: "Select your currency:",
        choices: [
          "USD",
          "BTC",
          "EUR",
          "JPY",
          "CAD",
          "NZD",
          "GBP",
          "CHF",
          "AUD",
        ],
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
  askItemsPerPageInfo: () => {
    const questions = [
      {
        name: "per_page",
        type: "list",
        message: "Select items to show per page:",
        choices: ["5", "10", "15", "20", "30"],
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
  showConfigMenu: () => {
    const options = [
      {
        name: "config",
        type: "list",
        message: "Select an option",
        choices: ["Currency", "Items per page"],
      },
    ];
    return inquirer.prompt(options);
  },
  showMainMenu: () => {
    const options = [
      {
        name: "option",
        type: "list",
        message: "What do you want to do?",
        choices: [
          "Show Market Data",
          "Sort crypto currencies by...",
          "Show Historical Data",
          "Configuration",
        ],
      },
    ];
    return inquirer.prompt(options);
  },
  showSortMenu: () => {
    const options = [
      {
        name: "order",
        type: "list",
        message: "Select the order method",
        choices: ["HOUR_24_DESC", "HOUR_24_ASC"],
      },
    ];
    return inquirer.prompt(options);
  },
  showPaginationMenu: (page) => {
    const options =
      page === 1
        ? [
            {
              name: "pagination",
              type: "list",
              message: "Pagination",
              choices: ["Next ->", "Enough"],
            },
          ]
        : [
            {
              name: "pagination",
              type: "list",
              message: "Select the order method",
              choices: ["<- Back", "Next ->", "Enough"],
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
