var until = require('selenium-webdriver').until;
var fs = require('fs');
var driver;

function BasePage(webdriver) {
    this.driver = webdriver;
}

BasePage.prototype.open = async function(url) {
    await this.driver.get(url);
    return this;
};

BasePage.prototype.getTitle = function() {
    return this.driver.getTitle();
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

BasePage.prototype.navigateToUrl = async function(url, validation, driver) {
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

module.exports = BasePage;