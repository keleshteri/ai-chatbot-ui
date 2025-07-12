"use client"

import * as React from "react"
import { Copy, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

// Sample code for demonstration
const sampleCode = {
  html: `let cancelButton = document.getElementById("cancel-button");
let sendButton = document.getElementById("send-button");

cancelButton.addEventListener("click", function() {
  console.log("Cancel button clicked");
});

sendButton.addEventListener("click", function() {
  console.log("Send button clicked");
});`,
  css: `.button {
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button-primary {
  background: #007bff;
  color: white;
}

.button-primary:hover {
  background: #0056b3;
}`,
  js: `function handleButtonClick(event) {
  const buttonType = event.target.dataset.type;
  
  if (buttonType === 'cancel') {
    console.log('Cancel action triggered');
    // Handle cancel logic
  } else if (buttonType === 'send') {
    console.log('Send action triggered');
    // Handle send logic
  }
}

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.action-button');
  buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
  });
});`
}

interface CodeDisplayProps {
  className?: string
}

/**
 * Code display component with tabbed interface for HTML, CSS, and JS
 * Features syntax highlighting simulation and copy functionality
 */
export function CodeDisplay({ className }: CodeDisplayProps) {
  const [copiedTab, setCopiedTab] = React.useState<string | null>(null)

  const handleCopy = async (code: string, tab: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedTab(tab)
      setTimeout(() => setCopiedTab(null), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const renderCodeWithLineNumbers = (code: string) => {
    const lines = code.split('\n')
    return (
      <div className="flex">
        <div className="flex flex-col text-muted-foreground text-sm font-mono pr-4 border-r border-border mr-4 select-none">
          {lines.map((_, index) => (
            <span key={index} className="leading-6">
              {index + 1}
            </span>
          ))}
        </div>
        <div className="flex-1">
          <pre className="text-sm font-mono leading-6 overflow-x-auto">
            <code className="text-foreground">{code}</code>
          </pre>
        </div>
      </div>
    )
  }

  return (
    <Card className={className}>
      <CardContent className="p-0">
        <Tabs defaultValue="html" className="w-full">
          <div className="flex items-center justify-between border-b border-border px-4 py-2">
            <TabsList className="grid w-fit grid-cols-3">
              <TabsTrigger value="html" className="text-xs">HTML</TabsTrigger>
              <TabsTrigger value="css" className="text-xs">CSS</TabsTrigger>
              <TabsTrigger value="js" className="text-xs">JS</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs"
                onClick={() => {
                  const activeTab = document.querySelector('[data-state="active"]')?.getAttribute('value') || 'html'
                  handleCopy(sampleCode[activeTab as keyof typeof sampleCode], activeTab)
                }}
              >
                {copiedTab ? (
                  <>
                    <Check className="mr-1 h-3 w-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-1 h-3 w-3" />
                    Copy code
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="bg-muted/30">
            <TabsContent value="html" className="m-0 p-4">
              {renderCodeWithLineNumbers(sampleCode.html)}
            </TabsContent>
            <TabsContent value="css" className="m-0 p-4">
              {renderCodeWithLineNumbers(sampleCode.css)}
            </TabsContent>
            <TabsContent value="js" className="m-0 p-4">
              {renderCodeWithLineNumbers(sampleCode.js)}
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}