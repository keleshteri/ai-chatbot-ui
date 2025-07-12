"use client"

import * as React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { ChatHistorySidebar } from "./chat-history-sidebar"
import { ChatInterface } from "../chat/chat-interface"

interface MainLayoutProps {
  children?: React.ReactNode
  showChatHistory?: boolean
}

/**
 * Main application layout component
 * Implements the three-column layout: navigation sidebar, main content, and optional chat history
 */
export function MainLayout({ children, showChatHistory = true }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Left Sidebar - Navigation */}
        <AppSidebar />
        
        {/* Main Content Area */}
        <SidebarInset className="flex-1 flex flex-col min-w-0">
          {children || <ChatInterface className="h-full" />}
        </SidebarInset>
        
        {/* Right Sidebar - Chat History (conditional) */}
        {showChatHistory && <ChatHistorySidebar />}
      </div>
    </SidebarProvider>
  )
}