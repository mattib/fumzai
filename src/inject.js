const originalFetch = window.fetch;
window.fetch = async function(...args) {
    let urlString = "";
    try {
        if (args[0] instanceof Request) {
            urlString = args[0].url;
        } else if (args[0] instanceof URL) {
            urlString = args[0].href;
        } else {
            urlString = String(args[0]);
        }
    } catch (e) {}

    const provider = window.FumzAI.providers.find(p => p.shouldIntercept(urlString));

    if (provider) {
        try {
            let bodyText = null;
            let isRequestObj = false;

            if (args[0] instanceof Request) {
                isRequestObj = true;
                bodyText = await args[0].clone().text();
            } else if (args[1] && typeof args[1].body === 'string') {
                bodyText = args[1].body;
            }

            if (bodyText) {
                const modifiedText = provider.processPayload(bodyText);
                
                if (modifiedText !== bodyText) {
                    if (isRequestObj) {
                        args[0] = new Request(args[0], { body: modifiedText });
                    } else {
                        args[1].body = modifiedText;
                    }
                }
            }
        } catch(e) {
            console.error("[FumzAI] Error during fetch interception", e);
        }
    }
    
    return Reflect.apply(originalFetch, window, args);
};

const originalXHROpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method, url) {
    this._url = url;
    return Reflect.apply(originalXHROpen, this, arguments);
};

const originalXHRSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function(body) {
    try {
        if (typeof body === 'string' && this._url) {
            let urlString = String(this._url);
            const provider = window.FumzAI.providers.find(p => p.shouldIntercept(urlString));
            
            if (provider) {
                const modifiedText = provider.processPayload(body);
                if (modifiedText !== body) {
                    body = modifiedText;
                }
            }
        }
    } catch(e) {
        console.error("[FumzAI] Error during XHR interception", e);
    }
    return Reflect.apply(originalXHRSend, this, [body]);
};
