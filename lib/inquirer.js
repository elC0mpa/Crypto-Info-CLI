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
      // {
      //   name: "crypto",
      //   type: "checkbox",
      //   message: "Enter your crypto currency:",
      //   choices: ["BTC", "ETH"],
      //   validate: function (value) {
      //     if (value.length > 1) {
      //       return "Select just one option";
      //     } else if (value.length == 0) {
      //       return "You must select an option";
      //     } else {
      //       return true;
      //     }
      //   },
      // },
    ];
    return inquirer.prompt(questions);
  },
};
