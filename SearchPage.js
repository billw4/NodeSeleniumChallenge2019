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


module.exports = SearchPage;