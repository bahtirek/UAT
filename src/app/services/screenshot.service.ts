///<reference types="chrome"/>
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenshotService {

  constructor() { }

  async getScreenshot(){
    return chrome.runtime.sendMessage({todo: "getImage"})
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
