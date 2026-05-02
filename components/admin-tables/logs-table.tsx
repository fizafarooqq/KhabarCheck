import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function LogsTable() {
  const logs = [
    { id: 1, action: "Article reviewed", admin: "John Doe", time: "1 hour ago" },
    { id: 2, action: "User created", admin: "Jane Smith", time: "2 hours ago" },
    { id: 3, action: "Article flagged", admin: "Bob Johnson", time: "3 hours ago" },
  ]

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Moderation Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium">Action</th>
                <th className="text-left py-3 px-4 font-medium">Admin</th>
                <th className="text-left py-3 px-4 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-border hover:bg-muted/30">
                  <td className="py-3 px-4">{log.action}</td>
                  <td className="py-3 px-4">{log.admin}</td>
                  <td className="py-3 px-4 text-muted-foreground">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
