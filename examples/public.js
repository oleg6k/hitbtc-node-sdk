const hitbtc = require('hitbtc-node-sdk');


hitbtc.tickers("BTC")
    .then(result => {
        /*use the result*/
    })
    .catch(e => {
        /*handle an error*/
    });



hitbtc.trades("BTC", {by: "timestamp", limit: 15})
    .then(result => {
        /*use the result*/
    })
    .catch(e => {
        /*handle an error*/
    });



hitbtc.orderbook("BTC")
    .then(result => {
        /*use the result*/
    })
    .catch(e => {
        /*handle an error*/
    });



hitbtc.candles("BTC", {limit: 5, period: "M1"})
    .then(result => {
        /*use the result*/
    })
    .catch(e => {
        /*handle an error*/
    });