let Table = require("cli-table3");
const chalk = require("chalk");
const market_data_head = [
  "Crypto",
  "Current price",
  "High 24 Hours",
  "Low 24 Hours",
  "24 Hours %",
  "7 Days %",
  "14 Days %",
  "30 Days %",
  "60 Days %",
  "200 Days %",
  "One year %",
];

const historical_data_head = [
  "Crypto",
  "Current price",
  "All Time High",
  "From All Time High %",
  "All Time High Date",
  "All Time Low",
  "From All Time Low %",
  "All Time Low Date",
];

const style = {
  "padding-left": 0,
  "padding-right": 0,
  hAlign: "center",
  head: [],
  border: ["yellow"],
};

module.exports = {
  printCurrencyInfo: (data) => {
    var table = new Table({
      head: market_data_head,
      style: style,
    });
    data.forEach((crypto) => {
      let array = [];
      for (let index = 0; index < crypto.length; index++) {
        const cell = crypto[index];
        if (index == 1) {
          array.push(chalk.cyan(cell));
        } else if (index > 3) {
          if (cell >= -5 && cell <= 5) {
            array.push(chalk.gray(cell));
          } else if (cell < -5 && cell >= -15) {
            array.push(chalk.redBright(cell));
          } else if (cell < -15 && cell >= -30) {
            array.push(chalk.redBright(cell));
          } else if (cell < -30) {
            array.push(chalk.red(cell));
          } else if (cell > 5 && cell <= 15) {
            array.push(chalk.green(cell));
          } else if (cell > 15 && cell <= 30) {
            array.push(chalk.green(cell));
          } else if (cell > 30) {
            array.push(chalk.greenBright(cell));
          }
        } else {
          array.push(cell);
        }
      }
      table.push(array);
    });
    console.log(table.toString());
  },
  printCurrencyHistoricalData: (data) => {
    var table = new Table({
      head: historical_data_head,
      style: style,
    });
    data.forEach((crypto) => {
      let array = [];
      for (let index = 0; index < crypto.length; index++) {
        const cell = crypto[index];
        if (index == 1) {
          array.push(chalk.cyan(cell));
        } else if (index == 2 || index == 6) {
          array.push(chalk.greenBright(cell));
        } else if (index == 3 || index == 5) {
          array.push(chalk.red(cell));
        } else {
          array.push(cell);
        }
      }
      table.push(array);
    });
    console.log(table.toString());
  },
};
