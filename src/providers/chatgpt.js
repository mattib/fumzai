window.FumzAI = window.FumzAI || {};
window.FumzAI.providers = window.FumzAI.providers || [];

window.FumzAI.providers.push({
    name: "ChatGPT",
    shouldIntercept: (url) => url.includes('conversation'),
    processPayload: (bodyText) => {
        const isCurfew = window.FumzAI.isCurfewActive();
        if (!isCurfew) return bodyText;
        try {
            const payload = JSON.parse(bodyText);
            const bouncerPrompt = window.FumzAI.getPrompt();
            
            if (payload.prompt !== undefined) {
                window.FumzAI.log("ChatGPT prompt type:", typeof payload.prompt);
                if (typeof payload.prompt === 'string') {
                    payload.prompt += bouncerPrompt;
                    window.FumzAI.log("✅ Injected into string prompt");
                } else if (Array.isArray(payload.prompt)) {
                    if (typeof payload.prompt[0] === 'string') {
                        payload.prompt[0] += bouncerPrompt;
                        window.FumzAI.log("✅ Injected into array prompt[0] (string)");
                    } else if (payload.prompt[0] && payload.prompt[0].content && payload.prompt[0].content.parts) {
                        payload.prompt[0].content.parts[0] += bouncerPrompt;
                        window.FumzAI.log("✅ Injected into array prompt[0].content.parts[0]");
                    } else {
                        window.FumzAI.log("❌ Unhandled prompt array structure:", JSON.stringify(payload.prompt));
                    }
                } else {
                    window.FumzAI.log("❌ Unhandled prompt object structure:", JSON.stringify(payload.prompt));
                }
            } else if (payload.messages) {
                const lastMsg = payload.messages[payload.messages.length - 1];
                if (lastMsg && lastMsg.content && lastMsg.content.parts) {
                    lastMsg.content.parts[0] += bouncerPrompt;
                    window.FumzAI.log("✅ Injected into messages array");
                }
            }
            return JSON.stringify(payload);
        } catch (e) {
            window.FumzAI.log("Failed to parse ChatGPT JSON", e);
            return bodyText;
        }
    }
});
