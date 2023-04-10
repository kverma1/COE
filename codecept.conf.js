const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// HEADLESS=true npx codecept run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './tests/*.js',
 // include: require('./configs/includes.js'),
  I: './steps_file.js',
  require: ['dotenv', 'deepmerge'],
  bootstrap: null,
  output: './output',
  helpers: {
    WebDriver: {
      url: 'http://www.google.com',
      browser: 'chrome',
      windowSize: 'maximize',
    /*  desiredCapabilities: {
         chromeOptions: {
           args: ["--headless", "--disable-gpu", "--no-sandbox"]
         },
      },
      */
      "fullPageScreenshots": true
    },
    Mochawesome: {
      uniqueScreenshotNames: true
      },
      
    //"REST": {},
    //"BrowserObj": { require: "./helpers/browser_obj.js" },
    FileSystem: { 

    },
   
  
  },
  mocha: {
    reporterOptions: {
        'reportDir': "./output/mochawesome/",
      'codeceptjs-cli-reporter': {
        stdout: './output/result.xml',
        options: {
          verbose: true,
          steps: true
        }
      },
      mochawesome: {
        stdout: './output/console/console.log',
        options: {
          reportDir: './output/mochawesome/',
          reportFilename: 'report',
          quiet: true,
          json: false,
          html: true,
          overwrite: true
        }
      }
    }
  },
  name: 'Unqork_COE',
  plugins: {
    retryFailedStep: {
      enabled: true
    },
    autoDelay: {
      enabled: true
    },
   pauseOnFail:{
      enabled: false
    },
    tryTo: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true,
      uniqueScreenshotNames: true,
      fullPageScreenshots: true

    },
    // stepByStepReport: {
    //   enabled: true
    // ,
    allure: {
      enabled: true
    },
  },
  'codeceptjs-cli-reporter': {
    stdout: './output/result.xml',
    options: {
      verbose: true,
      steps: true
    }
  },
}
