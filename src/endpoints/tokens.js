const inputValidation = require('../util/inputValidation')
const request = require('../util/request')
const {
    Token,
    TokenHolder,
    TokenTransfer
} = require('../util/definitions')

module.exports = {
    /**
     * Fetch 100 tokens.
     * @param {number} limit
     * @param {number} offset
     * @param {string} sort Sort the returned data. Options are name, price, volume, change, marketcap, holders, swapVolume, swapPrice, marketVolume, marketPrice
     * @param {string} dir The sorting direction. Either 'asc' or 'desc'.
     * @returns {[Token]}
     */
    getTokens(limit = 100, offset = 0, sort = 'name', dir = 'asc') {
        inputValidation({
            input: limit,
            type: 'number',
            message: `The paramater "limit" of method ".tokens.getTokens" must be a number between 1 and 100.`,
            optional: true
        })
        inputValidation({
            input: offset,
            type: 'number',
            message: `The paramater "offset" of method ".tokens.getTokens" must be a number.`,
            optional: true
        })
        inputValidation({
            input: sort,
            type: 'string',
            message: `The paramater "sort" of method ".tokens.getTokens" must be a valid option.`,
            optional: true,
            options: ["name", "price", "volume", "change", "marketcap", "holders", "swapVolume", "swapPrice", "marketVolume", "marketPrice"]
        })
        inputValidation({
            input: dir,
            type: 'string',
            message: `The paramater "dir" of method ".tokens.getTokens" must be a valid option.`,
            optional: true,
            options: ["asc", "desc"]
        })
        return request({
            subUrl: '/tokens',
            query: {
                limit: limit,
                offset: offset,
                sort: sort,
                dir: dir
            }
        })
    },
    /**
     * Fetch the holders of a token.
     * @param {string} mintAddress The address that minted the token.
     * @param {number} limit
     * @param {number} offset
     * @returns {[TokenHolder]}
     */
    getTokenHolders(mintAddress, limit = 100, offset = 0) {
        inputValidation({
            input: mintAddress,
            type: 'string',
            message: `The method ".tokens.getTokenHolders" requires a mint address.`
        })
        inputValidation({
            input: limit,
            type: 'number',
            message: `The parameter "limit" of method ".tokens.getTokenHolders" must be a number between 1 and 100.`,
            optional: true
        })
        inputValidation({
            input: offset,
            type: 'number',
            message: `The parameter "offset" of method ".tokens.getTokenHolders" must be a number.`,
            optional: true
        })
        return request({
            subUrl: `/token/${mintAddress}/holders`,
            query: {
                limit: limit,
                offset: offset
            }
        })
    },
    /**
     * Fetch the token transfers.
     * @param {string} mintAddress The address that minted the token.
     * @param {number} limit
     * @param {number} offset
     * @param {string} cursor A string in the format "blockNumber,transactionIndex".
     * @returns {[TokenTransfer]}
     */
    getTokenTransfers(mintAddress, limit = 100, offset = 0, cursor) {
        inputValidation({
            input: mintAddress,
            type: 'string',
            message: `The method ".tokens.getTokenTransfers" requires a mint address.`
        })
        inputValidation({
            input: limit,
            type: 'number',
            message: `The parameter "limit" of method ".tokens.getTokenTransfers" must be a number between 1 and 100.`,
            optional: true
        })
        inputValidation({
            input: offset,
            type: 'number',
            message: `The parameter "offset" of method ".tokens.getTokenTransfers" must be a number.`,
            optional: true
        })
        inputValidation({
            input: cursor,
            type: 'string',
            message: `The parameter "cursor" of method ".tokens.getTokenTransfers" must be a string in the format of "{blockNumber},{transactionIndex}".`,
            optional: true
        })
        return request({
            subUrl: `/token/${mintAddress}/transfers`,
            query: {
                limit: limit,
                offset: offset,
                cursor: cursor
            }
        })
    },
    /**
     * Fetch a single token.
     * @param {string} pubKey The public key of the token.
     * @returns {Token}
     */
    getTokenByPubKey(pubKey) {
        inputValidation({
            input: pubKey,
            type: 'string',
            message: `The method ".tokens.getTokenByPubKey" requires a public key.`
        })
        return request({
            subUrl: `/token/${pubKey}`
        })
    },
    /**
     * Fetch the tokens held by a specified address.
     * @param {string} ownerAddress
     * @param {number} limit
     * @param {number} offset
     * @returns {[Token]}
     */
    getTokensHeldByAddress(ownerAddress, limit = 100, offset = 0) {
        inputValidation({
            input: ownerAddress,
            type: "string",
            message: `The method ".tokens.getTokensHeldByAddress" requires a Solana wallet address.`
        })
        inputValidation({
            input: limit,
            type: "number",
            message: `The parameter "limit" of method ".tokens.getTokensHeldByAddress" must be a number between 1 and 100.`,
            optional: true
        })
        inputValidation({
            input: offset,
            type: "number",
            message: `The parameter "offset" of method ".tokens.getTokensHeldByAddress" must be a number.`,
            optional: true
        })
        return request({
            subUrl: `/token-accounts/${ownerAddress}`,
            query: {
                limit: limit,
                offset: offset
            }
        })
    },
    /**
     * Fetch the tokens transferred by a specified address.
     * @param {string} ownerAddress
     * @param {number} limit
     * @param {number} offset
     * @param {string} cursor
     * @returns {[TokenTransfer]}
     */
    getTokensTransferredByAddress(ownerAddress, limit, offset, cursor) {
        inputValidation({
            input: ownerAddress,
            type: 'string',
            message: `The method ".tokens.getTokensTransferredByAddress" requires a Solana address.`
        })
        inputValidation({
            input: limit,
            type: 'number',
            message: `The parameter "limit" of method ".tokens.getTokensTransferredByAddress" must be a number between 1 and 100.`,
            optional: true
        })
        inputValidation({
            input: offset,
            type: 'number',
            message: `The parameter "offset" of method ".tokens.getTokensTransferredByAddress" must be a number.`,
            optional: true
        })
        inputValidation({
            input: cursor,
            type: 'string',
            message: `The parameter "cursor" of method ".tokens.getTokensTransferredByAddress" must be a string in the format of "{blockNumber},{transactionIndex}".`,
            optional: true
        })
        return request({
            subUrl: `/token-transfers/${ownerAddress}`,
            query: {
                limit: limit,
                offset: offset,
                cursor: cursor
            }
        })
    }
}