const CoinGecko = require("coingecko-api");
const CoinGeckoClient = new CoinGecko();

module.exports = {
  getCryptoCurrencyMarketData: (currency, crypto) => {
    return new Promise(async (resolve, reject) => {
      let crypto_info_array = [];
      for (crypto_currency of crypto) {
        try {
          const { data } = await CoinGeckoClient.coins.fetch(crypto_currency, {
            tickers: false,
            community_data: false,
            developer_data: false,
            localization: false,
            // sparkline: true,
          });
          const current_price = data.market_data.current_price[currency];
          const high_24h = data.market_data.high_24h[currency];
          const low_24h = data.market_data.low_24h[currency];
          const percentage_24h = data.market_data.price_change_percentage_24h;
          const percentage_7d = data.market_data.price_change_percentage_7d;
          const percentage_14d = data.market_data.price_change_percentage_14d;
          const percentage_30d = data.market_data.price_change_percentage_30d;
          const percentage_60d = data.market_data.price_change_percentage_60d;
          const percentage_200d = data.market_data.price_change_percentage_200d;
          const percentage_1y = data.market_data.price_change_percentage_1y;
          crypto_info_array.push([
            crypto_currency,
            current_price,
            high_24h,
            low_24h,
            percentage_24h,
            percentage_7d,
            percentage_14d,
            percentage_30d,
            percentage_60d,
            percentage_200d,
            percentage_1y,
          ]);
        } catch (error) {
          reject();
        }
      }
      resolve(crypto_info_array);
    });
  },
  getCryptoCurrencyHistoricalData: async (currency, crypto) => {
    return new Promise(async (resolve, reject) => {
      let crypto_info_array = [];
      for (crypto_currency of crypto) {
        try {
          const { data } = await CoinGeckoClient.coins.fetch(crypto_currency, {
            tickers: false,
            community_data: false,
            developer_data: false,
            localization: false,
          });
          const current_price = data.market_data.current_price[currency];
          const all_time_high = data.market_data.ath[currency];
          const all_time_high_percent =
            data.market_data.ath_change_percentage[currency];
          const all_time_high_date = data.market_data.ath_date[currency];
          const all_time_low = data.market_data.atl[currency];
          const all_time_low_percent =
            data.market_data.atl_change_percentage[currency];
          const all_time_low_date = data.market_data.atl_date[currency];

          crypto_info_array.push([
            crypto_currency,
            current_price,
            all_time_high,
            all_time_high_percent,
            all_time_high_date.substring(0, 10),
            all_time_low,
            all_time_low_percent,
            all_time_low_date.substring(0, 10),
          ]);
        } catch (error) {
          reject();
        }
      }
      resolve(crypto_info_array);
    });
  },
  getCryptoCurrencyOrderedData: (currency, orderMethod, itemsPerPage, page) => {
    return new Promise(async (resolve, reject) => {
      let crypto_info_array = [];
      try {
        const { data } = await CoinGeckoClient.coins.all({
          order: CoinGecko.ORDER[orderMethod],
          per_page: itemsPerPage,
          page: page,
          localization: false,
        });
        data.forEach((crypto) => {
          const crypto_currency = crypto.id;
          const current_price = crypto.market_data.current_price[currency];
          const high_24h = crypto.market_data.high_24h[currency];
          const low_24h = crypto.market_data.low_24h[currency];
          const percentage_24h = crypto.market_data.price_change_percentage_24h;
          const percentage_7d = crypto.market_data.price_change_percentage_7d;
          const percentage_14d = crypto.market_data.price_change_percentage_14d;
          const percentage_30d = crypto.market_data.price_change_percentage_30d;
          const percentage_60d = crypto.market_data.price_change_percentage_60d;
          const percentage_200d =
            crypto.market_data.price_change_percentage_200d;
          const percentage_1y = crypto.market_data.price_change_percentage_1y;
          crypto_info_array.push([
            crypto_currency,
            current_price,
            high_24h,
            low_24h,
            percentage_24h,
            percentage_7d,
            percentage_14d,
            percentage_30d,
            percentage_60d,
            percentage_200d,
            percentage_1y,
          ]);
        });
        resolve(crypto_info_array);
      } catch (error) {
        reject(error);
      }
    });
  },
  getCryptoCurrencyIDs: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = CoinGeckoClient.coins.list();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  },
};
