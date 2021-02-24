const Configstore = require("configstore");
let configuration = new Configstore("CryptoInfo");
const chalk = require("chalk");
const inquirer = require("./../lib/inquirer");
const clui = require("clui");
const coingecko = require("./../lib/coingecko");

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
    cryptos = favs === undefined ? cryptos : [...favs, ...cryptos];
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
module.exports = {
  configure: async () => {
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
  },
};
