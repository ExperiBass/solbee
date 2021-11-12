const axios = require('axios')
const {
    getSettings
} = require('./utility')
const throwError = require('./throwError')
const log = require('./log')
const path = require('path')
const {
    version,
    formattedName
} = require('../../package.json')
const DEFAULT = `${formattedName}-v${version}`

/**
 * @private
 *  subUrl -> remaining url part specific to the function call
 *
 *  query -> aditional query parameters
 */
function makeRequest({
    subUrl,
    query
}) {
    const link = "https://api.solanabeach.io/v1"
    const {
        apiKey,
        programName
    } = getSettings()
    const checkForExcessSlashes = /\/(?=\/)(?<!https:\/)/g
    let headers = {
        'accept': 'application/json'
    }
    let fullURL = `${link}${subUrl}/`

    // If query params are defined, add them to the end of the full url
    if (query) {
        // Cicle each query entry and add to the full url in the form '&key=value'
        // Because all request already have '?datasource' no need to manage the ? on the first query param
        Object.keys(query).forEach(queryKey => {
            // query params undefined or empty, or array of length 0
            if (query[queryKey] === undefined || query[queryKey] === '') {
                return
            }
            if (query[queryKey].length && query[queryKey].length === 0) {
                return
            }
            fullURL += `&${queryKey}=${query[queryKey]}`
        })
    }
    // and the auth token
    headers['Authorization'] = `Bearer: ${apiKey}`
    if (apiKey === '') {
        throw throwError(`This API requires a auth token.`, `NO_AUTH_TOKEN`)
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
            throw throwError(error.message, 'SOLBEE_ERROR')
        })
}

module.exports = makeRequest