const FUMZAI_VERSION = "0.1.1";
console.log(`[FumzAI v${FUMZAI_VERSION}] Core script injected into MAIN world!`);
window.FumzAI = window.FumzAI || {
    version: FUMZAI_VERSION,
    providers: [],
    log: function(...args) {
        console.log(`[FumzAI v${FUMZAI_VERSION}]`, ...args);
    },
    isCurfewActive: function() {
        const now = new Date();
        const hours = now.getHours();
        // Check local time (23:00-05:00) OR localStorage override for testing
        return (hours >= 23 || hours < 5) || (window.localStorage && window.localStorage.getItem('fumzai_force_curfew') === 'true');
    }
};
