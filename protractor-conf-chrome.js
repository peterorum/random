exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: 'http://localhost:8888',
    specs: ['tests/*-chrome.js'],
    capabilities:
    {
        browserName: 'chrome',
    }
};
