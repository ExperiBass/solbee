const path = require('path')
/**
 * @private
 */
module.exports = {
    localConfig: path.join(__dirname, `../solbee.json`),
    projectConfig: path.join(__dirname, '../../../../solbee.json'),
    projectPath: path.join(__dirname, `../../../../`),
}