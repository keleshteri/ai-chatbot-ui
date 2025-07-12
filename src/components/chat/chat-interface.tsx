"use client"

import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatHeader } from "./chat-header"
import { ChatMessages, ChatMessage } from "./chat-message"
import { ChatInput } from "./chat-input"
import { CodeDisplay } from "./code-display"

// Sample conversation data
const sampleMessages = [
  {
    id: "1",
    role: "user" as const,
    content: "I need help creating a simple HTML form with cancel and send buttons. Can you help me with the code?",
    timestamp: "2 minutes ago"
  },
  {
    id: "2",
    role: "assistant" as const,
    content: "I'll help you create a simple HTML form with cancel and send buttons. Here's a complete example with HTML, CSS, and JavaScript:",
    timestamp: "2 minutes ago"
  }
]

interface ChatInterfaceProps {
  className?: string
}

/**
 * Main chat interface component
 * Combines header, messages, code display, and input areas
 */
export function ChatInterface({ className }: ChatInterfaceProps) {
  const [messages, setMessages] = React.useState(sampleMessages)
  const [isLoading, setIsLoading] = React.useState(false)
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages are added
  React.useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content,
      timestamp: "Just now"
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: "I understand you need help with that. Let me provide you with a solution...",
        timestamp: "Just now"
      }
      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleRegenerateResponse = () => {
    // Remove last AI message and regenerate
    setMessages(prev => {
      const filtered = prev.filter((msg, index) => {
        if (index === prev.length - 1 && msg.role === 'assistant') {
          return false
        }
        return true
      })
      return filtered
    })
    
    setIsLoading(true)
    setTimeout(() => {
      const newAiMessage = {
        id: Date.now().toString(),
        role: "assistant" as const,
        content: "Let me provide you with an alternative approach to solve this problem...",
        timestamp: "Just now"
      }
      setMessages(prev => [...prev, newAiMessage])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className={`flex flex-col h-full bg-background ${className}`}>
      {/* Header */}
      <ChatHeader />

      {/* Messages Area */}
      <ScrollArea ref={scrollAreaRef} className="flex-1">
        <div className="max-w-4xl mx-auto">
          <ChatMessages>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                content={message.content}
                timestamp={message.timestamp}
              />
            ))}
            
            {/* Show code display after AI response */}
            {messages.length >= 2 && (
              <div className="p-4">
                <CodeDisplay className="mb-4" />
                <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                  <p>
                    <strong>Note:</strong> This is just an example of a simple HTML form. In a real-world scenario, you 
                    would also want to include proper validation and handling of the form data on the server side.
                  </p>
                </div>
              </div>
            )}
            
            {isLoading && (
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  </div>
                  <div className="text-sm text-muted-foreground">AI is thinking...</div>
                </div>
              </div>
            )}
          </ChatMessages>
        </div>
      </ScrollArea>

      {/* Input Area */}
      <ChatInput 
        onSendMessage={handleSendMessage}
        onRegenerateResponse={handleRegenerateResponse}
        disabled={isLoading}
      />
    </div>
  )
}