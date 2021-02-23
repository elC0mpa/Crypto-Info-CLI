const Configstore = require("configstore");
let configuration = new Configstore("CryptoInfo");
const clui = require("clui");
const table = require("./../lib/table");
const coingecko = require("./../lib/coingecko");
const inquirer = require("./../lib/inquirer");
const chalk = require("chalk");
module.exports = {
  getMarketData: async () => {
    const currency = configuration.get("currency") || "usd";
    const status = await new clui.Spinner(
      "Please wait until data is available"
    );
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
      console.log(
        chalk.red("There was a problem when trying to get the data\n")
      );
    }
  },

  getOrderedData: async (orderMethod) => {
    const currency = configuration.get("currency") || "usd";
    const per_page = configuration.get("per_page") || 15;
    const status = await new clui.Spinner(
      "Please wait until data is available"
    );
    try {
      let page = 1;
      let finish = false;
      while (finish === false) {
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
      console.log(
        chalk.red("There was a problem when trying to get the data\n")
      );
      console.log(error);
    }
  },

  getHistoricalData: async () => {
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
      console.log(
        chalk.red("There was a problem when trying to get the data\n")
      );
    }
  },
};
