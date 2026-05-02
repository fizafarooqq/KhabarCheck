"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminSidebar } from "@/components/admin-sidebar"
import { ArticlesTable } from "@/components/admin-tables/articles-table"
import { PredictionsTable } from "@/components/admin-tables/predictions-table"
import { UsersTable } from "@/components/admin-tables/users-table"
import { LogsTable } from "@/components/admin-tables/logs-table"
import { AnnouncementsManager } from "@/components/admin-tables/announcements-manager"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = [
    { label: "Total Articles", value: "1,247", trend: "+12%" },
    { label: "Total Predictions", value: "3,891", trend: "+28%" },
    { label: "Active Users", value: "342", trend: "+5%" },
    { label: "Pending Review", value: "23", trend: "-8%" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-2">Manage articles, users, and system logs</p>
            </div>

            {activeTab === "overview" && (
              <div className="grid md:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <Card key={stat.label} className="border-border/50">
                    <CardContent className="pt-6">
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold mt-2">{stat.value}</p>
                      <p className="text-xs text-green-600 mt-2">{stat.trend}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="articles">Articles</TabsTrigger>
                <TabsTrigger value="predictions">Predictions</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="logs">Logs</TabsTrigger>
                <TabsTrigger value="announcements">Announcements</TabsTrigger>
              </TabsList>

              <TabsContent value="articles">
                <ArticlesTable />
              </TabsContent>

              <TabsContent value="predictions">
                <PredictionsTable />
              </TabsContent>

              <TabsContent value="users">
                <UsersTable />
              </TabsContent>

              <TabsContent value="logs">
                <LogsTable />
              </TabsContent>

              <TabsContent value="announcements">
                <AnnouncementsManager />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
