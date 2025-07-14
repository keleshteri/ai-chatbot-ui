import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ChatArea } from "@/components/chat"

/**
 * Chat page
 * Shows the full AI Chat Helper interface with conversation
 */
export default function ChatPage() {
  return (
    <DashboardLayout title="AI Chat Helper">
      <ChatArea className="bg-muted/30 rounded-xl" />
    </DashboardLayout>
  )
}