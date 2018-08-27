let APIKey ='APIKey';
let SecretKey ='SecretKey';

const hitbtc = require('hitbtc-node-sdk');
hitbtc.auth(APIKey, SecretKey);


/*Balances*/
hitbtc.accountBalance()
    .then(balances => console.log(balances))
    .catch(e =>console.log(e));

hitbtc.tradingBalance()
    .then(balances => console.log(balances))
    .catch(e =>console.log(e));


/*Get personal trading commission rate*/
hitbtc.getTradingCommission("ETHBTC")
    .then(rates => console.log(rates))
    .catch(e =>console.log(e));


/*Cancel all all active orders for specified symbol*/
hitbtc.cancelOrders({symbol:"ETHBTC"})
    .then(order => console.log(order))
    .catch(e =>console.log(e));