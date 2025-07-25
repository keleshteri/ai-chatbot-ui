import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ChatArea } from "@/components/chat"

/**
 * Main dashboard home page
 * Shows the AI Chat Helper interface with blank content area
 */
export default function HomePage() {
  return (
    <DashboardLayout title="AI Chat Helper">
      <ChatArea className="bg-muted/30 rounded-xl" />
    </DashboardLayout>
  )
}