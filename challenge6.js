require('chromedriver');
var expect = require('chai').expect;
var DriverInit = require('./DriverInit.js');
var HomePage = require('./HomePage.js');
var SearchPage = require('./SearchPage.js');

describe("Challenge 5 Suite", function() {
    this.timeout(20000);
    let driver;

    before(function () {
        driver = DriverInit.getDriver();
        driver.manage().window().maximize();
        homePage = new HomePage(driver);
        searchPage = new SearchPage(driver);
    });

    after(function(done) {
        driver.quit();
        done();
    });

    it("should open the Copart website", function(done) {
        homePage.open(HomePage.HOMEPAGE_URL);
        homePage.pageLoaded("Auto Auction");
        done();
    });

    it("should search for 'Nissan'", function(done) {
        homePage.searchFor("Nissan")
        .then(function(title) {
            expect(title).to.include("Nissan");
            done();
        });
    });

    it("should search for the Nissan Skyline", function(done) {
        searchPage.searchFilterByName("Model", "Skyline")
        .then(function() {
            searchPage.checkForQueryInFilterResults("Model", "Skyline")
            .then(function(result) {
                expect(result).to.be.true;
                done();
            })
            .catch(err => {
                done(err);
            });
        });
    });

})