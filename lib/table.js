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
  hAlign: "center",
  head: [],
  border: ["yellow"],
};

module.exports = {
  printCurrencyInfo: (data) => {
    var table = new Table({
      head: head,
      style: style,
    });
    data.forEach((crypto) => {
      let array = [];
      crypto.forEach((cell) => {
        const temp = { content: cell, hAlign: "center" };
        array.push(temp);
      });
      table.push(array);
    });
    console.log(table.toString());
  },
};
