const inputValidation = require('../util/inputValidation')
const request = require('../util/request')
const { TokenSwap } = require('../util/definitions')

module.exports = {
    /**
     * Fetch token swaps.
     * @param {number} limit
     * @param {number} offset
     * @param {string} sort
     * @param {string} dir
     * @returns {[TokenSwap]}
     */
    getTokenSwaps(limit, offset, sort, dir) {
        inputValidation({
            input: limit,
            type: 'number',
            message: `The paramater "limit" of method ".tokenswap.getTokenSwaps" must be a number between 1 and 100.`,
            optional: true
        })
        inputValidation({
            input: offset,
            type: 'number',
            message: `The paramater "offset" of method ".tokenswap.getTokenSwaps" must be a number.`,
            optional: true
        })
        inputValidation({
            input: sort,
            type: 'string',
            message: `The paramater "sort" of method ".tokenswap.getTokenSwaps" must be a valid option.`,
            optional: true,
            options: ["name", "price", "volume", "liquidity"]
        })
        inputValidation({
            input: dir,
            type: 'string',
            message: `The paramater "dir" of method ".tokenswap.getTokenSwaps" must be a valid option.`,
            optional: true,
            options: ["asc", "desc"]
        })
        return request({
            subUrl: '/token-swaps',
            query: {
                limit: limit,
                offset: offset,
                sort: sort,
                dir: dir
            }
        })
    },
    /**
     * Fetch token swaps by mint address.
     * @param {string} mint
     * @param {number} limit
     * @param {number} offset
     * @returns {[TokenSwap]}
     */
    getSwapsByMint(mint, limit, offset) {
        inputValidation({
            input: mint,
            type: 'string',
            message: `The method ".tokenswap.getSwapsByMint" requires a mint address of type "string".`
        })
        inputValidation({
            input: limit,
            type: 'number',
            message: `The paramater "limit" of method ".tokenswap.getSwapsByMint" must be a number between 1 and 100.`,
            optional: true
        })
        inputValidation({
            input: offset,
            type: 'number',
            message: `The paramater "offset" of method ".tokenswap.getSwapsByMint" must be a number.`,
            optional: true
        })
        return request({
            subUrl: `/token-swaps/${mint}`,
            query: {
                limit: limit,
                offset: offset
            }
        })
    },
    /**
     * Fetch token swap by public key.
     * @param {string} pubkey
     * @returns {TokenSwap}
     */
    getSwapByPubkey(pubkey) {
        inputValidation({
            input: pubkey,
            type: 'string',
            message: `The method ".tokenswap.getSwapByPubkey" requires a public key of type "string".`
        })
        return request({
            subUrl: `/token-swap/${pubkey}`
        })
    }
}