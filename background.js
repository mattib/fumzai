chrome.runtime.onInstalled.addListener(() => {
    console.log("FumzAI installed.");
    // Set default curfew hours: 23:00 to 05:00
    chrome.storage.local.set({ curfewStart: "23:00", curfewEnd: "05:00", enabled: true });
});
