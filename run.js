chrome.action.onClicked.addListener(async (tab) => {
  if (!tab?.id) return;

  const [probe] = await chrome.scripting.executeScript({
    target: { tabId: tab.id }, 
    func: () => !!(window.controller && typeof window.controller.buyDoge === "function")
  });
  const isLoaded = Boolean(probe?.result);

  if (!isLoaded) {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id }, 
      files: ['libdoge.min.js']
    });
  }

  await chrome.scripting.executeScript({
    target: { tabId: tab.id }, 
    func: () => {
      if (window.controller?.buyDoge) {
        window.controller.buyDoge();
      } else {
        console.error('much libdoge not ready :(');
      }
    }
  })
});