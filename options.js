document.addEventListener('DOMContentLoaded', () => {
    const els = {
        start: document.getElementById('start'),
        end: document.getElementById('end'),
        personality: document.getElementById('personality'),
        save: document.getElementById('save'),
        status: document.getElementById('status')
    };

    chrome.storage.local.get({
        start: '23:00',
        end: '05:00',
        personality: 'strict'
    }, (items) => {
        els.start.value = items.start;
        els.end.value = items.end;
        els.personality.value = items.personality;
    });

    els.save.addEventListener('click', () => {
        chrome.storage.local.set({
            start: els.start.value,
            end: els.end.value,
            personality: els.personality.value
        }, () => {
            els.status.style.display = 'inline';
            setTimeout(() => { els.status.style.display = 'none'; }, 2000);
        });
    });
});
