"use client"

import * as React from "react"
import { ThumbsUp, ThumbsDown, Copy, User, Bot } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
  timestamp?: string
  showFeedback?: boolean
}

/**
 * Individual chat message component
 * Displays messages from user or AI with appropriate styling and actions
 */
export function ChatMessage({ 
  role, 
  content, 
  timestamp, 
  showFeedback = true 
}: ChatMessageProps) {
  const [copied, setCopied] = React.useState(false)
  const [feedback, setFeedback] = React.useState<'up' | 'down' | null>(null)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy message:', err)
    }
  }

  const handleFeedback = (type: 'up' | 'down') => {
    setFeedback(feedback === type ? null : type)
  }

  return (
    <div className={`flex gap-4 p-4 ${
      role === 'assistant' ? 'bg-muted/30' : ''
    }`}>
      {/* Avatar */}
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className={`${
          role === 'assistant' 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-secondary text-secondary-foreground'
        }`}>
          {role === 'assistant' ? (
            <Bot className="h-4 w-4" />
          ) : (
            <User className="h-4 w-4" />
          )}
        </AvatarFallback>
      </Avatar>

      {/* Message Content */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant={role === 'assistant' ? 'default' : 'secondary'} className="text-xs">
            {role === 'assistant' ? 'AI Assistant' : 'You'}
          </Badge>
          {timestamp && (
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          )}
        </div>
        
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        </div>

        {/* Actions */}
        {role === 'assistant' && showFeedback && (
          <div className="flex items-center gap-1 pt-2">
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 w-8 p-0 ${
                feedback === 'up' ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' : ''
              }`}
              onClick={() => handleFeedback('up')}
            >
              <ThumbsUp className="h-3 w-3" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 w-8 p-0 ${
                feedback === 'down' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' : ''
              }`}
              onClick={() => handleFeedback('down')}
            >
              <ThumbsDown className="h-3 w-3" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleCopy}
            >
              <Copy className="h-3 w-3" />
            </Button>
            
            {copied && (
              <span className="text-xs text-muted-foreground ml-2">Copied!</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Container for multiple chat messages
 */
export function ChatMessages({ children }: { children: React.ReactNode }) {
  return (
    <div className="divide-y divide-border">
      {children}
    </div>
  )
}