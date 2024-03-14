// start the index.html page in the browser window new tab
chrome.browserAction.onClicked.addListener(function(activeTab){
    chrome.tabs.create({'url': `https://google.com`}, function(tab) {});
//     var newURL = "http://stackoverflow.com/";
//     chrome.tabs.create({ url: newURL });
});
console.log("test")




// // Allows users to open the side panel by clicking on the action toolbar icon
// chrome.sidePanel
//     .setPanelBehavior({ openPanelOnActionClick: true })
//     .catch((error) => console.error(error));

// chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
//     if (!tab.url) return;
//     const url = new URL(tab.url);
//     // Enables the side panel on any origin
//     await chrome.sidePanel.setOptions({
//         tabId,
//         path: "index.html",
//         enabled: true,
//     });
// });
// chrome.aipro.getBrowserList(function(browser_list) {
//   console.log(browser_list);
//   // chrome.aipro.runImport(browser_list[0].index, function() {
//     // console.log('import completed');
//   // })
// })

// lmebalfgkdobcdbflldjjlcmkdfldgnd

// menigodadcabgkhhocaggkghnhdbpahl

// chrome-extension://lmebalfgkdobcdbflldjjlcmkdfldgnd/index.html