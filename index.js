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
    let cryptos = configuration.get("favs");
    cryptos =
      cryptos === undefined || cryptos.length === 0 ? ["bitcoin"] : cryptos;
    const crypto_info = await coingecko.getCryptoCurrencyMarketData(
      currency,
      cryptos
    );
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
  try {
    let page = 1;
    let finish = false;
    while (finish === false) {
      const status = await new clui.Spinner(
        "Please wait until data is available"
      );
      status.start();
      const crypto_info = await coingecko.getCryptoCurrencyOrderedData(
        currency,
        orderMethod,
        per_page,
        page
      );
      status.stop();
      console.log("Market Data (" + currency.toUpperCase() + "):");
      table.printCurrencyInfo(crypto_info);
      const { pagination } = await inquirer.showPaginationMenu(page);
      if (pagination === "<- Back") {
        page = page - 1;
      } else if (pagination === "Next ->") {
        page = page + 1;
      } else if (pagination === "Enough") {
        finish = true;
      }
    }
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
    let cryptos = configuration.get("favs");
    cryptos =
      cryptos === undefined || cryptos.length === 0 ? ["bitcoin"] : cryptos;
    const crypto_info = await coingecko.getCryptoCurrencyHistoricalData(
      currency,
      cryptos
    );
    status.stop();
    console.log("Historical Data (" + currency.toUpperCase() + "):");
    table.printCurrencyHistoricalData(crypto_info);
  } catch (error) {
    status.stop();
    console.log(chalk.red("There was a problem when trying to get the data\n"));
  }
};

const configureFavoriteCryptos = async () => {
  let favs = undefined;
  if (configuration.has("favs")) {
    favs = configuration.get("favs");
    console.log("Favorite cryptos:");
    console.log(chalk.yellowBright(favs));
  }
  const { action } = await inquirer.favoriteCryptosActions();
  if (action === "Add new crypto") {
    const status = await new clui.Spinner(
      "Please wait until data is available"
    );
    status.start();
    const { data: ids } = await coingecko.getCryptoCurrencyIDs();
    status.stop();
    const names = ids.map((id) => {
      return id.name;
    });
    let repeat = true;
    let indexOfSelected = undefined;
    let cryptos = [];
    while (repeat) {
      const { crypto } = await inquirer.insertNewCrypto(names);
      indexOfSelected = names.indexOf(crypto);
      names.splice(indexOfSelected, 1);
      const { id } = ids.splice(indexOfSelected, 1)[0];
      cryptos.push(id);
      const { option } = await inquirer.waitKeyPress(
        "Would you like to add another crypto?"
      );
      repeat = option;
    }
    cryptos = favs === undefined ? cryptos : [...cryptos, ...favs];
    configuration.set("favs", cryptos);
  } else if (action === "Delete existing crypto") {
    let repeat = true;
    let indexOfSelected = undefined;
    while (repeat) {
      const { crypto } = await inquirer.deleteNewCrypto(favs);
      indexOfSelected = favs.indexOf(crypto);
      favs.splice(indexOfSelected, 1);
      const { option } = await inquirer.waitKeyPress(
        "Would you like to remove another crypto?"
      );
      repeat = option;
    }
    configuration.set("favs", favs);
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
  } else if (config === "Favorite cryptos") {
    await configureFavoriteCryptos();
  }
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
  // await coingecko.sortCryptos();
};

main();
