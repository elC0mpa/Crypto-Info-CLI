#!/usr/bin/env node
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const clui = require("clui");
const inquirer = require("./lib/inquirer");
const coingecko = require("./lib/coingecko");
const table = require("./lib/table");
const Configstore = require("configstore");
let configuration = new Configstore("CryptoInfo");

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

const getMarketData = async () => {
  if (!configuration.has("currency")) {
    configure();
  }
  const currency = configuration.get("currency");
  const status = await new clui.Spinner("Please wait until data is available");
  status.start();
  try {
    const crypto_info = await coingecko.getCryptoCurrencyMarketData(currency, [
      "bitcoin",
      "ethereum",
      "g999",
      "tether",
      "tron",
      "monero",
      "dash",
      "litecoin",
      "dogecoin",
    ]);
    status.stop();
    console.log("Market Data (" + currency.toUpperCase() + "):");
    table.printCurrencyInfo(crypto_info);
  } catch (error) {
    status.stop();
    console.log(chalk.red("There was a problem when trying to get the data\n"));
  }
};

const getOrderedData = async (orderMethod) => {
  const currency = configuration.get("currency") || "usd";
  const per_page = configuration.get("per_page") || 15;
  const status = await new clui.Spinner("Please wait until data is available");
  status.start();
  try {
    const crypto_info = await coingecko.getCryptoCurrencyOrderedData(
      currency,
      orderMethod,
      per_page,
      0
    );
    status.stop();
    console.log("Market Data (" + currency.toUpperCase() + "):");
    table.printCurrencyInfo(crypto_info);
  } catch (error) {
    status.stop();
    console.log(chalk.red("There was a problem when trying to get the data\n"));
    console.log(error);
  }
};

const getHistoricalData = async () => {
  if (!configuration.has("currency")) {
    const info = await inquirer.askCurrencyInfo();
    configuration.set("currency", info.currency[0].toLowerCase());
  }
  const currency = configuration.get("currency");
  try {
    const status = await new clui.Spinner(
      "Please wait until data is available"
    );
    status.start();
    const crypto_info = await coingecko.getCryptoCurrencyHistoricalData(
      currency,
      [
        "bitcoin",
        "ethereum",
        "g999",
        "tether",
        "tron",
        "monero",
        "dash",
        "litecoin",
        "dogecoin",
      ]
    );
    status.stop();
    console.log("Historical Data (" + currency.toUpperCase() + "):");
    table.printCurrencyHistoricalData(crypto_info);
  } catch (error) {
    status.stop();
    console.log(chalk.red("There was a problem when trying to get the data\n"));
  }
};

const configure = async () => {
  const { config } = await inquirer.showConfigMenu();
  if (config === "Currency") {
    const { currency } = await inquirer.askCurrencyInfo();
    configuration.set("currency", currency.toLowerCase());
  } else if (config === "Items per page") {
    const { per_page } = await inquirer.askItemsPerPageInfo();
    configuration.set("per_page", Number(per_page));
  }
};

const main = async () => {
  let repeat = true;
  while (repeat) {
    printInitialInfo();
    const { option } = await inquirer.showMainMenu();
    if (option === "Configuration") {
      await configure();
    } else if (option === "Show Market Data") {
      await getMarketData();
    } else if (option === "Show Historical Data") {
      await getHistoricalData();
    } else if (option === "Sort crypto currencies by...") {
      const { order } = await inquirer.showSortMenu();
      await getOrderedData(order);
    }
    repeat = await inquirer.waitKeyPress();
    repeat = repeat.option;
  }
  // await coingecko.sortCryptos();
};

main();
