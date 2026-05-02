/* global chrome */

// Declare chrome variable
const chrome = window.chrome

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { action: "toggleAnalysis" })
})

// Context menu for analyzing selected text
chrome.contextMenus.create({
  id: "analyze-selection",
  title: "Analyze with KhabarCheck",
  contexts: ["selection"],
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "analyze-selection") {
    const selectedText = info.selectionText
    chrome.tabs.create({
      url: `https://khabarcheck.com/analyze?text=${encodeURIComponent(selectedText)}&tab=text`,
    })
  }
})
