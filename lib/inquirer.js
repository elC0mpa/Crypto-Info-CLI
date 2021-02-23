const inquirer = require("inquirer");
const autocomplete = require("inquirer-autocomplete-prompt");
const fuzzy = require("fuzzy");
inquirer.registerPrompt("autocomplete", autocomplete);

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
        choices: ["Favorite cryptos", "Currency", "Items per page"],
      },
    ];
    return inquirer.prompt(options);
  },
  favoriteCryptosActions: () => {
    const options = [
      {
        name: "action",
        type: "list",
        message: "What do you want to do with your favorite cryptos?",
        choices: ["Add new crypto", "Delete existing crypto"],
      },
    ];
    return inquirer.prompt(options);
  },
  insertNewCrypto: (cryptos) => {
    const options = [
      {
        name: "crypto",
        type: "autocomplete",
        message:
          "Insert the name of the crypto you would like to set as favorite!!",
        source: function (answersSoFar, input) {
          input = input || "";
          return new Promise(function (resolve) {
            setTimeout(function () {
              var fuzzyResult = fuzzy.filter(input, cryptos);
              const results = fuzzyResult.map(function (el) {
                return el.original;
              });

              results.splice(5, 0, new inquirer.Separator());
              results.push(new inquirer.Separator());
              resolve(results);
            }, 100);
          });
        },
      },
    ];
    try {
      return inquirer.prompt(options);
    } catch (error) {
      console.log(error);
    }
  },
  deleteNewCrypto: (cryptos) => {
    const options = [
      {
        name: "crypto",
        type: "autocomplete",
        message:
          "Insert the name of the crypto you want to remove from favorite!!",
        source: function (answersSoFar, input) {
          input = input || "";
          return new Promise(function (resolve) {
            setTimeout(function () {
              var fuzzyResult = fuzzy.filter(input, cryptos);
              const results = fuzzyResult.map(function (el) {
                return el.original;
              });

              results.splice(5, 0, new inquirer.Separator());
              results.push(new inquirer.Separator());
              resolve(results);
            }, 100);
          });
        },
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
        choices: [
          "HOUR_24_DESC",
          "HOUR_24_ASC",
          "GECKO_DESC",
          "GECKO_ASC",
          "PRICE_DESC",
          "PRICE_ASC",
          "TRUST_SCORE_DESC",
        ],
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
  waitKeyPress: (message = "Would you like to do something else?") => {
    const options = [
      {
        name: "option",
        type: "confirm",
        message,
      },
    ];
    return inquirer.prompt(options);
  },
};
