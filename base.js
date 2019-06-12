var webdriver = require('selenium-webdriver');
By = webdriver.By;
var fs = require('fs');

var getDriver = function() {
    return new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .forBrowser('chrome')
    .build();
};

var sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

var saveScreenshot = function(data, fileName) {
    var base64Data = data.replace(/^data:image\/png;base64,/,"")
    fs.writeFile(fileName, base64Data, 'base64', function(err) {
        if(err) console.log(err);
    });
};

var searchFor = function(text, element) {
    element.sendKeys(text);
};

var navigateToUrl = async function(url, validation, driver) {
    driver.get(url);
    sleep(3000);
    var valText = await driver.findElement(By.xpath("//span[@ng-if='searchText']")).getText();
    if (valText.includes(validation)) {
        console.log("URL, " + url + ", validated successfully.");
        return true;
    } else {
        console.log("URL, " + url + ", failed validation.");
        return false;
    }
};

module.exports = {getDriver, sleep, saveScreenshot, navigateToUrl, searchFor};