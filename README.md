# puppeteer test example
Simple example of e2e test with ts+puppeter+jest

## Requirements
Node.js >= 12

## Globals
- browser <[[Browser](https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#class-browser)]> - puppeteer browser instance
- context <[[Context](https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#class-browsercontext)]> - a new puppeteer context instance for each new test file
- page <[[Page](https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#class-page)]> - puppeteer page instance (since a new context for every test file also a new page for it)

All of them are available globally in each Jest test. 

## Usage
- npm install
- npm run test
