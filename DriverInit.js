var webdriver = require('selenium-webdriver');

var getDriver = function() {
    return new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .forBrowser('chrome')
    .build();
};

module.exports.getDriver = getDriver;