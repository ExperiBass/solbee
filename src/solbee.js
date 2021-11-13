const { setSettings } = require("./endpoints/utility")
let {log} = require('./util/util')
class SolBee {
    constructor(apiKey, projectName) {
        if (!apiKey) {
            log(`No api key provided on construction!`, 'WARN')
        }
        setSettings({apiKey: apiKey,
        projectName: projectName})
    }
    accounts = require('./endpoints/accounts')
    blocks = require('./endpoints/blocks')
    inflation = require('./endpoints/inflation')
    market = require('./endpoints/market')
    misc = require('./endpoints/misc')
    tokens = require('./endpoints/tokens')
    tokenswap = require('./endpoints/tokenswap')
    transactions = require('./endpoints/transactions')
    utility = require('./endpoints/utility')
    validators = require('./endpoints/validators')
}
module.exports = SolBee