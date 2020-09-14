let Table = require("cli-table3");
const head = [
  "Crypto",
  "Current price",
  "All Time High",
  "All Time Low",
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

const style = {
  "padding-left": 0,
  "padding-right": 0,
  "horizontal-allignment": "center",
  head: [],
  border: [],
};

module.exports = {
  printCurrencyInfo: (data) => {
    var table = new Table({
      head: head,
      style: style,
    });
    data.forEach((crypto) => {
      table.push(crypto);
    });
    console.log(table.toString());
  },
};
