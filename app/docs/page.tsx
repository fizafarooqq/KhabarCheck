import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DocsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Documentation</h1>
            <p className="text-lg text-muted-foreground">
              Learn how to use KhabarCheck and understand our bias detection system
            </p>
          </div>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle id="about">About KhabarCheck</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                KhabarCheck is an AI-powered tool that analyzes news articles to detect political bias. Our system uses
                transformer-based machine learning models trained to identify left-wing, center, and right-wing bias
                patterns in news text.
              </p>
              <p>
                The tool processes both full article URLs and direct text input, extracting the main content and
                analyzing it for bias indicators, framing, and language patterns commonly associated with political
                bias.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle id="how">How to Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Method 1: URL Analysis</h4>
                <p className="text-muted-foreground">
                  Paste a news article URL and KhabarCheck will automatically extract the article text and analyze it
                  for political bias. This method works best with major news websites.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Method 2: Text Input</h4>
                <p className="text-muted-foreground">
                  Paste or type any news article text directly. The system will analyze the text for bias indicators and
                  provide a confidence-weighted classification.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle id="limits">Limitations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-muted-foreground">
                <li>• Model accuracy depends on article quality and clarity of political framing</li>
                <li>• Extremely short articles (&lt;100 words) may produce less reliable results</li>
                <li>• Non-English articles are not currently supported</li>
                <li>• The model may struggle with opinion pieces that blur political lines</li>
                <li>• Context-dependent bias indicators may not always be captured</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle id="api">API Endpoints</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-mono font-semibold mb-2">POST /api/analyze/text</h4>
                <div className="bg-muted/50 p-4 rounded font-mono text-sm overflow-x-auto">
                  <pre>{`{
  "text": "Article text here...",
  "response": {
    "predictionId": "uuid",
    "bias_label": "center",
    "confidence": 0.85,
    "explanation": "...",
    "extractedText": "..."
  }
}`}</pre>
                </div>
              </div>
              <div>
                <h4 className="font-mono font-semibold mb-2">POST /api/analyze/url</h4>
                <div className="bg-muted/50 p-4 rounded font-mono text-sm overflow-x-auto">
                  <pre>{`{
  "url": "https://...",
  "response": {
    "predictionId": "uuid",
    "bias_label": "left",
    "confidence": 0.72
  }
}`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle id="ethics">Ethical AI Notice</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                KhabarCheck is designed to inform media literacy, not to censor or suppress viewpoints. Political bias
                exists across the spectrum, and our goal is to help readers identify it transparently.
              </p>
              <p>
                We believe that understanding bias is the first step toward consuming news responsibly. This tool should
                be used as one input among many when evaluating news sources.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </main>
  )
}
