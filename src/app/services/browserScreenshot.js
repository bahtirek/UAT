///<reference types="chrome"/>
import { dataUrl } from "./../data/dataUrl";

if (typeof browser === "undefined" && typeof chrome !== "undefined") {
  var browser = chrome;
}

const getScreenshot = async function(){
  return new Promise((resolve, reject) => {
    if(browser && browser.runtime){
      browser.runtime.sendMessage({todo: "getImage"}, response => {
        if(response.imgSrc) {
          resolve(response.imgSrc);
        } else {
          reject();
        }
      });
    } else {
      // for testing purpose
      resolve(dataUrl)
    }
  })
}

export default {
  getScreenshot
}
