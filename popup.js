document.addEventListener('DOMContentLoaded', () => {
    const enabledToggle = document.getElementById('enabled');
    const optionsLink = document.getElementById('open-options');
    const statusText = document.getElementById('status-text');

    chrome.storage.local.get({ enabled: true }, (items) => {
        enabledToggle.checked = items.enabled;
        statusText.textContent = items.enabled ? "Bouncer is ON" : "Bouncer is OFF (Sleeping)";
    });

    enabledToggle.addEventListener('change', () => {
        const isEnabled = enabledToggle.checked;
        chrome.storage.local.set({ enabled: isEnabled });
        statusText.textContent = isEnabled ? "Bouncer is ON" : "Bouncer is OFF (Sleeping)";
    });

    optionsLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html'));
        }
    });
});
