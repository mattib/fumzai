document.addEventListener('DOMContentLoaded', () => {
    const els = {
        enabled: document.getElementById('enabled'),
        start: document.getElementById('start'),
        end: document.getElementById('end'),
        personality: document.getElementById('personality')
    };

    // Load from storage
    chrome.storage.local.get({
        enabled: true,
        start: '23:00',
        end: '05:00',
        personality: 'strict'
    }, (items) => {
        els.enabled.checked = items.enabled;
        els.start.value = items.start;
        els.end.value = items.end;
        els.personality.value = items.personality;
    });

    // Save to storage
    const save = () => {
        chrome.storage.local.set({
            enabled: els.enabled.checked,
            start: els.start.value,
            end: els.end.value,
            personality: els.personality.value
        });
    };

    els.enabled.addEventListener('change', save);
    els.start.addEventListener('change', save);
    els.end.addEventListener('change', save);
    els.personality.addEventListener('change', save);
});
