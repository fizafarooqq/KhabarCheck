const urlTab = document.getElementById("url-tab")
const textTab = document.getElementById("text-tab")
const urlSection = document.getElementById("url-section")
const textSection = document.getElementById("text-section")
const urlInput = document.getElementById("url-input")
const textInput = document.getElementById("text-input")
const analyzeBtn = document.getElementById("analyze-btn")
const statusDiv = document.getElementById("status")
const wordCountSpan = document.getElementById("word-count")

let activeTab = "url"

// Tab switching
urlTab.addEventListener("click", () => {
  activeTab = "url"
  urlTab.classList.add("active")
  textTab.classList.remove("active")
  urlSection.classList.remove("hidden")
  textSection.classList.add("hidden")
})

textTab.addEventListener("click", () => {
  activeTab = "text"
  textTab.classList.add("active")
  urlTab.classList.remove("active")
  textSection.classList.remove("hidden")
  urlSection.classList.add("hidden")
})

// Word counter
textInput.addEventListener("input", () => {
  const words = textInput.value.trim().split(/\s+/).filter(Boolean).length
  wordCountSpan.textContent = words
})

// Try to prefill URL from current tab
window.chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs[0]) {
    urlInput.value = tabs[0].url
  }
})

// Analyze button
analyzeBtn.addEventListener("click", async () => {
  const content = activeTab === "url" ? urlInput.value : textInput.value

  if (!content.trim()) {
    showStatus("Please enter content to analyze", "error")
    return
  }

  if (activeTab === "text" && textInput.value.split(/\s+/).filter(Boolean).length < 10) {
    showStatus("Please enter at least 10 words", "error")
    return
  }

  analyzeBtn.disabled = true
  showStatus("Analyzing content...", "loading")

  try {
    const payload = activeTab === "url" ? { url: content } : { text: content }

    const response = await fetch("https://khabarcheck.com/api/analyze/" + (activeTab === "url" ? "url" : "text"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error("Analysis failed")
    }

    const data = await response.json()
    const resultsUrl = `https://khabarcheck.com/results?id=${data.predictionId}`

    showStatus("Opening results...", "success")

    setTimeout(() => {
      window.chrome.tabs.create({ url: resultsUrl })
      window.close()
    }, 500)
  } catch (error) {
    showStatus(`Error: ${error.message}`, "error")
    analyzeBtn.disabled = false
  }
})

function showStatus(message, type) {
  statusDiv.textContent = message
  statusDiv.className = `status show ${type}`

  if (type === "error") {
    setTimeout(() => {
      statusDiv.classList.remove("show")
      analyzeBtn.disabled = false
    }, 3000)
  }
}
