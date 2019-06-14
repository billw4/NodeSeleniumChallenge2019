var BasePage = require('./BasePage.js');
var By = require('selenium-webdriver').By;

function HomePage(webdriver) {
    BasePage.call(this, webdriver)
}

var SEARCH_BAR_ID = "input-search";
var SEARCH_BUTTON_XPATH = "//button[@data-uname='homepageHeadersearchsubmit']";
var POPULAR_MAKES_XPATH = "//div[@ng-if='popularSearches']//a[contains(@href,'make')]";
var POPULAR_MODELS_XPATH = "//div[@ng-if='popularSearches']//a[contains(@href,'model')]";

HomePage.prototype = Object.create(BasePage.prototype);
HomePage.prototype.constructor = HomePage;

HomePage.prototype.searchFor = async function(text) {
    await this.getSearchBar().sendKeys(text);
    await this.getSearchButton().click();
    await this.sleep(2000);
    return await this.driver.getTitle();
};

HomePage.prototype.getSearchBar = function() {
    return this.driver.findElement(By.id(SEARCH_BAR_ID));
};

HomePage.prototype.getSearchButton = function() {
    return this.driver.findElement(By.xpath(SEARCH_BUTTON_XPATH));
};

HomePage.prototype.getPopularMakes = function() {
    return this.driver.findElements(By.xpath(POPULAR_MAKES_XPATH));
};

HomePage.prototype.getPopularModels = function() {
    return this.driver.findElements(By.xpath(POPULAR_MODELS_XPATH));
};

module.exports = HomePage;
module.exports.HOMEPAGE_URL = "https://www.copart.com/";