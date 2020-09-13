const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
let price = require("crypto-price");
const clui = require("clui");
const inquirer = require("./lib/inquirer");
let Table = require("cli-table3");

const CoinGecko = require("coingecko-api");
const CoinGeckoClient = new CoinGecko();

clear();
console.log(
  chalk.blueBright(
    figlet.textSync("Crypto Info Tool", { horizontalLayout: "full" })
  )
);
