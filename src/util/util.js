const axios = require('axios')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const {
    projectPath,
    projectConfig,
    localConfig
} = require('./constants')

const {
    version,
    formattedName
} = require('../../package.json')
module.exports = {
    /**
     * @private
     *  subUrl -> remaining url part specific to the function call
     *
     *  query -> aditional query parameters
     */
    request({
        subUrl,
        query
    }) {
        const {
            getSettings
        } = require('../endpoints/utility')
        const link = "https://api.solanabeach.io/v1"
        const {
            apiKey,
            programName
        } = getSettings()
        const DEFAULT = `${formattedName}-v${version}`
        const checkForExcessSlashes = /\/(?=\/)(?<!https:\/)/g
        let headers = {
            'accept': 'application/json'
        }
        let fullURL = `${link}${subUrl}`

        // If query params are defined, add them to the end of the full url
        if (query) {
            // Cicle each query entry and add to the full url in the form '&key=value'
            // Because all request already have '?datasource' no need to manage the ? on the first query param
            Object.keys(query).forEach((queryKey, index) => {
                // query params undefined or empty, or array of length 0
                if (query[queryKey] === undefined || query[queryKey] === '') {
                    return
                }
                if (query[queryKey].length && query[queryKey].length === 0) {
                    return
                }
                if (index === 0) {
                    fullURL += `?${queryKey}=${query[queryKey]}`
                } else {
                    fullURL += `&${queryKey}=${query[queryKey]}`
                }
            })
        }
        // and the auth token
        headers['Authorization'] = `Bearer: ${apiKey}`
        if (apiKey === '') {
            throw module.exports.throwError(`This API requires a auth token.`, `NO_AUTH_TOKEN`)
        }
        // Add in the program name if specified
        if (programName && programName !== '') {
            headers['x-user-agent'] = `${programName} | ${DEFAULT}`
        } else {
            headers['x-user-agent'] = DEFAULT
        }

        // Check the URL for extra forward slashes and delete them
        fullURL = fullURL.replace(checkForExcessSlashes, '')
        let request = axios.get(fullURL, {
            headers
        })
        // Return the promise request, pre set the 'then' and 'catch' clauses
        return request
            .then(response => {
                let data = {
                    headers: response.headers,
                    data: response.data
                }
                return data
            }).catch(error => {
                console.log(JSON.stringify(error, null, 2))
                throw module.exports.throwError(error.message, 'SOLBEE_ERROR')
            })
    },
    /**
     * @private
     * @param {string} message The module.exports.log message.
     * @param {string} type Either 'INFO', 'WARN', 'WARNING', or 'ERROR'.
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
                    console.log(`${chalk.red(`${formattedName}:${type.toUpperCase()}]:`)} ${message}`)
                }
                default: {
                    return
                }
            }
        }
    },
    /**
     * @private
     * @returns 
     */
    inputValidation({
        input,
        type,
        message,
        options,
        optional = false
    }) {

        // If is optional and input is undefined, no need to validate
        if (optional && input === undefined) {
            return
        }

        // Do not check for !input or you are making that you won't accept falsy values such as empty '' or id = 0
        if (input === undefined) {
            throw module.exports.throwError(message, `INPUT_UNDEFINED`)
        }
        if (typeof input !== type) {
            throw module.exports.throwError(message, `INPUT_NOT_EQUAL_TO_REQUIRED_TYPE`)
        }
        // If options is provided, check that input is included
        if (options && !options.includes(input)) {
            let formattedOptions = ""
            for (let option of options) {
                formattedOptions += `\t${option}\n`
            }
            throw module.exports.throwError(`${message}\nThe valid options are:\n${formattedOptions}`, `GIVEN_OPTION_NOT_VALID_OPTION`)
        }
    },
    /**
     * @private
     * @param {string} msg
     * @param {string} code
     * @param {string} url
     */
    throwError(msg, code, url) {
        let error = Error(msg)
        url ? error.url = url : false
        error.code = code ? code : 'NO_CODE_DEFINED'
        return error
    },
    /**
     * @private
     */
    checkForConfig() {
        // Check for a solbee config file in the project directory
        try {
            let fileExists = fs.existsSync(projectConfig)

            // If the file exists...
            if (fileExists) {
                // ...see if we can read it...
                try {
                    fs.accessSync(projectConfig, fs.constants.R_OK)

                    // ...then see if we can write into it
                    try {
                        fs.accessSync(projectConfig, fs.constants.W_OK)
                    } catch (e) {
                        module.exports.log(`Couldn't write to 'solbee.json', reverting to default configuration`, 'WARNING')
                        return false
                    }
                } catch (e) {
                    module.exports.log(`Couldn't read config file, reverting to default configuration`, 'WARNING')
                    return false
                }

            } else {
                // If the file doesn't exist...
                module.exports.log(`The config file doesn't exist! Reverting to default configuration and attempting to write to "${projectConfig}"...`, 'INFO')
                try {
                    // ...attempt to create it
                    fs.writeFileSync(projectConfig, JSON.stringify(require(localConfig), null, 2))
                    module.exports.log(`Sucessfully created config file in ${projectPath}!`, 'INFO')
                } catch (e) {
                    throw module.exports.throwError(`There was a error while attempting to create the config file! Error: \n${e}`)
                }
                return false
            }

        } catch (e) {
            return false
        }
        return true
    }
}