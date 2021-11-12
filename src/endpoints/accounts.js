const inputValidation = require('../util/inputValidation')
const request = require('../util/request')
const {
    Address,
    Account,
    Transaction,
    StakeAccount,
    StakeAccountReward,
    Token,
    TokenTransfer,
    SerumInstruction,
    SerumOrder,
    SwapInstruction
} = require('../util/definitions')

module.exports = {
    /**
     * Fetch accounts, ordered by balance.
     * @returns {[Address]}
     */
    getAccounts() {
        return request({
            subUrl: '/accounts'
        })
    },
    /**
     * Fetch account data.
     * @param {string} address
     * @returns {Account}
     */
    getData(address) {
        inputValidation({
            input: address,
            type: 'string',
            message: `The method ".accounts.getData" requires a Solana address.`
        })
        return request({
            subUrl: `/accounts/${address}`
        })
    },
    /**
     * Fetch wealth distribution metrics
     * @returns {Object}
     */
    getWealthDistribution() {
        return request({
            subUrl: '/wealth'
        })
    },
    /**
     * Fetch account transactions, ordered by block number.
     * @param {string} address
     * @param {number} limit
     * @param {number} offset
     * @param {string} cursor
     * @returns {[Transaction]}
     */
    getTransactions(address, limit, offset, cursor) {
        inputValidation({
            input: address,
            type: 'string',
            message: `The method ".accounts.getTransactions" requires a Solana address.`
        })
        inputValidation({
            input: limit,
            type: 'number',
            message: `The parameter "limit" of method ".accounts.getTransactions" must be a number between 1 and 100.`,
            optional: true
        })
        inputValidation({
            input: offset,
            type: 'number',
            message: `The parameter "offset" of method ".accounts.getTransactions" must be a number.`,
            optional: true
        })
        inputValidation({
            input: cursor,
            type: 'string',
            message: `The parameter "cursor" of method ".accounts.getTransactions" must be a string in the format of "{blockNumber},{transactionIndex}".`,
            optional: true
        })
        return request({
            subUrl: `/accounts/${address}/transactions`,
            query: {
                limit: limit,
                offset: offset,
                cursor: cursor
            }
        })
    },
    /**
     * Fetch stake accounts owned by the pubkey.
     * @param {string} account
     * @returns {[StakeAccount]}
     */
    getStakes(address) {
        inputValidation({
            input: address,
            type: 'string',
            message: `The method ".accounts.getStakes" requires a Solana address.`
        })
        inputValidation({
            input: limit,
            type: 'number',
            message: `The parameter "limit" of method ".accounts.getStakes" must be a number between 1 and 100.`,
            optional: true
        })
        inputValidation({
            input: offset,
            type: 'number',
            message: `The parameter "offset" of method ".accounts.getStakes" must be a number.`,
            optional: true
        })
        return request({
            subUrl: `/accounts/${address}/stakes`,
            query: {
                limit: limit,
                offset: offset
            }
        })
    },
    /**
     * Fetch stake account rewards by the stake account pubkey.
     * @param {string} stakeAddress
     * @returns {[StakeAccountReward]}
     */
    getStakeRewards(stakeAddress) {
        inputValidation({
            input: stakeAddress,
            type: 'string',
            message: `The method ".accounts.getStakeRewards" requires a staking address.`
        })
        inputValidation({
            input: cursor,
            type: 'string',
            message: `The parameter "cursor" of method ".accounts.getStakeRewards" must be a string in the format of "{blockNumber},{transactionIndex}".`,
            optional: true
        })
        return request({
            subUrl: `/accounts/${stakeAddress}/stake-rewards`,
            query: {
                cursor: cursor
            }
        })
    },
    /**
     * Fetch account tokens.
     * @param {string} address
     * @param {number} limit
     * @param {number} offset
     * @returns {[Token]}
     */
    getTokens(address, limit, offset) {
        inputValidation({
            input: address,
            type: 'string',
            message: `The method ".accounts.getTokens" requires a Solana address.`
        })
        inputValidation({
            input: limit,
            type: 'number',
            message: `The parameter "limit" of method ".accounts.getTokens" must be a number between 1 and 100.`,
            optional: true
        })
        inputValidation({
            input: offset,
            type: 'number',
            message: `The parameter "offset" of method ".accounts.getTokens" must be a number.`,
            optional: true
        })
        return request({
            subUrl: `/account/${address}/tokens`,
            query: {
                limit: limit,
                offset: offset
            }
        })
    },
    /**
     * Fetch account token transfers, ordered by block number.
     * @param {string} address
     * @param {number} limit
     * @param {number} offset
     * @param {string} cursor
     * @param {string} inner
     * @returns {[TokenTransfer]}
     */
    getTokenTransfers(address, limit, offset, cursor, inner) {
        inputValidation({
            input: address,
            type: 'string',
            message: `The method ".accounts.getTokenTransfers" requires a Solana address.`
        })
        inputValidation({
            input: limit,
            type: 'number',
            message: `The parameter "limit" of method ".accounts.getTokenTransfers" must be a number between 1 and 100.`,
            optional: true
        })
        inputValidation({
            input: offset,
            type: 'number',
            message: `The parameter "offset" of method ".accounts.getTokenTransfers" must be a number.`,
            optional: true
        })
        inputValidation({
            input: cursor,
            type: 'string',
            message: `The parameter "cursor" of method ".accounts.getTokenTransfers" must be a string in the format of "{blockNumber},{transactionIndex}".`,
            optional: true
        })
        inputValidation({
            input: inner,
            type: 'string',
            message: `The parameter "inner" of method ".accounts.geTokenTransferss" must be a string with one of these options:`,
            options: [
                'true',
                'false'
            ],
            optional: true
        })
        return request({
            subUrl: `/accounts/${address}/token-transfers`,
            query: {
                limit: limit,
                offset: offset,
                cursor: cursor,
                inner: inner
            }
        })
    },
    /**
     * Fetch account serum instructions, ordered by block number.
     * @param {string} address
     * @param {number} limit
     * @param {number} offset
     * @param {string} cursor
     * @returns {[SerumInstruction]}
     */
    getSerumInstructions(address, limit, offset, cursor) {
        inputValidation({
            input: address,
            type: 'string',
            message: `The method ".accounts.getSerumInstructions" requires a Solana address.`
        })
        inputValidation({
            input: limit,
            type: 'number',
            message: `The parameter "limit" of method ".accounts.getSerumInstructions" must be a number between 1 and 100.`,
            optional: true
        })
        inputValidation({
            input: offset,
            type: 'number',
            message: `The parameter "offset" of method ".accounts.getSerumInstructions" must be a number.`,
            optional: true
        })
        inputValidation({
            input: cursor,
            type: 'string',
            message: `The parameter "cursor" of method ".accounts.getSerumInstructions" must be a string in the format of "{blockNumber},{transactionIndex},{instructionIndex}".`,
            optional: true
        })
        return request({
            subUrl: `/accounts/${address}/serum-instructions`,
            query: {
                limit: limit,
                offset: offset,
                cursor: cursor
            }
        })
    },
    /**
     * Fetch account serum orders, ordered by block number.
     * @param {string} address
     * @param {number} limit
     * @param {number} offset
     * @param {string} cursor
     * @returns {[SerumOrder]}
     */
    getSerumOrders(address, limit, offset, cursor) {
        inputValidation({
            input: address,
            type: 'string',
            message: `The method ".accounts.getSerumOrders" requires a Solana address.`
        })
        inputValidation({
            input: limit,
            type: 'number',
            message: `The parameter "limit" of method ".accounts.getSerumOrders" must be a number between 1 and 100.`,
            optional: true
        })
        inputValidation({
            input: offset,
            type: 'number',
            message: `The parameter "offset" of method ".accounts.getSerumOrders" must be a number.`,
            optional: true
        })
        inputValidation({
            input: cursor,
            type: 'string',
            message: `The parameter "cursor" of method ".accounts.getSerumOrders" must be a string in the format of "{blockNumber},{transactionIndex}".`,
            optional: true
        })
        return request({
            subUrl: `/accounts/${address}/serum-orders`,
            query: {
                limit: limit,
                offset: offset,
                cursor: cursor
            }
        })
    },
    /**
     * Fetch account swap instructions, ordered by block number.
     * @param {string} address
     * @param {number} limit
     * @param {number} offset
     * @param {string} cursor
     * @returns {[SwapInstruction]}
     */
    getSwapInstructions(address, limit, offset, cursor) {
        inputValidation({
            input: address,
            type: 'string',
            message: `The method ".accounts.getSwapInstructions" requires a Solana address.`
        })
        inputValidation({
            input: limit,
            type: 'number',
            message: `The parameter "limit" of method ".accounts.getSwapInstructions" must be a number between 1 and 100.`,
            optional: true
        })
        inputValidation({
            input: offset,
            type: 'number',
            message: `The parameter "offset" of method ".accounts.getSwapInstructions" must be a number.`,
            optional: true
        })
        inputValidation({
            input: cursor,
            type: 'string',
            message: `The parameter "cursor" of method ".accounts.getSwapInstructions" must be a string in the format of "{blockNumber},{transactionIndex},{instructionIndex}".`,
            optional: true
        })
        return request({
            subUrl: `/accounts/${address}/swap-instructions`,
            query: {
                limit: limit,
                offset: offset,
                cursor: cursor
            }
        })
    },
}