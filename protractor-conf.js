exports.config = {
    seleniumAddress: 'http://localhost:4444',
    baseUrl: 'http://localhost:8888',
    specs: ['tests/*-spec.js'],
    capabilities:
    {
        browserName: 'phantomjs',
    }
};
