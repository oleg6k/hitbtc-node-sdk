let HitBtcApiNodeSdk = (() => {

    const request = require('request-promise');

    let path,
        conf = {
            rest_base_url: 'https://api.hitbtc.com/api/2',
            ws_base_url: 'wss://api.hitbtc.com/api/2/ws'
        };

    let default_request_options = {
        method: 'GET',
        agent: false,
        json: true,
        headers: {
            'User-Agent': 'Mozilla/4.0 (compatible; HitBtcNodeSDK)',
            'Content-type': 'application/x-www-form-urlencoded'
        }
    };

    let updateConfiguration = (params) => {
        Object.keys(params).forEach(key => {
            conf[key] = params[key]
        })
    };

    let updateRequestOptions = (path, options) => {
        let request_options = default_request_options;
        request_options.uri = conf.rest_base_url + path;
        if (options) {
            Object.keys(options).forEach(key => {
                request_options[key] = options[key]
            });
        }
        return request_options
    };

    let authenticate = (apiKey, secretKey) => {
        default_request_options.headers.Authorization = "Basic " + new Buffer(apiKey + ":" + secretKey).toString("base64");
    };

    let makeRequest = (uri, options_template = null) => {
        return request(updateRequestOptions(uri, options_template))
    };

    return {
        configuration: (params) => {
            updateConfiguration(params)
        },
        auth: (apiKey, secretKey) => {
            authenticate(apiKey, secretKey)
        },

        /**
         * Currencies
         * @see https://api.hitbtc.com/#currencies
         * @param {string} currency
         * @return {Promise}
         */
        currencies: (currency = '') => {
            path = `/public/currency/${currency}`;
            return makeRequest(path)
        },

        /**
         * Symbols
         * @see https://api.hitbtc.com/#symbols
         * @param {string} symbol
         * @return {Promise}
         */
        symbols: (symbol = '') => {
            path = `/public/symbol/${symbol}`;
            return makeRequest(path)
        },

        /**
         * Tickers
         * @see https://api.hitbtc.com/#tickers
         * @param {string} symbol
         * @return {Promise}
         */
        tickers: (symbol = '') => {
            path = `/public/ticker/${symbol}`;
            return makeRequest(path)
        },

        /**
         * Trades
         * @see https://api.hitbtc.com/#trades
         * @param {string} symbol - required
         * @param {object} trades_params
         * @return {Promise}
         */
        trades: (symbol, trades_params = '') => {
            path = `/public/trades/${symbol}`;
            return makeRequest(path, {qs: trades_params})
        },

        /**
         * Orderbook
         * @see https://api.hitbtc.com/#orderbook
         * @param {string} symbol - required
         * @param {object} orderbook_params
         * @return {Promise}
         */
        orderbook: (symbol, orderbook_params = '') => {
            path = `/public/orderbook/${symbol}`;
            return makeRequest(path, {qs: orderbook_params})
        },

        /**
         * Candles
         * @see https://api.hitbtc.com/#candles
         * @param {string} symbol - required
         * @param {object} candles_params
         * @return {Promise}
         */
        candles: (symbol, candles_params = '') => {
            path = `/public/candles/${symbol}`;
            return makeRequest(path, {qs: candles_params})
        },

        /**
         * Trading Balance
         * @see https://api.hitbtc.com/#trading-balance
         * @return {Promise}
         */
        tradingBalance: () => {
            path = '/trading/balance';
            return makeRequest(path)
        },

        /**
         * Get Active orders
         * @see https://api.hitbtc.com/#get-active-orders
         * @param {object} params
         * @return {Promise}
         */
        getActiveOrders: (params = '') => {
            path = '/order';
            return makeRequest(path, {qs: params})
        },

        /**
         * Get Active order by clientOrderId
         * @see https://api.hitbtc.com/#get-active-order-by-clientorderid
         * @param {string} client_order_id - required
         * @param {object} params
         * @return {Promise}
         */
        getActiveOrderByClientOrderId: (client_order_id, params = '') => {
            path = '/order/' + client_order_id;
            return makeRequest(path, {qs: params})
        },

        /**
         * Create New Order
         * @see https://api.hitbtc.com/#create-new-order
         * @param {object} order - required
         * @param {string} client_order_id
         * @return {Promise}
         */
        createNewOrder: (order, client_order_id = '') => {
            let opts = {body: order};
            opts.method = client_order_id.length > 0 ? 'PUT' : 'POST';

            path = `/order/${client_order_id}`;
            return makeRequest(path, opts)
        },

        /**
         * Cancel orders
         * @see https://api.hitbtc.com/#cancel-orders
         * @param {object} cancel_orders_params
         * @return {Promise}
         */
        cancelOrders: (cancel_orders_params = '') => {
            path = '/order/';
            return makeRequest(path, {method: "DELETE", body: cancel_orders_params})
        },

        /**
         * Cancel order by clientOrderId
         * @see https://api.hitbtc.com/#cancel-order-by-clientorderid
         * @param {string} client_order_id - required
         * @return {Promise}
         */
        cancelOrderByClientOrderId: (client_order_id) => {
            path = '/order/' + client_order_id;
            return makeRequest(path, {method: 'DELETE'})
        },

        /**
         * Get trading commission
         * @see https://api.hitbtc.com/#get-trading-commission
         * @param {string} symbol - required
         * @return {Promise}
         */
        getTradingCommission: (symbol) => {
            path = `/trading/fee/${symbol}`;
            return makeRequest(path)
        },

        /**
         * Orders history
         * @see https://api.hitbtc.com/#orders-history
         * @param {object} order_history_params
         * @return {Promise}
         */
        ordersHistory: (order_history_params = '') => {
            path = '/history/order';
            return makeRequest(path, {qs: order_history_params})
        },

        /**
         * Trades history
         * @see https://api.hitbtc.com/#trades-history
         * @param {object} trade_history_params
         * @return {Promise}
         */
        tradesHistory: (trade_history_params = '') => {
            path = '/history/trades';
            return makeRequest(path, {qs: trade_history_params})
        },

        /**
         * Trades by order
         * @see https://api.hitbtc.com/#trades-by-order
         * @param {string} order_id - required
         * @return {Promise}
         */
        tradesByOrder: (order_id) => {
            path = `/history/order/${order_id}/trades`;
            return makeRequest(path)
        },

        /**
         * Account balance
         * @see https://api.hitbtc.com/#account-balance
         * @return {Promise}
         */
        accountBalance: () => {
            path = '/account/balance';
            return makeRequest(path)
        },

        /**
         * Create deposit crypto address
         * @see https://api.hitbtc.com/#deposit-crypto-address
         * @param {string} currency - required
         * @return {Promise}
         */
        createDepositCryptoAddress: (currency) => {
            path = `/account/crypto/address/${currency}`;
            return makeRequest(path, {method: 'POST'})
        },
        /**
         * Get deposit crypto address
         * @see https://api.hitbtc.com/#deposit-crypto-address
         * @param {string} currency - required
         * @return {Promise}
         */
        getDepositCryptoAddress: (currency) => {
            path = `/account/crypto/address/${currency}`;
            return makeRequest(path)
        },

        /**
         * Withdraw crypto
         * @see https://api.hitbtc.com/#withdraw-crypto
         * @param {object} withdraw_params - required
         * @return {Promise}
         */
        withdraw: (withdraw_params) => {
            path = '/account/crypto/withdraw';
            return makeRequest(path, {method: 'POST', body: withdraw_params})
        },

        /**
         * Withdraw crypto commit
         * @see https://api.hitbtc.com/#withdraw-crypto-commit-or-rollback
         * @param {string} id - required
         * @return {Promise}
         */
        withdrawCommit: (id) => {
            path = `/account/crypto/withdraw/${id}`;
            return makeRequest(path, {method: 'PUT'})
        },

        /**
         * Withdraw crypto rollback
         * @see https://api.hitbtc.com/#withdraw-crypto-commit-or-rollback
         * @param {string} id - required
         * @return {Promise}
         */
        withdrawRollback: (id) => {
            path = `/account/crypto/withdraw/${id}`;
            return makeRequest(path, {method: 'DELETE'})
        },

        /**
         * Transfer money between trading and account
         * @see https://api.hitbtc.com/#transfer-money-between-trading-and-account
         * @param {object} transfer_params - required
         * @return {Promise}
         */
        transfer: (transfer_params) => {
            path = '/account/transfer';
            return makeRequest(path, {method: 'POST', body: transfer_params})
        },

        /**
         * Get transactions history
         * @see https://api.hitbtc.com/#get-transactions-history
         * @param {object} transaction_params
         * @return {Promise}
         */
        getTransactionsHistory: (transaction_params = '') => {
            path = `/account/transactions`;
            return makeRequest(path, {qs: transaction_params})
        },

        /**
         * Get transaction by transaction id
         * @see https://api.hitbtc.com/#get-transactions-history
         * @param{string} transaction_id - required
         * @return {Promise}
         */
        getTransactionsHistoryById: (transaction_id) => {
            path = `/account/transactions/${transaction_id}`;
            return makeRequest(path)
        }
    }

})();

module.exports = HitBtcApiNodeSdk;

