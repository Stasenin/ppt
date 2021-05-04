const fs = require('fs')
const configPath = 'config/config.json'
const conf = JSON.parse(fs.readFileSync(configPath).toString())

module.exports = {
    launch: {
        headless: false,
        browser: conf.browser,
        defaultViewport: null,
        ignoreHTTPSErrors: true,
        args: ['--window-size=1920,1080']
    }
}
