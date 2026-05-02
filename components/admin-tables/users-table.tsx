import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function UsersTable() {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", joined: "2024-01-01" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", joined: "2024-02-15" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", joined: "2024-03-10" },
  ]

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium">Name</th>
                <th className="text-left py-3 px-4 font-medium">Email</th>
                <th className="text-left py-3 px-4 font-medium">Role</th>
                <th className="text-left py-3 px-4 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted/30">
                  <td className="py-3 px-4 font-medium">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.role}</td>
                  <td className="py-3 px-4 text-muted-foreground">{user.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
