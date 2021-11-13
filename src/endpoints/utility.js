const fs = require('fs')
const {throwError, checkForConfig, log} = require('../util/util')
const {
    projectConfig,
    localConfig
} = require('../util/constants')

module.exports = {
    /**
     * Gets the settings for SolBee.
     * @returns {JSON} A JSON object with the settings.
     */
    getSettings() {
        let settings;
        if (checkForConfig()) {
            settings = fs.readFileSync(projectConfig, 'utf8')
            return JSON.parse(settings)
        } else {
            log(`No project config file! Attempting to revert to default configuration...`, 'WARN')
            settings = fs.readFileSync(localConfig, 'utf8')
        }
        return JSON.parse(settings)
    },
    /**
     * Sets the settings for SolBee.
     * @param {string} apiKey The API key emailed to you.
     * @param {string} projectName The name of your project. Passed in as a identifying header.
     * @returns {Boolean} `true` if it was able to sucessfully write. Otherwise, a error.
     */
    setSettings({
        apiKey,
        projectName
    }) {
        if (checkForConfig()) {
            let currentSettings = module.exports.getSettings()

            // Check if settings are already set, and dont change if not needed
            apiKey = apiKey || currentSettings.apiKey
            projectName = projectName || currentSettings.projectName

            try {
                const newConfig = JSON.stringify({
                    projectName: projectName,
                    apiKey: apiKey
                }, null, 2)
                fs.writeFileSync(projectConfig, newConfig)
                log(`Sucessfully updated config!`, 'INFO')
            } catch (e) {
                throw throwError(`Couldn't write config file! Error:\n${e}`)
            }
            return true
        }
        throw throwError(`If you are seeing this error, 2 + 2 is not equal to 4 and your life is a lie.`, 'THIS_SHOULDNT_EVER_HAPPEN')
    },
    /**
     * Pause execution of code for a specified amount of time.

     * @param {number} millis The time to delay (in milliseconds)
     * @returns {Promise<function>}
     */
    async sleep(millis) {
        return new Promise(resolve => setTimeout(resolve, millis))
    }
}