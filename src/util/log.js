module.exports = log

let chalk = require('chalk')
const {formattedName} = require('../../package.json')

/**
 * @private
 * @param {string} message The log message.
 * @param {string} type Either 'INFO', 'WARN', or 'WARNING'.
 */
function log(message, type = 'info') {
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
                return `${chalk.red(`${formattedName}:${type.toUpperCase()}]:`)} ${message}`
            }
            default: {
                return
            }
        }
    }
}