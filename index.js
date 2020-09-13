const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
let price = require("crypto-price");
const clui = require("clui");
const inquirer = require("./lib/inquirer");
const coingecko = require("./lib/coingecko");
let Table = require("cli-table3");

clear();
console.log(
  chalk.blueBright(
    figlet.textSync("Crypto Info Tool", { horizontalLayout: "full" })
  )
);

const currencies = async () => {
  const info = await inquirer.askCurrencyInfo();
  const currency = info.currency[0].toLowerCase();
  const status = await new clui.Spinner("Please wait until data is available");
  status.start();
  const crypto_info = await coingecko.getCryptoCurrencyInfo(
    currency,
    "bitcoin"
  );
  status.stop();
  console.log(crypto_info);
};

const main = async () => {
  await currencies();
};

main();
