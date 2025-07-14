"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface HistorySidebarProps {
  className?: string
}

/**
 * History sidebar component showing chat history
 * Displays recent conversations and clear history option
 */
export function HistorySidebar({ className }: HistorySidebarProps) {
  return (
    <aside className={cn(
      "w-72 bg-background border rounded-xl flex flex-col p-4",
      className
    )}>
      <HistoryHeader />
      <HistoryList />
      <HistoryFooter />
    </aside>
  )
}

/**
 * History section header
 */
function HistoryHeader() {
  return (
    <header className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold">History</h2>
      <span className="text-sm text-muted-foreground">6/50</span>
    </header>
  )
}

/**
 * List of chat history items
 */
function HistoryList() {
  const historyItems = [
    {
      title: "Create welcome form",
      description: "Write code (HTML, CSS and JS) for a simple...",
      isActive: true
    },
    {
      title: "Instructions",
      description: "How to set up a Wi-Fi wireless network?"
    },
    {
      title: "Career",
      description: "How to organise your working day effectively?"
    },
    {
      title: "Career",
      description: "Tips to improve productivity at work"
    },
    {
      title: "Onboarding",
      description: "How does artificial intelligence work?"
    },
    {
      title: "Onboarding",
      description: "What can you do?"
    }
  ]

  return (
    <ScrollArea className="flex-grow">
      <div className="space-y-4">
        {historyItems.map((item, index) => (
          <HistoryItem key={index} {...item} />
        ))}
      </div>
    </ScrollArea>
  )
}

/**
 * Individual history item
 */
interface HistoryItemProps {
  title: string
  description: string
  isActive?: boolean
}

function HistoryItem({ title, description, isActive }: HistoryItemProps) {
  return (
    <div className="cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors">
      <h3 className="font-semibold text-sm mb-2">{title}</h3>
      <div className={cn(
        "relative pl-4",
        isActive && "border-l-2 border-orange-500"
      )}>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  )
}

/**
 * History section footer
 */
function HistoryFooter() {
  return (
    <Button 
      variant="outline" 
      className="w-full mt-4 text-muted-foreground border-muted hover:bg-muted/50"
    >
      Clear history
    </Button>
  )
}