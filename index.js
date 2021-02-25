#!/usr/bin/env node
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const inquirer = require("./lib/inquirer");
const { configure } = require("./utils/configuration");
const {
  getMarketData,
  getHistoricalData,
  getOrderedData,
} = require("./utils/coingecko");
// const notifier = require("node-notifier");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

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

const loop = async () => {
  let repeat = true;
  while (repeat) {
    printInitialInfo();
    const { option } = await inquirer.showMainMenu();
    if (option === "Configuration") {
      await configure();
    } else if (option === "Show Market Data (Favorite cryptos)") {
      await getMarketData();
      await inquirer.waitKeyPress("Press enter to continue");
    } else if (option === "Show Historical Data (Favorite cryptos)") {
      await getHistoricalData();
      await inquirer.waitKeyPress("Press enter to continue");
    } else if (option === "Sort crypto currencies by...") {
      const { order } = await inquirer.showSortMenu();
      await getOrderedData(order);
    } else if (option === "Exit") {
      repeat = false;
    }
  }
};

const main = async () => {
  const argv = yargs(hideBin(process.argv)).argv;
  if (argv.configure) {
    await configure();
  } else if (argv["market-data"]) {
    await getMarketData();
  } else if (argv["historical-data"]) {
    await getHistoricalData();
  } else if (argv["ordered-data"]) {
    const { order } = await inquirer.showSortMenu();
    await getOrderedData(order);
  } else {
    loop();
  }
};

main();
