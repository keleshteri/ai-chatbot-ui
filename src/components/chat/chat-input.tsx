"use client"

import * as React from "react"
import { Send, Mic, Paperclip, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ChatInputProps {
  onSendMessage?: (message: string) => void
  onRegenerateResponse?: () => void
  disabled?: boolean
  placeholder?: string
}

/**
 * Chat input component with message composition and action buttons
 * Features auto-resize textarea, voice input, attachments, and send functionality
 */
export function ChatInput({ 
  onSendMessage, 
  onRegenerateResponse,
  disabled = false,
  placeholder = "Start typing..."
}: ChatInputProps) {
  const [message, setMessage] = React.useState("")
  const [isListening, setIsListening] = React.useState(false)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  React.useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
    }
  }, [message])

  const handleSend = () => {
    if (message.trim() && onSendMessage) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    // Voice input implementation would go here
    // For now, just toggle the state
  }

  const handleAttachment = () => {
    // File attachment implementation would go here
    console.log('Attachment clicked')
  }

  return (
    <div className="border-t border-border bg-background p-4">
      {/* Regenerate Response Button */}
      <div className="flex justify-center mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRegenerateResponse}
          className="text-muted-foreground"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Regenerate response
        </Button>
      </div>

      {/* Input Area */}
      <Card className="p-3">
        <div className="flex items-end gap-3">
          {/* Textarea */}
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              className="min-h-[44px] max-h-[120px] resize-none border-0 p-0 shadow-none focus-visible:ring-0"
              rows={1}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            <TooltipProvider>
              {/* Voice Input */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-9 w-9 ${
                      isListening ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' : ''
                    }`}
                    onClick={handleVoiceInput}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isListening ? 'Stop recording' : 'Voice input'}</p>
                </TooltipContent>
              </Tooltip>

              {/* Attachment */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    onClick={handleAttachment}
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Attach file</p>
                </TooltipContent>
              </Tooltip>

              {/* Send Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    className="h-9 w-9 rounded-full"
                    onClick={handleSend}
                    disabled={disabled || !message.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send message</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </Card>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground text-center mt-3">
        Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts.
        <br />
        <a href="#" className="underline hover:no-underline">
          ChatGPT May 2024 Version
        </a>
      </p>
    </div>
  )
}