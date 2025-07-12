"use client"

import * as React from "react"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// Mock chat history data
const chatHistory = [
  {
    id: "1",
    title: "Create welcome form",
    category: "Instructions",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    title: "How to set up a Wi-Fi wireless network?",
    category: "Instructions",
    timestamp: "1 day ago",
  },
  {
    id: "3",
    title: "How to organise your working day effectively?",
    category: "Career",
    timestamp: "2 days ago",
  },
  {
    id: "4",
    title: "Tips to improve productivity at work",
    category: "Career",
    timestamp: "3 days ago",
  },
  {
    id: "5",
    title: "How does artificial intelligence work?",
    category: "Onboarding",
    timestamp: "1 week ago",
  },
  {
    id: "6",
    title: "What can you do?",
    category: "Onboarding",
    timestamp: "1 week ago",
  },
]

interface ChatHistoryItemProps {
  title: string
  category: string
  timestamp: string
  isActive?: boolean
}

/**
 * Individual chat history item component
 */
function ChatHistoryItem({ title, category, timestamp, isActive }: ChatHistoryItemProps) {
  return (
    <div className={`p-3 rounded-lg cursor-pointer transition-colors ${
      isActive 
        ? "bg-accent text-accent-foreground" 
        : "hover:bg-accent/50"
    }`}>
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none truncate">{title}</p>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
      </div>
    </div>
  )
}

/**
 * Chat history sidebar component
 * Displays conversation history with categories and clear functionality
 */
export function ChatHistorySidebar() {
  const [historyCount] = React.useState(6)
  const maxHistory = 50

  return (
    <div className="w-80 border-l border-border bg-card flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-card-foreground">History</h2>
          <Badge variant="secondary" className="text-xs">
            {historyCount}/{maxHistory}
          </Badge>
        </div>
      </div>

      {/* History List */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {chatHistory.map((item, index) => (
            <ChatHistoryItem
              key={item.id}
              title={item.title}
              category={item.category}
              timestamp={item.timestamp}
              isActive={index === 0} // First item is active
            />
          ))}
        </div>
      </ScrollArea>

      <Separator />

      {/* Footer */}
      <div className="p-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full justify-start text-muted-foreground"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear history
        </Button>
      </div>
    </div>
  )
}