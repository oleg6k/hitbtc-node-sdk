# HitBtc Node.JS SDK


**HitBtc Node SDK** - small node.js Promise-like library for the **HitBtc API** <https://hitbtc.com>

### Current version supports

* full REST v2 API

### Installation
`npm i hitbtc-node-sdk`  


### Usage

```js
let APIKey ='APIKey';
let SecretKey ='SecretKey';

const hitbtc = require('hitbtc-node-sdk');
hitbtc.auth(APIKey, SecretKey);

hitbtc.accountBalance()
    .then(balances => console.log(balances))
    .catch(e =>console.log(e));
```

See [examples](/examples/) for more details
