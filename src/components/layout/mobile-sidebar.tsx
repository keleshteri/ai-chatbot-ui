"use client"

import { useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, MessageCircle, FileText, FolderOpen, Settings, Bell, LogOut, type LucideIcon } from "lucide-react"

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

/**
 * Mobile sidebar component that slides in from the left
 * Contains the same navigation as the desktop sidebar
 */
export function MobileSidebar({ isOpen, onClose, className }: MobileSidebarProps) {
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full w-80 bg-background border-r z-50 lg:hidden transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        className
      )}>
        <div className="flex flex-col h-full p-6">
          {/* Header with close button */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">M</span>
              </div>
              <span className="font-semibold">AI Chat Helper</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            <SidebarItem icon={FileText} label="Templates" badge="PRO" />
            <SidebarItem icon={FolderOpen} label="My Projects" badge="PRO" />
            <SidebarItem icon={MessageCircle} label="My Chats" active />
            <SidebarItem icon={Settings} label="Settings" />
            <SidebarItem icon={Bell} label="Updates & FAQ" />
          </nav>

          {/* Pro Plan Section */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white mb-4">
            <h3 className="font-semibold mb-2">Pro Plan</h3>
            <p className="text-sm opacity-90 mb-3">
              Unlock advanced features and unlimited access.
            </p>
            <div className="text-xs opacity-75 mb-3">
              $10 / mo
            </div>
            <Button size="sm" className="w-full bg-white text-purple-600 hover:bg-gray-100">
              Get
            </Button>
          </div>

          {/* Footer */}
          <Button variant="ghost" className="justify-start p-2 h-auto" onClick={onClose}>
            <LogOut className="h-4 w-4 mr-3" />
            Log out
          </Button>
        </div>
      </div>
    </>
  )
}

/**
 * Individual sidebar navigation item
 */
function SidebarItem({ 
  icon: Icon, 
  label, 
  badge, 
  active = false 
}: {
  icon: LucideIcon
  label: string
  badge?: string
  active?: boolean
}) {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start p-3 h-auto",
        active && "bg-muted"
      )}
    >
      <Icon className="h-4 w-4 mr-3" />
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <Badge variant="secondary" className="ml-2 text-xs">
          {badge}
        </Badge>
      )}
    </Button>
  )
}