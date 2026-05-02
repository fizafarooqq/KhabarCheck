# KhabarCheck Browser Extension

AI-powered news bias detector for your browser. Instantly analyze articles for political bias directly from your news feed.

## Features

- **One-Click Analysis**: Analyze articles with a single click from the extension popup
- **URL Analysis**: Paste article URLs to detect bias
- **Text Analysis**: Copy and paste article text for quick analysis
- **Real-time Results**: Get instant bias classification and confidence scores
- **Context Menu**: Right-click selected text to analyze it directly
- **Lightweight**: Minimal performance impact on your browsing

## Installation

### Chrome/Brave/Edge

1. Download the extension from the releases page
2. Open `chrome://extensions/` in your browser
3. Enable "Developer mode" (top right)
4. Click "Load unpacked"
5. Select the `extension` folder
6. Done! The KhabarCheck icon should appear in your toolbar

### Firefox

1. Download the extension
2. Open `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file
5. The extension is now active (temporary until browser restart)

## How to Use

### Method 1: Popup Analysis
1. Click the KhabarCheck icon in your toolbar
2. Choose "URL" or "Text" tab
3. Enter the article URL or paste text
4. Click "Analyze Article"
5. Results open in a new tab

### Method 2: Context Menu
1. Right-click any selected text on a webpage
2. Select "Analyze with KhabarCheck"
3. Results open in a new tab automatically

### Method 3: Current Page URL
1. Click the KhabarCheck icon
2. The URL tab pre-fills with the current page URL
3. Click "Analyze Article"

## Understanding Results

### Bias Labels
- **Left-wing**: Article shows left-leaning political bias
- **Center**: Balanced article with neutral stance
- **Right-wing**: Article shows right-leaning political bias

### Confidence Score
- **High (80%+)**: Model is very confident in its assessment
- **Medium (60-80%)**: Model has moderate confidence
- **Low (<60%)**: Model is uncertain; take with caution

### Explanation
Detailed reasoning for why the model classified the article as having a particular bias.

## Settings

The extension stores your preferences locally:
- Analysis history is saved locally in browser storage
- No data is sent to external servers (except the KhabarCheck analysis API)
- Clear cache anytime from extension options

## Privacy & Data

- **No tracking**: We don't track your browsing habits
- **No data collection**: Your article URLs and text are only used for analysis
- **Local storage**: Analysis history stored locally on your device
- **Secure**: Uses HTTPS for all API communications

## Troubleshooting

### Extension icon not appearing
- Refresh the page (Cmd/Ctrl + R)
- Check if extension is enabled in settings
- Try unpinning and re-pinning the extension

### Analysis fails
- Check your internet connection
- Ensure the website isn't blocking automated access
- Try analyzing with different text (minimum 10 words required)

### Results page doesn't load
- Clear browser cache
- Disable ad blockers temporarily
- Try a different article

## API Integration

To connect to your own ML backend:

1. Update the API endpoints in `popup.js`:
   \`\`\`javascript
   const API_BASE = "https://your-api.com"
   \`\`\`

2. Ensure your backend accepts POST requests with:
   \`\`\`json
   {
     "url": "https://article-url.com"
   }
   \`\`\`
   or
   \`\`\`json
   {
     "text": "article text content..."
   }
   \`\`\`

3. Backend should return:
   \`\`\`json
   {
     "predictionId": "unique-id",
     "bias_label": "left|center|right",
     "confidence": 0.85,
     "explanation": "..."
   }
   \`\`\`

## Support

For issues or suggestions:
- Visit: https://khabarcheck.com
- Email: support@khabarcheck.com
- GitHub: https://github.com/khabarcheck/extension

## License

MIT License - See LICENSE file for details
