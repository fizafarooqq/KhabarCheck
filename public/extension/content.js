/* global chrome */

// Content script - runs on every page
console.log("[KhabarCheck] Content script loaded")

// Listen for messages from popup or background
window.chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleAnalysis") {
    // Highlight articles on the page
    highlightArticles()
  }
})

function highlightArticles() {
  const articles = document.querySelectorAll("article, .article, [role='article']")
  articles.forEach((article) => {
    article.style.outline = "2px dashed #2563eb"
    article.style.outlineOffset = "4px"
  })
}
