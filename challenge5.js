require('chromedriver');
var webdriver = require('selenium-webdriver');
var expect = require('chai').expect;
var By = webdriver.By;
var Base = require('./BasePage.js');
var DriverInit = require('./DriverInit.js');
var HomePage = require('./HomePage.js');
var SearchPage = require('./SearchPage.js');

describe("Challenge 5 Suite", function() {
    this.timeout(20000);
    let driver;

    before(function () {
        driver = DriverInit.getDriver();
        homePage = new HomePage(driver);
        searchPage = new SearchPage(driver);
    });

    after(function(done) {
        driver.quit();
        done();
    });

    it("should open the Copart website", function(done) {
        homePage.open(HomePage.HOMEPAGE_URL)
        .then(function() {
            driver.getTitle()
            .then(function(title) {
                expect(title).to.include("Auto Auction");
                done();
            });
        });
    });

    it("should search for 'Porsche'", function(done) {
        homePage.searchFor("Porsche")
        .then(function(title) {
            expect(title).to.include("Porsche");
            done();
        });
    });

    it("should display 100 results", function(done) {
        searchPage.select100Entries()
        .then(function(status) {
            expect(status).to.include("100");
            done();
        });
    });

    it("should retrieve Porsche model count", function(done) {
        searchPage.getUniqueModels()
        .then(function(models) {
            console.log("Porsche model count: " + models.size);
            done();
        });
    });

    it("should retrieve Rear End damage count", function(done) {
        searchPage.getDamageTypeCount("REAR END")
        .then(function(count) {
            console.log("Rear End damage count: " + count);
            done();
        });
    });

    it("should retrieve Front End damage count", function(done) {
        searchPage.getDamageTypeCount("FRONT END")
        .then(function(count) {
            console.log("Front End damage count: " + count);
            done();
        });
    });

    it("should retrieve Minor Dent and Scratch damage count", function(done) {
        searchPage.getDamageTypeCount("MINOR DENT/SCRATCHES")
        .then(function(count) {
            console.log("Minor Dent and Scratch damage count: " + count);
            done();
        });
    });

    it("should retrieve Undercarriage damage count", function(done) {
        searchPage.getDamageTypeCount("UNDERCARRIAGE")
        .then(function(count) {
            console.log("Undercarriage damage count: " + count);
            done();
        });
    });

    it("should retrieve Misc. damage count", function(done) {
        searchPage.getMiscDamageCount()
        .then(function(count) {
            console.log("Misc. damage count: " + count);
            done();
        });
    });

})