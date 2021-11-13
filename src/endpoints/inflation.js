const {request} = require('../util/util')
module.exports = {
    /**
     * Fetch inflation information.
     * @returns {Object}
     */
    getInflation() {
        return request({
            subUrl: '/inflation'
        })
    },
    /**
     * Fetch Solana supply info provided by the RPC.
     * @returns {Object}
     */
    getSupply() {
        return request({
            subUrl: '/supply'
        })
    }
}