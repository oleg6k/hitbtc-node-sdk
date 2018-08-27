let APIKey = 'APIKey';
let SecretKey = 'SecretKey';

const hitbtc = require('hitbtc-node-sdk');
hitbtc.auth(APIKey, SecretKey);


/* Params for Limit order */
let orderParamsObject = {
    symbol: "ETHBTC",
    side: "sell",
    type: "limit",
    quantity: 0.063,
    price: 0.046016
};


/* or Market order */
orderParamsObject = {
    symbol: "ETHBTC",
    side: "sell",
    type: "market",
    quantity: 0.063

};


/* or StopLimit order */
orderParamsObject = {
    symbol: "ETHBTC",
    side: "sell",
    type: "stopLimit",
    quantity: 0.063,
    price: 0.046016,
    stopPrice: 0.047016
};


hitbtc.createNewOrder(orderParamsObject)
    .then(orderRequest => console.log(orderRequest))
    .catch(orderError => console.log(orderError));



//or with custom client order ID

hitbtc.createNewOrder(orderParamsObject, "d8574207d9e3b16a4a5511753eeef175")
    .then(orderRequest => console.log(orderRequest))
    .catch(orderError => console.log(orderError));