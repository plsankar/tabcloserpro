export function openTab(url: string) {
    chrome.tabs.create({ url });
}
