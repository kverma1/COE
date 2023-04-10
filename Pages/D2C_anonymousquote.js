const customSteps = require('../steps_file');
const I = actor(customSteps());
const assert = require('assert');
const data = require('../configs/credentials')
const objects = require('../Object_Repository/D2C');
const urls = require('../configs/urls');
var fs = require('fs-extra');
const excelToJson = require('convert-excel-to-json');
var json2xls = require('json2xls');
let OwnerRelationship
let AnnualIncome
let Year
let FirstName
let LastName
let DOB
let Gender
let Email
let Street
let City
let State
let Zipcode
module.exports = {
    
    //Function will be used to check Funding Instruction Screen Validations
  //Read the Data from user input file
  async LoadData(datachoice) {
    //Read the Data from user input file
  const result = excelToJson({
    source: fs.readFileSync(`./DataSheets/${datachoice}`),
    //Just gets all the rows for each sheet defined on the config object
    sheets: [{
        name: 'Sheet1',
        header: {
            // Is the number of rows that will be skipped and will not be present at our result object. Counting from top to bottom
            rows: 1
        },
        columnToKey: {
            '*': '{{columnHeader}}'
        },
    },
    ]
});


// Result will be an Object containing keys with the same name as the sheets found on the excel file. 
// Each of the keys will have an array of objects where each of them represents a row of the container sheet.
// e.g. for a excel file that has two sheets ('sheet1', 'sheet2')
console.log('Excel Output::', result);
//Get the total items within a particular sheet within the json object.
console.log('Total Number of Rows with the Data Sheet - Test Harness ', Object.keys(result.Sheet1).length);





const numberofrows = Object.keys(result.Sheet1).length;
console.log(numberofrows)
var i;
for (i = 0; i < numberofrows; i++) {
    OwnerRelationship = result.Sheet1[`${i}`].OwnerRelationship
    AnnualIncome = result.Sheet1[`${i}`].AnnualIncome
    Year = result.Sheet1[`${i}`].Year
    FirstName = result.Sheet1[`${i}`].FirstName
    LastName = result.Sheet1[`${i}`].LastName
    DOB = result.Sheet1[`${i}`].DOB
    Street = result.Sheet1[`${i}`].Street
    Email = result.Sheet1[`${i}`].Email
    Gender = result.Sheet1[`${i}`].Gender
    City = result.Sheet1[`${i}`].City
    State = result.Sheet1[`${i}`].State
    Zipcode = result.Sheet1[`${i}`].Zipcode


}},
    async AnonymousD2CQuote(){
    I.selectOption(objects.fields.OwnerRelationship,OwnerRelationship)
    I.wait(3)
    I.scrollIntoView(objects.fields.NextBtn)
    I.click(objects.fields.NextBtn)
    I.wait(4)
   /* I.click(objects.fields.NeedAssessment)
    I.fillField(objects.fields.AnnualIncome,AnnualIncome)
    I.fillField(objects.fields.yearsReplaceIncome,Year)
    I.click(objects.fields.MakeCoverage)
    I.wait(2)
    */
    I.click(objects.fields.NextBtnCoverage)
    I.wait(5)
    this.Fill_UserDetails()
    I.click(objects.fields.NextBtnInfo)
    I.wait(3)
    I.forceClick(objects.fields.HealthStatus)
    I.forceClick(objects.fields.TobaccoUse)
    I.click(objects.fields.NextBtnHealth)
    I.see('Congratulations! Here is your quote')
    I.click(objects.fields.SubmitBtn)
    I.wait(3)
    I.fillField(objects.fields.OwnerPhone,'6788822222')
    I.wait(4)
    I.click(objects.fields.SaveBtn)
    I.waitForText("Your quote is now complete!",60)
    I.see("Your quote is now complete!")
    },
    
    async Fill_UserDetails(){
      I.fillField(objects.fields.FirstName,FirstName)  
      I.fillField(objects.fields.LastName,LastName)  
      I.wait(3)
      I.fillField(objects.fields.DOB,DOB)
      customSteps().selectInDropdown(objects.fields.Gender,Gender)
      I.fillField(objects.fields.Email,Email)
      I.fillField(objects.fields.Street,Street)
      I.fillField(objects.fields.City,City)
      I.fillField(objects.fields.State,State)
      I.fillField(objects.fields.Zipcode,Zipcode)
      I.forceClick(objects.fields.Owner_yes)
      
    },

    async ErrorValidation(){
      I.amOnPage(urls.authUser.D2C_UAT)  
      I.wait(3)
      I.click(objects.fields.NextBtn)
      I.see("Select who you are protecting is required")
      I.selectOption(objects.fields.OwnerRelationship,"Spouse/Partner")
      I.selectOption(objects.fields.OwnerRelationship,"Child")
      I.selectOption(objects.fields.OwnerRelationship,"Parent")
      I.selectOption(objects.fields.OwnerRelationship,"Grandchild")
      I.selectOption(objects.fields.OwnerRelationship,"Self")
      I.scrollPageToBottom()
      I.click(objects.fields.NextBtn)
      I.click(objects.fields.NextBtn)
      I.wait(3)
      let minvalue = await I.grabAttributeFrom(objects.fields.DesiredCoverage,'min-value')
      assert.equal(minvalue,"250000")
      let maxvalue = await I.grabAttributeFrom(objects.fields.DesiredCoverage,'max-value')
      assert.equal(maxvalue,"5000000")
      I.scrollIntoView(objects.fields.NextBtnCoverage)
      I.wait(3)
      I.click(objects.fields.NextBtnCoverage)
      I.wait(3)
      I.click(objects.fields.NextBtnInfo)
      I.see("First Name is required")
      I.see("Last Name is required")
      I.see("Date of Birth is required")
      I.see("Gender is required")
      customSteps().seeInDropdown(objects.fields.Gender,"Male")
      customSteps().seeInDropdown(objects.fields.Gender,"Female")
      customSteps().seeInDropdown(objects.fields.Gender,"Non-Binary")
      customSteps().seeInDropdown(objects.fields.Gender,"Prefer Not to State")
      I.see("Email is required")
      I.fillField(objects.fields.Email,"$")
      I.see("Email must be a valid email")
      I.see("Street is required")
      I.see("State is required")
      I.see("Zip Code is required")
      I.see("City is required")
      I.see("Is the owner the same as the insured? is required")
      
    
    }




    

}