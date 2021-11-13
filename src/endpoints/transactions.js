const {inputValidation, request} = require('../util/util')
const {
    Transaction, TransactionHash
} = require('../util/definitions')

module.exports = {
    /**
     * Fetch transaction by transaction hash, if the given transaction exists.
     * @param {string} hash The transaction hash.
     * @returns {Transaction}
     */
    getTransactionByHash(hash) {
        inputValidation({
            input: hash,
            type: 'string',
            message: `The method ".transactions.getTransactionByHash" requires a transaction hash of type "string".`
        })
        return request({
            subUrl: `/transaction/${hash}`
        })
    },
    /**
     * Fetch the latest transaction hashes for the provided address.
     * @param {string} address
     * @param {number} limit
     * @param {number} offset
     * @param {string} cursor
     * @returns {[TransactionHash]}
     */
    getLatestAddressTransactionHashes(address, limit, offset, cursor) {
        inputValidation({
            input: address,
            type: 'string',
            message: `The method ".transactions.getLatestAddressTransactionHashes" requires a Solana address.`
        })
        inputValidation({
            input: limit,
            type: 'number',
            message: `The parameter "limit" of method ".transactions.getLatestAddressTransactionHashes" must be a number between 1 and 100.`,
            optional: true
        })
        inputValidation({
            input: offset,
            type: 'number',
            message: `The parameter "offset" of method ".transactions.getLatestAddressTransactionHashes" must be a number.`,
            optional: true
        })
        inputValidation({
            input: cursor,
            type: 'string',
            message: `The parameter "cursor" of method ".transactions.getLatestAddressTransactionHashes" must be a string in the format of "{blockNumber},{transactionIndex}".`,
            optional: true
        })
        return request({
            subUrl: `/transaction-hashes/${address}`,
            query: {
                limit: limit,
                offset: offset,
                cursor: cursor
            }
        })
    },
    /**
     * Fetch the latest transactions for the provided address.
     * @param {string} address
     * @param {number} limit
     * @param {number} offset
     * @param {string} cursor
     * @returns {[Transaction]}
     */
    getLatestAddressTransactions(address, limit, offset, cursor) {
        inputValidation({
            input: address,
            type: 'string',
            message: `The method ".transactions.getLatestAddressTransactions" requires a Solana address.`
        })
        inputValidation({
            input: limit,
            type: 'number',
            message: `The parameter "limit" of method ".transactions.getLatestAddressTransactions" must be a number between 1 and 100.`,
            optional: true
        })
        inputValidation({
            input: offset,
            type: 'number',
            message: `The parameter "offset" of method ".transactions.getLatestAddressTransactions" must be a number.`,
            optional: true
        })
        inputValidation({
            input: cursor,
            type: 'string',
            message: `The parameter "cursor" of method ".transactions.getLatestAddressTransactions" must be a string in the format of "{blockNumber},{transactionIndex}".`,
            optional: true
        })
        return request({
            subUrl: `/transactions/${address}`,
            query: {
                limit: limit,
                offset: offset,
                cursor: cursor
            }
        })
    },
    /**
     * Fetch up to 100 recent transactions.
     * @param {number} limit
     * @param {string} cursor
     * @returns {[Transaction]}
     */
    getLatestTransactions(limit, cursor) {
        inputValidation({
            input: limit,
            type: 'number',
            message: `The parameter "limit" of method ".transactions.getLatestTransactions" must be a number between 1 and 100.`,
            optional: true
        })
        inputValidation({
            input: cursor,
            type: 'string',
            message: `The parameter "cursor" of method ".transactions.getLatestTransactions" must be a string in the format of "{blockNumber},{transactionIndex}".`,
            optional: true
        })
        return request({
            subUrl: `/latest-transactions`,
            query: {
                limit: limit,
                cursor: cursor
            }
        })
    },
    /**
     * Fetch the latest transactions in the block with provided block number.
     * @param {number} blockNumber
     * @param {number} limit
     * @param {number} offset
     * @param {string} cursor
     * @returns {[Transaction]}
     */
    getBlockTransactions(blockNumber, limit, offset, cursor) {
        inputValidation({
            input: blockNumber,
            type: 'number',
            message: `The method ".transactions.getBlockTransactions" requires a block number.`
        })
        inputValidation({
            input: limit,
            type: 'number',
            message: `The parameter "limit" of method ".transactions.getBlockTransactions" must be a number between 1 and 100.`,
            optional: true
        })
        inputValidation({
            input: offset,
            type: 'number',
            message: `The parameter "offset" of method ".transactions.getBlockTransactions" must be a number.`,
            optional: true
        })
        inputValidation({
            input: cursor,
            type: 'string',
            message: `The parameter "cursor" of method ".transactions.getBlockTransactions" must be a string in the format of "{transactionIndex}".`,
            optional: true
        })
        return request({
            subUrl: `/block-transactions/${blockNumber}`,
            query: {
                limit: limit,
                offset: offset,
                cursor: cursor
            }
        })
    }
}