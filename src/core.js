var FUMZAI_VERSION = "0.1.7";
console.warn(`[FumzAI v${FUMZAI_VERSION}] Core script injected into MAIN world!`);
window.FumzAI = window.FumzAI || {
    version: FUMZAI_VERSION,
    providers: [],
    log: function(...args) {
        console.warn(`[FumzAI v${FUMZAI_VERSION}]`, ...args);
    },
    isCurfewActive: function() {
        const now = new Date();
        const hours = now.getHours();
        
        let lsFlag = null;
        try {
            lsFlag = window.localStorage ? window.localStorage.getItem('fumzai_force_curfew') : null;
        } catch(e) {}
        
        const isUrlTest = window.location.search.includes('fumzai_test=1');
        
        const active = (hours >= 23 || hours < 5) || (lsFlag === 'true') || isUrlTest;
        window.FumzAI.log(`Checking curfew: hours=${hours}, lsFlag=${lsFlag}, urlTest=${isUrlTest} -> ACTIVE=${active}`);
        
        return active;
    }
};
