// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
    if (!tab.url) return;
    const url = new URL(tab.url);
    // Enables the side panel on any origin
    await chrome.sidePanel.setOptions({
        tabId,
        path: "index.html",
        enabled: true,
    });
});
chrome.aipro.getBrowserList(function(browser_list) {
  console.log(browser_list);
  // chrome.aipro.runImport(browser_list[0].index, function() {
    // console.log('import completed');
  // })
})