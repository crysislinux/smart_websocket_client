chrome.browserAction.onClicked.addListener(function() {
  console.log('ok');
  chrome.tabs.create({'url': "index.html"});
});

