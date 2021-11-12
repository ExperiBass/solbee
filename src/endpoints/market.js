const inputValidation = require('../util/inputValidation')
const request = require('../util/request')
const {
    Address,
    Account,
    Transaction,
    Market
} = require('../util/definitions')
module.exports = {
    /**
     * Fetch all markets.
     * @param {number} limit
     * @param {number} offset
     * @param {string} sort
     * @param {string} dir
     * @returns {[Market]}
     */
    getMarkets(limit, offset, sort, dir) {
        inputValidation({
            input: limit,
            type: 'number',
            message: `The paramater "limit" of method ".market.getMarkets" must be a number between 1 and 100.`,
            optional: true
        })
        inputValidation({
            input: offset,
            type: 'number',
            message: `The paramater "offset" of method ".market.getMarkets" must be a number.`,
            optional: true
        })
        inputValidation({
            input: sort,
            type: 'string',
            message: `The paramater "sort" of method ".market.getMarkets" must be a valid option.`,
            optional: true,
            options: ["name", "price", "volume", "liquidity"]
        })
        inputValidation({
            input: dir,
            type: 'string',
            message: `The paramater "dir" of method ".market.getMarkets" must be a valid option.`,
            optional: true,
            options: ["asc", "desc"]
        })
        return request({
            subUrl: '/markets',
            query: {
                limit: limit,
                offset: offset,
                sort: sort,
                dir: dir
            }
        })
    },
    /**
     * Fetch markets by base mint.
     * @param {string} basemint
     * @param {number} limit
     * @param {number} offset
     * @returns {[Market]}
     */
    getMarketsByBaseMint(basemint, limit, offset) {
        inputValidation({
            input: basemint,
            type: 'string',
            message: `The method ".market.getMarketsByBaseMint" requires a Base Mint of type "string".`
        })
        inputValidation({
            input: limit,
            type: 'number',
            message: `The paramater "limit" of method ".market.getMarketsByBaseMint" must be a number between 1 and 100.`,
            optional: true
        })
        inputValidation({
            input: offset,
            type: 'number',
            message: `The paramater "offset" of method ".market.getMarketsByBaseMint" must be a number.`,
            optional: true
        })
        return request({
            subUrl: `/markets/base/${basemint}`,
            query: {
                limit: limit,
                offset: offset
            }
        })
    },
    /**
     * Fetch markets by quote mint.
     * @param {string} quotemint
     * @param {number} limit
     * @param {number} offset
     * @returns {[Market]}
     */
    getMarketsByQuoteMint(quotemint, limit, offset) {
        inputValidation({
            input: quotemint,
            type: 'string',
            message: `The method ".market.getMarketsByQuoteMint" requires a Base Mint of type "string".`
        })
        inputValidation({
            input: limit,
            type: 'number',
            message: `The paramater "limit" of method ".market.getMarketsByQuoteMint" must be a number between 1 and 100.`,
            optional: true
        })
        inputValidation({
            input: offset,
            type: 'number',
            message: `The paramater "offset" of method ".market.getMarketsByQuoteMint" must be a number.`,
            optional: true
        })
        return request({
            subUrl: `/markets/quote/${quotemint}`,
            query: {
                limit: limit,
                offset: offset
            }
        })
    },
    /**
     * Fetch market by pubkey.
     * @param {string} pubkey
     * @returns {Market}
     */
    getMarket(pubkey) {
        inputValidation({
            input: pubkey,
            type: 'string',
            message: `The method ".market.getMarket" requires a public key of type "string".`
        })
        return request({
            subUrl: `/market/${pubkey}`
        })
    }
}