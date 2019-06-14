var BasePage = require('./BasePage.js');
var By = require('selenium-webdriver').By;

function SearchPage(webdriver) {
    BasePage.call(this, webdriver)
}

var ENTRY_COUNT_SELECTOR_XPATH = "(//select[@name='serverSideDataTable_length'])[1]";
var ENTRY_COUNT_100_OPTION_XPATH = "//select/option[@value='100']";
var ENTRY_STATUS_ID = "serverSideDataTable_info";
var SEARCH_RESULT_MODELS_XPATH = "//span[@data-uname='lotsearchLotmodel']";
var SEARCH_RESULT_DAMAGES_XPATH = "//span[@data-uname='lotsearchLotdamagedescription']";
var FILTER_OPTION_BUTTONS_XPATH = "//ul[@class='list-group']//h4/a[1]";
var FILTER_SEARCH_BOX_XPATH = "/ancestor::li//input[@placeholder='Search']";
var FILTER_RESULTS_XPATH ="//div[@class='checkbox']";
var POPULAR_URLS_XPATH = "//div[@ng-if='popularSearches']//a[contains(@href,' ')]";
var VALIDATION_TEXT_XPATH = "//span[@ng-if='searchText']";

SearchPage.prototype = Object.create(BasePage.prototype);
SearchPage.prototype.constructor = SearchPage;

SearchPage.prototype.select100Entries = async function() {
    await this.getEntrySelector().click();
    await this.get100EntryOption().click();
    await this.sleep(3000);
    return await this.getEntryStatus();
};

SearchPage.prototype.getEntrySelector = function() {
    return this.driver.findElement(By.xpath(ENTRY_COUNT_SELECTOR_XPATH));
};

SearchPage.prototype.get100EntryOption = function() {
    return this.driver.findElement(By.xpath(ENTRY_COUNT_100_OPTION_XPATH));
};

SearchPage.prototype.getEntryStatus = function() {
    return this.driver.findElement(By.id(ENTRY_STATUS_ID)).getText();
};

SearchPage.prototype.getUniqueModels = async function() {
    var modelSet = new Set();
    await this.driver.findElements(By.xpath(SEARCH_RESULT_MODELS_XPATH))
    .then(function(elems) {
        var models = [];
        for (let i = 0; i < elems.length; i++) {
            models.push(elems[i].getText());
        }
        return Promise.all(models);        
    })
    .then(function(modelArray) {
        modelArray.forEach(item => modelSet.add(item));
    });
    return modelSet;
}

SearchPage.prototype.getDamages = async function() {
    var damages = [];
    await this.driver.findElements(By.xpath(SEARCH_RESULT_DAMAGES_XPATH))
    .then(function(elems) {
        for (let i = 0; i < elems.length; i++) {
            damages.push(elems[i].getText());
        }
    });
    return Promise.all(damages);  
};

SearchPage.prototype.getDamageTypeCount = async function(damageType) {
    var count = 0;
    await this.getDamages()
    .then(function(damages) {
        for (let i = 0; i < damages.length; i++) {
            if (damages[i] == damageType) {
                count += 1
            }
        }
    });
    return count;
};

SearchPage.prototype.getMiscDamageCount = async function() {
    var count = 0;
    await this.getDamages()
    .then(function(damages) {
        for (let i = 0; i < damages.length; i++) {
            if (damages[i] != "REAR END" && damages[i] != "FRONT END" && damages[i] != "MINOR DENT/SCRATCHES" && damages[i] != "UNDERCARRIAGE") {
                count += 1
            }
        }
    });
    return count;
};

SearchPage.prototype.getFilterButtons = function() {
    return this.driver.findElements(By.xpath(FILTER_OPTION_BUTTONS_XPATH));
};

SearchPage.prototype.getFilterButtonAndPositionByName = async function(filterName) {
    var buttonElem;
    var position;
    await this.getFilterButtons()
    .then(async function(buttons) {
        for (let i = 0; i < buttons.length; i++) {
            await buttons[i].getText()
            .then(function(text) {
                if (text == filterName) {
                    buttonElem = buttons[i];
                    position = i + 1;
                }
            });
        }
    });
    return [buttonElem, position];
};

SearchPage.prototype.searchFilterByName = async function(filterName, query) {
    var driver = this.driver;
    await this.getFilterButtonAndPositionByName(filterName)
    .then(async function(elem) {
        elem[0].click();
        var index = elem[1];
        var searchElemPath = `(${FILTER_OPTION_BUTTONS_XPATH})[${index}]${FILTER_SEARCH_BOX_XPATH}`;
        await driver.findElement(By.xpath(searchElemPath))
        .then(function(searchBox) {
            searchBox.sendKeys(query);
        });
    });
};

SearchPage.prototype.checkForQueryInFilterResults = async function(filterName, query) {
    var driver = this.driver;
    var modelFound = false;
    await this.getFilterButtonAndPositionByName(filterName)
    .then(async function() {
        await driver.findElements(By.xpath(FILTER_RESULTS_XPATH))
        .then(async function(elem) {
            for (let x = 0; x < elem.length; x++) {
                await elem[x].getText()
                .then(function(text) {
                    if (text == query) {
                        modelFound = true;
                    }
                });
            }
        });
    });
    if (modelFound == false) {
        this.getScreenshot();
    }
    return modelFound;
};

SearchPage.prototype.getScreenshot = async function() {
    var data = await this.takeScreenshot()
    await this.saveScreenshot(data, "failScreenshot.png");
};


SearchPage.prototype.getNamesAndUrlsByMakeOrModel = async function(type) {
    var results = [];
    var regex = /(?<=@href,')(\B)[^']/g;
    var carXpath = POPULAR_URLS_XPATH.replace(regex, type);
    await this.driver.findElements(By.xpath(carXpath))
    .then(function(elems) {
        var cars = [];
        var urls = [];
        for (let i = 0; i < elems.length; i++) {
            cars.push(elems[i].getText());
            urls.push(elems[i].getAttribute('href'));
        }
        results = Promise.all([Promise.all(cars), Promise.all(urls)]);
    });
    return results;
};

SearchPage.prototype.getValidationText = async function(text) {

}

SearchPage.prototype.validatePopularMakeAndModelUrls = async function(results) {
    driver = this.driver;
    for (let i = 0; i < results[0].length; i++) {
        await this.navigateToUrl(results[1][i], "for " + results[0][i].toLowerCase(), VALIDATION_TEXT_XPATH, driver);
    }
};

module.exports = SearchPage;