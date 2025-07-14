import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send } from "lucide-react"

/**
 * Main dashboard home page
 * Shows the AI Chat Helper interface with blank content area
 */
export default function HomePage() {
  return (
    <DashboardLayout title="AI Chat Helper">
      <div className="flex flex-col h-full">
        {/* Main content area - matches the blank chat interface from screenshots */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">AI Chat Helper</h2>
              <p className="text-muted-foreground text-sm">
                How can I help you today?
              </p>
            </div>
          </div>
        </div>
        
        {/* Chat input area - placeholder for future chat functionality */}
        <div className="border-t pt-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Input 
                placeholder="Type your message here..."
                className="pr-12"
                disabled
              />
              <Button 
                size="icon" 
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                disabled
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Chat functionality will be implemented in future updates
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}