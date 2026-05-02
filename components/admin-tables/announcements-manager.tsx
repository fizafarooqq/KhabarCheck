"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Trash2 } from "lucide-react"

export function AnnouncementsManager() {
  const [announcements, setAnnouncements] = useState([
    { id: 1, message: "System maintenance scheduled for tonight", created: "2024-12-01" },
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleAdd = () => {
    if (newMessage.trim()) {
      setAnnouncements([
        ...announcements,
        { id: Date.now(), message: newMessage, created: new Date().toISOString().split("T")[0] },
      ])
      setNewMessage("")
    }
  }

  const handleDelete = (id: number) => {
    setAnnouncements(announcements.filter((a) => a.id !== id))
  }

  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Create Announcement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter announcement message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="bg-muted/50"
          />
          <Button onClick={handleAdd} className="w-full">
            Post Announcement
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Recent Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="flex items-start justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <p className="text-foreground">{announcement.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{announcement.created}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(announcement.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
