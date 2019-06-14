require('chromedriver');
var DriverInit = require('./DriverInit.js');
var HomePage = require('./HomePage.js');
var SearchPage = require('./SearchPage.js');

describe("Challenge 7 Suite", function() {
    this.timeout(20000);
    let driver;

    before(function () {
        driver = DriverInit.getDriver();
        driver.manage().window().maximize();
        homePage = new HomePage(driver);
        searchPage = new SearchPage(driver);
    });

    after(function (done) {
        driver.quit();
        done();
    });

    it("should open the Copart website", function(done) {
        homePage.open(HomePage.HOMEPAGE_URL)
        homePage.pageLoaded("Auto Auction");
        done();
    });

    it("should validate the URLs for popular MAKES", function(done) {
        this.timeout(100000);
        searchPage.getNamesAndUrlsByMakeOrModel("make")
        .then(function(makes) {
            searchPage.getCurrentUrl()
            .then(function(url) {
                searchPage.validatePopularMakeAndModelUrls(makes, url)
                .then(function() {
                    done();
                });
            })
        });
    });

    it("should validate the URLs for popular MODELS", function(done) {
        this.timeout(100000);
        searchPage.getNamesAndUrlsByMakeOrModel("model")
        .then(function(models) {
            searchPage.getCurrentUrl()
            .then(function(url) {
                searchPage.validatePopularMakeAndModelUrls(models, url)
                .then(function() {
                    done();
                });
            })
        });
    });

})