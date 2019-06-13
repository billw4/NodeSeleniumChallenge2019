it("should open the copart website", async function() {
    return driver.get("https://www.copart.com");
});

it("should run a search for Nissan", async function() {
    return header.headerSearch(driver, 'nissan');
});

it("should look at serverSideDataTable to find Nissan in the list", async function() {
    var html = await driver.findElement(By.id('serverSideDataTable')).getAttribute('innerHTML');
    return assert.include(html, 'NISSAN');
});

it("should sort by id=lot_year", async function(){
    return results.sortBy(driver,"lot_year");
});

it("should click the Next page", async function(){
    return results.paginationNext(driver);
});

it("should click the Prev page", async function(){
    return results.paginationPrev(driver);
});

it("should click the Last page", async function(){
    return results.paginationLast(driver);
});

it("should click the First page", async function(){
    return results.paginationFirst(driver);
});

it("should click the page 2", async function(){
    return results.paginationFirst(driver, 2);
});

it("should click 2nd result in the list", async function(){
    return results.viewItemInList(driver, 2);
});



it("should open the copart website", async function() {
    return driver.get("https://www.copart.com");
});

it("should run a search for Nissan", async function() {
    return header.headerSearch(driver, 'honda');
});

it("should look at serverSideDataTable to find Honda in the list", async function() {
    var html = await driver.findElement(By.id('serverSideDataTable')).getAttribute('innerHTML');
    return assert.include(html, 'HONDA');
});

it("should sort by id=lot_year", async function(){
    return results.sortBy(driver,"lot_model");
});

it("should click the Next page", async function(){
    return results.pagination(driver, "next");
});

it("should click the Prev page", async function(){
    return results.pagination(driver, "previous");
});

it("should click the Last page", async function(){
    return results.pagination(driver, "last");
});

it("should click the First page", async function(){
    return results.pagination(driver, "first");
});

it("should click the page 4", async function(){
    return results.pagination(driver, null, 4);
});

it("should click 2nd result in the list", async function(){
    return results.viewItemInList(driver, 2);
});

it("should open the copart website", async function() {
    return driver.get("https://www.copart.com");
});

it("should run a search for Bugatti", async function() {
    return header.headerSearch(driver, 'bugatti');
});

it("should look at serverSideDataTable to find Bugatti in the list", async function() {
    var html = await driver.findElement(By.id('serverSideDataTable')).getAttribute('innerHTML');
    return assert.include(html, 'BUGATTI');
});

it("should sort by id=lot_year", async function(){
    return results.sortBy(driver,"lot_model");
});

it("should click the Next page", async function(){
    return results.pagination(driver, "next");
});

it("should click the Prev page", async function(){
    return results.pagination(driver, "previous");
});

it("should click the Last page", async function(){
    return results.pagination(driver, "last");
});

it("should click the First page", async function(){
    return results.pagination(driver, "first");
});

it("should click the page 4", async function(){
    return results.pagination(driver, null, 4);
});

it("should click 2nd result in the list", async function(){
    return results.viewItemInList(driver, 2);
});