if (typeof browser === "undefined" && typeof chrome !== "undefined") {
  var browser = chrome;
}
browser.action.onClicked.addListener(getCurrentWindow);

let lastWindowId;
let currentWindowId;

//save last focused window to get the screenshots
function getCurrentWindow() {
  browser.windows.getCurrent(
    null, (window)=>{
      currentWindowId = window.id;
      openNewWindow();
    }
  )
}

browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.todo == 'getImage') {
      browser.tabs.captureVisibleTab(currentWindowId, {format: 'jpeg'}, (dataUrl) => {
        sendResponse({imgSrc:dataUrl});
      }
    );

    return true;
  }
})

async function openNewWindow() {
  var newURL = "./index.html";
  const windowCreated = await browser.windows.create({ url: newURL });
}
