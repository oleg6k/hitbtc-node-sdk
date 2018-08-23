let APIKey ='APIKey';
let SecretKey ='SecretKey';

const hitbtc = require('hitbtc-node-sdk');
hitbtc.auth(APIKey, SecretKey);

hitbtc.accountBalance()
    .then(balances => console.log(balances))
    .catch(e =>console.log(e));
