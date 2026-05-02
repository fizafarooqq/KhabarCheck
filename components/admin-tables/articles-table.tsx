import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ArticlesTable() {
  const articles = [
    { id: 1, url: "example.com/article-1", source: "News Site A", submitted: "2 hours ago" },
    { id: 2, url: "example.com/article-2", source: "News Site B", submitted: "4 hours ago" },
    { id: 3, url: "example.com/article-3", source: "News Site C", submitted: "6 hours ago" },
  ]

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Articles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium">URL</th>
                <th className="text-left py-3 px-4 font-medium">Source</th>
                <th className="text-left py-3 px-4 font-medium">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-b border-border hover:bg-muted/30">
                  <td className="py-3 px-4">{article.url}</td>
                  <td className="py-3 px-4">{article.source}</td>
                  <td className="py-3 px-4 text-muted-foreground">{article.submitted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
