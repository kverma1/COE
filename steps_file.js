// in this file you can append custom step methods to 'I' object
const {I} = inject();
module.exports = function() {
  
  return actor({

    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.

      selectInDropdown: function(dropdown, value) {
      this.click(dropdown);
      // wait for dropdown list to appear
      this.waitForVisible(`//li//unqorkio-select-item/span[contains(text(), '${value}')]`); 
      // click on it
      this.click(`//li//unqorkio-select-item/span[contains(text(), '${value}')]`);
    },
    seeInDropdown : function(dropdown, value){
      this.click(dropdown);
      // wait for dropdown list to appear
      this.waitForVisible(`//li//unqorkio-select-item/span[contains(text(), '${value}')]`); 
      this.seeElement(`//li//unqorkio-select-item/span[contains(text(), '${value}')]`); 
      this.pressKey('Enter')
    },
    findbyid: function(id){ 
      return `//*[@id= '${id}']`
      }

  });
}
