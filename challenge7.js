require('chromedriver');
var expect = require('chai').expect;
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

    it("should validate the URLs to popular MAKES", function(done) {
        this.timeout(100000);
        searchPage.getNamesAndUrlsByMakeOrModel("make")
        .then(function(makes) {
            searchPage.validatePopularMakeAndModelUrls(makes)
            .then(function() {
                done();
            })
            
        })
        // searchPage.validatePopularMakeAndModelUrls();
        
        
        // this.timeout(100000);
        // setTimeout(function() {
        //     driver.findElements(By.xpath("//div[@ng-if='popularSearches']//a[contains(@href,'make')]"))
        //     .then(function(elems) {
        //         var makes = [];
        //         var makeLinks = [];
        //         for (let i = 0; i < elems.length; i++) {
        //             makes.push(elems[i].getText());
        //             makeLinks.push(elems[i].getAttribute('href'));
        //         }
        //         return Promise.all([Promise.all(makes), Promise.all(makeLinks)])
        //     })
        //     .then(async function(makeResults) {
        //         for (let i = 0; i < makeResults[0].length; i++) {
        //            await Base.navigateToUrl(makeResults[1][i], "for " + makeResults[0][i].toLowerCase(), driver);
        //         }
        //         done();
        //     })
        //     .catch(err => {
        //         driver.takeScreenshot().then(function(data){
        //             Base.saveScreenshot(data, 'makeFail.png');
        //         });
        //         done(err);
        //     })
        // }, 3000);
    });

    // it("should validate the URLs to popular MODELS", function(done) {
    //     this.timeout(100000);
    //     setTimeout(function() {
    //         driver.get("https://www.copart.com/");
    //         driver.findElements(By.xpath("//div[@ng-if='popularSearches']//a[contains(@href,'model')]"))
    //         .then(function(elems) {
    //             var models = [];
    //             var modelLinks = [];
    //             for (let i = 0; i < elems.length; i++) {
    //                 models.push(elems[i].getText());
    //                 modelLinks.push(elems[i].getAttribute('href'));
    //             }
    //             return Promise.all([Promise.all(models), Promise.all(modelLinks)])
    //         })
    //         .then(async function(modelResults) {
    //             for (let i = 0; i < modelResults[0].length; i++) {
    //                await Base.navigateToUrl(modelResults[1][i], "for " + modelResults[0][i].toLowerCase(), driver);
    //             }
    //             done();
    //         })
    //         .catch(err => {
    //             driver.takeScreenshot()
    //             .then(function(data){
    //                 Base.saveScreenshot(data, 'modelFail.png');
    //             });
    //             done(err);
    //         })
    //     }, 5000);
    // });

})