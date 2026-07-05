// content.js - Runs in ISOLATED world
// Reads chrome.storage and injects it into the MAIN world BEFORE core.js runs.

const injectSettings = (settings) => {
    const script = document.createElement('script');
    script.textContent = `window.__FUMZAI_SETTINGS__ = ${JSON.stringify(settings)};`;
    (document.head || document.documentElement).appendChild(script);
    script.remove();
};

chrome.storage.local.get({
    enabled: true,
    start: '23:00',
    end: '05:00',
    personality: 'strict'
}, (settings) => {
    injectSettings(settings);
});

// Listen for live updates from the popup/options and bridge them to the MAIN world
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local') {
        const newSettings = {};
        for (let [key, { newValue }] of Object.entries(changes)) {
            newSettings[key] = newValue;
        }
        window.dispatchEvent(new CustomEvent('FumzAI_Settings_Updated', { detail: newSettings }));
    }
});
