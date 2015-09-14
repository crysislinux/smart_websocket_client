chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.create({'url': "dist/index.html"});
});
