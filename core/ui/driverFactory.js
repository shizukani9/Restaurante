const { Builder, Browser, WebDriver } = require("selenium-webdriver");
const configuration = require("../../configuration.json");
const ChromeDriver = require("./chromedriver");

const browserStrategy ={
    chrome: ChromeDriver
}

module.exports = class DriverFactory{
    /** @type {WebDriver} */
    static myDriver;
    
    constructor(){
        return (async()=>{
            if(!this.myDriver){
                console.log("starting Browser");
                DriverFactory.myDriver = await new browserStrategy[
                    configuration.browser.name.toLowerCase()
                ](configuration);
                /*if(configuration.browser.maxWindows){
                    console.log("Maximizing windows");
                    await DriverFactory.myDriver.manage().window().maximize();
                }*/
                if(configuration.browser.timeout){
                    /*console.log("Setting timeout", configuration.browser.timeout);
                    await DriverFactory.myDriver
                    .manage()
                    .timeouts( {implicit: configuration.browser.timeout} );*/
                }    
            }else{
                console.log("Driver already exists");
            }
            return DriverFactory.myDriver;
        })();
    }

    static async closeInstance(){
        console.log("Closing browser");
        await DriverFactory.myDriver.close();
        try {
            await DriverFactory.myDriver.quit();
        }catch(error){
            console.log("Failed to close browser");
        }
        DriverFactory.myDriver = null;
        console.log("Browser closed");
    }

    static async closeDriver(){
        console.log("Closing driver");
        try{
            await DriverFactory.myDriver.close();
        }catch(error){
            console.log("Failed to close driver");
        }
        await DriverFactory.myDriver.quit();
        DriverFactory.myDriver = null;
        console.log("Driver closed");
    }

}