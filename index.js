#!/usr/bin/env node
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
// const clui = require("clui");
const inquirer = require("./lib/inquirer");
const { configure } = require("./utils/configuration");
const {
  getMarketData,
  getHistoricalData,
  getOrderedData,
} = require("./utils/coingecko");
// const coingecko = require("./lib/coingecko");
// const table = require("./lib/table");
// const Configstore = require("configstore");
// let configuration = new Configstore("CryptoInfo");

const printInitialInfo = () => {
  clear();
  console.log(
    chalk.yellowBright(
      figlet.textSync("Crypto Info Tool", { horizontalLayout: "full" })
    )
  );

  console.log(
    chalk.blueBright(
      "\nDeveloped by elC0mpa (https://github.com/elC0mpa) and Powered by Coingecko API\n"
    )
  );
};

const main = async () => {
  let repeat = true;
  while (repeat) {
    printInitialInfo();
    const { option } = await inquirer.showMainMenu();
    if (option === "Configuration") {
      await configure();
    } else if (option === "Show Market Data (Favorite cryptos)") {
      await getMarketData();
    } else if (option === "Show Historical Data (Favorite cryptos)") {
      await getHistoricalData();
    } else if (option === "Sort crypto currencies by...") {
      const { order } = await inquirer.showSortMenu();
      await getOrderedData(order);
    }
    repeat = await inquirer.waitKeyPress();
    repeat = repeat.option;
  }
};

main();
