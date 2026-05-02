"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function AdminSidebar() {
  const router = useRouter()

  const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Articles", href: "/admin/dashboard?tab=articles" },
    { label: "Predictions", href: "/admin/dashboard?tab=predictions" },
    { label: "Users", href: "/admin/dashboard?tab=users" },
    { label: "Logs", href: "/admin/dashboard?tab=logs" },
    { label: "Announcements", href: "/admin/dashboard?tab=announcements" },
  ]

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border p-6 min-h-screen space-y-8">
      <div>
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="block px-4 py-2 rounded-lg text-sm hover:bg-sidebar-accent transition"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-sidebar-border pt-6">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 bg-transparent"
          onClick={() => router.push("/")}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
