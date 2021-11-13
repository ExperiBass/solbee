const inputValidation = require('../util/inputValidation')
const request = require('../util/request')
const { SolanaNode } = require('../util/definitions')

module.exports = {
    /**
     * Fetch stake history by epoch.
     * @param {number} limit
     * @param {number} offset
     * @returns {Object}
     */
    getStakeHistory(limit, offset) {
        inputValidation({
            input: limit,
            type: 'number',
            message: `The paramater "limit" of method ".other.getStakeHistory" must be a number between 1 and 100.`,
            optional: true
        })
        inputValidation({
            input: offset,
            type: 'number',
            message: `The paramater "offset" of method ".other.getStakeHistory" must be a number.`,
            optional: true
        })
        return request({
            subUrl: '/stake-history'
        })
    },
    /**
     * Fetch network performance information.
     * @returns {Object}
     */
    getHealth() {
        return request({
            subUrl: '/health'
        })
    },
    /**
     * Fetch network status.
     * @returns {Object}
     */
    getNetworkStatus() {
        return request({
            subUrl: '/network-status'
        })
    },
    /**
     * Fetch the staking APY %.
     * @returns {Object}
     */
    getStakingAPY() {
        return request({
            subUrl: '/staking-apy'
        })
    },
    /**
     * Fetch epoch history.
     * @returns {Object}
     */
    getEpochHistory() {
        return request({
            subUrl: '/epoch-history'
        })
    },
    /**
     * Fetch alias data.
     * Aliases represent an address to metadata mapping that includes human readable address names and token metadata (such as ticker, website, ...).
     * It includes all tokens from the official Solana token list, most of the known programs and DEX markets.
     * @returns {Object}
     */
    getAliases() {
        return request({
            subUrl: '/alias'
        })
    },
    /**
     * Fetch non-validator nodes.
     * @returns {[SolanaNode]}
     */
    getNonValidators() {
        return request({
            subUrl: '/non-validators'
        })
    },
    /**
     * Fetch the current cluster time.
     * @returns {Object}
     */
    getClusterTime() {
        return request({
            subUrl: '/cluster-time'
        })
    },
    /**
     * Fetch market chart data.
     * @returns {Object}
     */
    getMarketChartData() {
        return request({
            subUrl: '/market-chart-data'
        })
    }
}