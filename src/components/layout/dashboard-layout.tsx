"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { HistorySidebar } from "./history-sidebar"
import { MobileSidebar } from "./mobile-sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
  className?: string
  title?: string
}

/**
 * Main dashboard layout component
 * Provides the three-column layout with sidebar, main content, and history
 */
export function DashboardLayout({ children, className, title }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false)
  }

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <div className={cn("flex h-screen p-4 gap-4 bg-muted/20", className)}>
      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={handleMobileMenuClose} 
      />
      
      {/* Main Sidebar */}
      <div className="hidden lg:block">
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          onToggle={handleSidebarToggle}
        />
      </div>
      
      {/* Main Content Area */}
      <main className="flex-1 bg-background rounded-xl flex flex-col p-6 border min-w-0">
        <Header 
          title={title} 
          onMobileMenuToggle={handleMobileMenuToggle}
        />
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </main>
      
      {/* History Sidebar */}
      <div className="hidden xl:block">
        <HistorySidebar />
      </div>
    </div>
  )
}