let APIKey ='APIKey';
let SecretKey ='SecretKey';

let hitbtc = require('hitbtc-api-node-sdk');
hitbtc.auth(APIKey, SecretKey);

hitbtc.accountBalance()
    .then(balances => console.log(balances))
    .catch(e =>console.log(e));