if (chrome !== undefined) {
    browser = chrome; // Chromium (Chrome / EDGE)
} else {
    // maybe firefox
}

const iconUpdator = (url) => {
    browser.storage.sync.get(null, (opt) => {
        if (opt === null || opt === undefined || opt.urls === null || opt.urls === undefined) {
            return;
        }
        if (opt.urls.includes(url)) {
            browser.action.setIcon({ path: "icons-16-g.png" });
            return;
        }
        browser.action.setIcon({ path: "icons-16.png" });
    });
};

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    iconUpdator(changeInfo.url);
});
browser.tabs.onActivated.addListener((activeInfo) => {
    browser.tabs.get(activeInfo.tabId, (tab) => {
        iconUpdator(tab.url);
    })
});
