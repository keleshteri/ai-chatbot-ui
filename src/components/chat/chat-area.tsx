"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Mic, Paperclip, RotateCcw, ThumbsUp, ThumbsDown, Copy } from "lucide-react"

interface ChatAreaProps {
  className?: string
}

/**
 * Main chat area component
 * Contains the conversation display and input area
 */
export function ChatArea({ className }: ChatAreaProps) {
  const [message, setMessage] = useState("")

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <ChatMessages />
      <ChatInput message={message} setMessage={setMessage} />
    </div>
  )
}

/**
 * Chat messages display area
 * Shows the conversation history and code examples
 */
function ChatMessages() {
  return (
    <ScrollArea className="flex-1 p-6">
      <div className="space-y-4">
        <CodeBlock />
        <InfoNote />
        <CodepenProject />
        <MessageActions />
      </div>
    </ScrollArea>
  )
}

/**
 * Code block component showing JavaScript example
 * Matches the design from the HTML examples with syntax highlighting
 */
function CodeBlock() {
  const renderSyntaxHighlightedLine = (lineNumber: number, content: string) => {
    // Simplified syntax highlighting without complex JSX fragments
    const highlightMap: Record<number, string> = {
      1: 'let cancelButton = document.getElementById("cancel-button");',
      2: 'let sendButton = document.getElementById("send-button");',
      4: 'cancelButton.addEventListener("click", function() {',
      5: '  console.log("Cancel button clicked");',
      8: 'sendButton.addEventListener("click", function() {',
      9: '  console.log("Send button clicked");'
    }
    
    const highlightedContent = highlightMap[lineNumber] || content
    return <span className="text-foreground">{highlightedContent}</span>
  }

  const codeContent = [
    'let cancelButton = document.getElementById("cancel-button");',
    'let sendButton = document.getElementById("send-button");',
    '',
    'cancelButton.addEventListener("click", function() {',
    '  console.log("Cancel button clicked");',
    '});',
    '',
    'sendButton.addEventListener("click", function() {',
    '  console.log("Send button clicked");',
    '});'
  ]

  return (
    <div className="bg-card border rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-1">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            HTML
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            CSS
          </Button>
          <Button variant="secondary" size="sm" className="border-b-2 border-orange-500">
            JS
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Copy className="h-4 w-4 mr-1" />
          Copy code
        </Button>
      </div>
      <div className="bg-muted p-4 rounded-md">
        <pre className="text-sm overflow-x-auto">
          <code className="language-js">
            <ol className="list-decimal list-inside text-muted-foreground">
              {codeContent.map((line, index) => (
                <li key={index} className="flex">
                  <span className="mr-4">{index + 1}.</span>
                  <span className="flex-1">
                    {renderSyntaxHighlightedLine(index + 1, line)}
                  </span>
                </li>
              ))}
            </ol>
          </code>
        </pre>
      </div>
    </div>
  )
}

/**
 * Information note component
 * Shows additional context about the code example
 */
function InfoNote() {
  return (
    <div className="text-xs text-muted-foreground bg-muted p-3 rounded-lg border">
      Note: This is just an example of a simple HTML form. In a real-world scenario, you would also want to
      include proper validation and handling of the form data on the server side.
    </div>
  )
}

/**
 * Codepen project component
 * Shows the project creation notification
 */
function CodepenProject() {
  return (
    <div className="flex justify-between items-center bg-card border p-3 rounded-lg">
      <p className="text-foreground">I have created a project in your Codepen account</p>
      <Button variant="outline" size="sm">
        View
      </Button>
    </div>
  )
}

/**
 * Message action buttons
 * Like, dislike, and copy actions for the message
 */
function MessageActions() {
  return (
    <div className="flex items-center space-x-2 text-muted-foreground">
      <Button variant="ghost" size="sm" className="hover:text-foreground">
        <ThumbsUp className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" className="hover:text-foreground">
        <ThumbsDown className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" className="hover:text-foreground">
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  )
}

/**
 * Chat input component
 * Contains the message input area and send functionality
 */
interface ChatInputProps {
  message: string
  setMessage: (message: string) => void
}

function ChatInput({ message, setMessage }: ChatInputProps) {
  const handleSend = () => {
    if (message.trim()) {
      // TODO: Implement send functionality
      console.log('Sending message:', message)
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t pt-4 px-6 pb-6">
      <div className="text-center mb-4">
        <Button variant="outline" size="sm">
          <RotateCcw className="h-4 w-4 mr-1" />
          Regenerate response
        </Button>
      </div>
      
      <div className="relative">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Start typing"
          className="min-h-[60px] pr-28 resize-none"
          rows={1}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <Mic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button 
            onClick={handleSend}
            size="icon" 
            className="h-8 w-8 bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <p className="text-xs text-center text-muted-foreground mt-2">
        Free Research Preview. Model may produce inaccurate information about people, places, or facts.{" "}
        <a href="#" className="text-primary underline">
          Check our terms
        </a>
      </p>
    </div>
  )
}