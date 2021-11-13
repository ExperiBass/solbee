# SolBee

Wrapper for the [Solana Beach](https://solanabeach.io/) API.

# Usage
```js
const SolBee = require('solbee')

const client = new SolBee({
    apiKey: "KEY_GOES_HERE",
    projectName: "App Name Here"
})

let response = await client.group.function()

response.data // do something with the data
response.headers // and/or the headers

// or...
client.group.function().then(response => {
    response.data
    response.headers
})
```

# TODO
- Figure out why the doc building script isn't working and fix