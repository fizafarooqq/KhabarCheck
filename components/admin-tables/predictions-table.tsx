import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PredictionsTable() {
  const predictions = [
    { id: 1, bias: "Left", confidence: "0.89", article: "Article 1", time: "1 hour ago" },
    { id: 2, bias: "Center", confidence: "0.76", article: "Article 2", time: "2 hours ago" },
    { id: 3, bias: "Right", confidence: "0.81", article: "Article 3", time: "3 hours ago" },
  ]

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Predictions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium">Bias</th>
                <th className="text-left py-3 px-4 font-medium">Confidence</th>
                <th className="text-left py-3 px-4 font-medium">Article</th>
                <th className="text-left py-3 px-4 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((pred) => (
                <tr key={pred.id} className="border-b border-border hover:bg-muted/30">
                  <td className="py-3 px-4 font-medium">{pred.bias}</td>
                  <td className="py-3 px-4">{pred.confidence}</td>
                  <td className="py-3 px-4">{pred.article}</td>
                  <td className="py-3 px-4 text-muted-foreground">{pred.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
