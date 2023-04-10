Feature('D2C');
const customSteps = require('../steps_file');
const I = actor(customSteps());
//const I = actor();
const urls = require('../configs/urls');
const data = require('../configs/credentials');
const D2C = require('../Pages/D2C_anonymousquote')


Scenario('D2C Quote Creation', async ({ I }) => {
    await D2C.ErrorValidation()
    I.amOnPage(urls.authUser.D2C_UAT)
    I.wait(5)
    await D2C.LoadData('D2C.xlsx')
    await D2C.AnonymousD2CQuote()
    I.wait(5)
    

})