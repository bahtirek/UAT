///<reference types="chrome"/>
import { Injectable } from '@angular/core';
import { dataUrl } from '../data/dataUrl';

@Injectable({
  providedIn: 'root'
})
export class ScreenshotService {

  constructor() { }

  dataUrl = dataUrl;

  async getScreenshot(){

    return new Promise<string>((resolve, reject) => {
      if(chrome && chrome.runtime){
        chrome.runtime.sendMessage({todo: "getImage"}, response => {
          if(response.imgSrc) {
            resolve(response.imgSrc);
          } else {
            reject();
          }
        });
      } else {
        // for testing purpose
        resolve(this.dataUrl)
      }
    })
  }

  setDelay(timeout: number){
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, timeout);
    })
  }

  async screenshotLink(id: string, dataUrl: string, filename: string) {
    let dlLink: any = document.getElementById(id);
    let MIME_TYPE = "image/png";
    dlLink.download = filename;
    dlLink.href = dataUrl;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
    dlLink.click();
  }
}
