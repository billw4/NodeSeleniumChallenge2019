var By = require('selenium-webdriver').By;
var fs = require('fs');

function BasePage(webdriver) {
    this.driver = webdriver;
}

BasePage.prototype.open = async function(url) {
    await this.driver.get(url);
    return this;
};

BasePage.prototype.pageLoaded = async function(expectedTitle) {
    var loaded = false;
    await this.driver.getTitle()
    .then(async function(title) {
        if (title.includes(expectedTitle)) {
            loaded = true;
            return await loaded;
        }
    })
    return loaded;
};

BasePage.prototype.sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

BasePage.prototype.takeScreenshot = function() {
    return this.driver.takeScreenshot();
};

BasePage.prototype.saveScreenshot = function(data, fileName) {
    var base64Data = data.replace(/^data:image\/png;base64,/,"")
    fs.writeFile(fileName, base64Data, 'base64', function(err) {
        console.log("Screenshot saved.");
        if(err) console.log(err);
    });
};

BasePage.prototype.searchFor = function(text, element) {
    element.sendKeys(text);
};

BasePage.prototype.navigateToUrl = async function(url, validation, locator, driver) {
    driver.get(url);
    var valText = await driver.findElement(By.xpath(locator)).getText();
    if (valText.includes(validation)) {
        console.log("URL, " + url + ", validated successfully.");
        return true;
    } else {
        console.log("URL, " + url + ", failed validation.");
        return false;
    }
};

module.exports = BasePage;