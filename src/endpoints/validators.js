const inputValidation = require('../util/inputValidation')
const request = require('../util/request')
const {Validator} = require('../util/definitions')
// TODO: check the returns
module.exports = {
    /**
     * Fetch a validator by its Vote Public Key.
     * @param {string} pubkey
     * @returns {Validator}
     */
    getValidatorByPubKey(pubkey) {
        inputValidation({
            input: pubkey,
            type: "string",
            message: `The method ".validators.getValidatorByPubKey" requires a public key.`
        })
        return request({
            subUrl: `/validator/${pubkey}`
        })
    },
    /**
     * Fetch the history of a validator.
     * @param {string} pubkey
     * @returns {ValidatorHistory?}
     */
    getValidatorHistoryByPubkey(pubkey) {
        inputValidation({
            input: pubkey,
            type: "string",
            message: `The method ".validators.getValidatorHistoryByPubKey" requires a public key.`
        })
        return request({
            subUrl: `/validator/${pubkey}/history`
        })
    },
    /**
     * Fetch the validators slots in the current epoch.
     * @param {string} pubkey
     * @returns {ValidatorSlots?}
     */
    getValidatorSlots(pubkey) {
        inputValidation({
            input: pubkey,
            type: "string",
            message: `The method ".validators.getValidatorSlots" requires a public key.`
        })
        return request({
            subUrl: `/validator/${pubkey}/slots`
        })
    },
    /**
     * Fetch the delegators of a validator.
     * @param {string} pubkey
     * @returns {ValidatorDelegators?}
     */
    getValidatorDelegators(pubkey) {
        inputValidation({
            input: pubkey,
            type: "string",
            message: `The method ".validators.getValidatorDelegators" requires a public key.`
        })
        return request({
            subUrl: `/validator/${pubkey}/delegators`
        })
    }
}