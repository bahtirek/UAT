if (typeof browser === "undefined") {
  var browser = chrome;
}
browser.action.onClicked.addListener(openNewWindow);

let lastWindowId;

//save last focused window to get the screenshots
browser.windows.getLastFocused(
  null, (window)=>{
    console.log('last focused window', window);
    lastWindowId = window.id
  }
)

browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.todo == 'getImage') {
      browser.tabs.captureVisibleTab(lastWindowId, {format: 'png'}, (dataUrl) => {
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
