const CoinGecko = require("coingecko-api");
const CoinGeckoClient = new CoinGecko();

module.exports = {
  getCryptoCurrencyInfo: async (currency, crypto) => {
    const data = await CoinGeckoClient.coins.fetch(crypto, {
      tickers: false,
      community_data: false,
      developer_data: false,
      localization: false,
      // sparkline: true,
    });
    const current_price = data.data.market_data.current_price[currency];
    const all_time_high = data.data.market_data.ath[currency];
    const all_time_low = data.data.market_data.atl[currency];
    const high_24h = data.data.market_data.high_24h[currency];
    const low_24h = data.data.market_data.low_24h[currency];
    const percentage_24h = data.data.market_data.price_change_percentage_24h;
    const percentage_7d = data.data.market_data.price_change_percentage_7d;
    const percentage_14d = data.data.market_data.price_change_percentage_14d;
    const percentage_30d = data.data.market_data.price_change_percentage_30d;
    const percentage_60d = data.data.market_data.price_change_percentage_60d;
    const percentage_200d = data.data.market_data.price_change_percentage_200d;
    const percentage_1y = data.data.market_data.price_change_percentage_1y;
    return [
      crypto,
      current_price,
      all_time_high,
      all_time_low,
      high_24h,
      low_24h,
      percentage_24h,
      percentage_7d,
      percentage_14d,
      percentage_30d,
      percentage_60d,
      percentage_200d,
      percentage_1y,
    ];
  },
};
