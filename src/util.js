let chalk = require('chalk')
let Axios = require('axios')
const {formattedName} = require('../package.json')
module.exports = {
    errorToConsole(msg) {
        try {
            throw Error(msg)
        } catch (e) {
            module.exports.log(`${e.stack}`, 'ERROR')
        }
    },
    /**
     * @private
     * @param {string} message The log message.
     * @param {string} type Either 'INFO', 'WARN','WARNING', or 'ERROR'.
     */
    log(message, type = 'info') {
        if (message) {
            switch (type.toLowerCase()) {
                case 'info': {
                    console.log(`${chalk.green(`[${formattedName}:${type.toUpperCase()}]:`)} ${message}`)
                    break
                }
                case 'warn':
                case 'warning': {
                    console.log(`${chalk.yellow(`[${formattedName}:${type.toUpperCase()}]:`)} ${message}`)
                    break
                }
                case 'error': {
                    return console.log(`${chalk.red(`[${formattedName}:${type.toUpperCase()}]:`)} ${message}`)
                }
                default: {
                    return
                }
            }
        }
    }
}