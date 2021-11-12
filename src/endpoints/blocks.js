const inputValidation = require('../util/inputValidation')
const request = require('../util/request')
const {
    Program,
    Block
} = require('../util/definitions')

module.exports = {
    /**
     * Fetch a block by its hash.
     * @param {String} blockHash
     * @returns {Block}
     */
    getBlockByHash(blockHash) {
        inputValidation({
            input: blockHash,
            type: 'string',
            message: `The method ".blocks.getBlockByHash" requires a block hash of type "String".`
        })
        return request({
            subUrl: `/block-hash/${blockHash}`
        })
    },
    /**
     * Fetch a block by its number.
     * @param {Number} blockNumber
     * @returns {Block}
     */
    getBlockByNumber(blockNumber) {
        inputValidation({
            input: blockNumber,
            type: "number",
            message: `The method ".blocks.getBlockByNumber requires a block number.`
        })
        return request({
            subUrl: `/block/${blockNumber}`
        })
    },
    /**
     * Get the latest blocks, up to 100.
     * @param {Number} size The number of blocks to return, capped at 100. Defaults to 1.
     * @returns {[Block]}
     */
    getLatestBlocks(size = 1) {
        inputValidation({
            input: size,
            type: 'number',
            message: `The argument "size" of the method ".blocks.getLatestBlocks" must be of type "number" and be equal to or below 100.`,
            optional: true
        })
        if (size > 100 || size < 1) {
            throw throwError(`The argument "size" of the method ".blocks.getLatestBlocks" must be equal to or below 100.`)
        }
        return request({
            subUrl: "/latest-blocks",
            query: {
                limit
            }
        })
    },
    /**
     * Get the top program stats for the last 1000 blocks.
     * @returns {[Program]}
     */
    topPrograms() {
        return request({
            subUrl: "/top-programs"
        })
    }
}