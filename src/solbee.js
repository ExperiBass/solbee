const log = require("./util/log")
const { setSettings } = require("./util/utility")
const {
    formattedName,
    version
} = require("../package.json")
class SolBee {
    constructor(apiKey, projectName) {
        if (!apiKey) {
            log(`No api key provided on construction!`, 'WARN')
        }
        // TODO: figure out how to pass the apiKey down to the requests function without storing a file
        setSettings({apiKey: apiKey,
        projectName: projectName})
    }
    accounts = require('./endpoints/accounts')
    blocks = require('./endpoints/blocks')
    tokens = require('./endpoints/tokens')
    validators = require('./endpoints/validators')
}
module.exports = SolBee