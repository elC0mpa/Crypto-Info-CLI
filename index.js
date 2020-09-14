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
      "\nDeveloped by elC0mpa (https://github.com/elC0mpa) and Powered by Coingecko\n"
    )
  );
};

const getMarketData = async () => {
  if (!configuration.has("currency")) {
    const info = await inquirer.askCurrencyInfo();
    configuration.set("currency", info.currency[0].toLowerCase());
  }
  const currency = configuration.get("currency");
  const status = await new clui.Spinner("Please wait until data is available");
  status.start();
  const crypto_info = await coingecko.getCryptoCurrencyMarketData(currency, [
    "bitcoin",
    "maker",
    "ethereum",
    "monero",
    "dash",
    "litecoin",
    "tether",
    "dogecoin",
  ]);
  status.stop();
  console.log("Market Data (" + currency.toUpperCase() + "):");
  table.printCurrencyInfo(crypto_info);
};

const configure = async () => {
  const result = await inquirer.askCurrencyInfo();
  configuration.set("currency", result.currency.toLowerCase());
};

const keypress = async () => {
  process.stdin.setRawMode(true);
  return new Promise((resolve) =>
    process.stdin.once("data", () => {
      process.stdin.setRawMode(false);
      resolve();
    })
  );
};

const main = async () => {
  let repeat = true;
  while (repeat) {
    printInitialInfo();
    const option = await inquirer.showMainMenu();
    if (option.option === "Configuration") {
      await configure();
    } else if (option.option === "Show Market Data") {
      await getMarketData();
    }
    repeat = await inquirer.waitKeyPress();
    repeat = repeat.option;
  }
};

main();
