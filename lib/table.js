let Table = require("cli-table3");
let colors = require("colors");
const head = [
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
      for (let index = 0; index < crypto.length; index++) {
        const cell = crypto[index];
        if (index == 1) {
          array.push(colors.blue(cell));
        } else if (index > 3) {
          if (cell < 0) {
            array.push(colors.red(cell));
          } else {
            array.push(colors.green(cell));
          }
        } else {
          array.push(cell);
        }
      }
      colors;
      table.push(array);
    });
    console.log(table.toString());
  },
};
