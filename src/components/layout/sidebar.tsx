"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  MessageCircle, 
  LayoutDashboard, 
  Folder, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  LogOut,
  Menu
} from "lucide-react"

interface SidebarProps {
  className?: string
  isCollapsed?: boolean
  onToggle?: () => void
}

/**
 * Main sidebar navigation component
 * Contains logo, navigation links, pro plan section, and logout
 */
export function Sidebar({ className, isCollapsed = false, onToggle }: SidebarProps) {
  return (
    <aside className={cn(
      "bg-background border rounded-xl flex flex-col p-4 space-y-4 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      <SidebarHeader isCollapsed={isCollapsed} onToggle={onToggle} />
      <SidebarNavigation isCollapsed={isCollapsed} />
      {!isCollapsed && <ProPlanSection />}
      <SidebarFooter isCollapsed={isCollapsed} />
    </aside>
  )
}

/**
 * Sidebar header with logo and menu button
 * In collapsed state, the logo becomes the toggle button for cleaner UX
 */
interface SidebarHeaderProps {
  isCollapsed?: boolean
  onToggle?: () => void
}

function SidebarHeader({ isCollapsed, onToggle }: SidebarHeaderProps) {
  if (isCollapsed) {
    return (
      <div className="flex items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 p-0 hover:bg-primary/10"
          onClick={onToggle}
          title="Expand sidebar"
        >
          <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs">M</span>
          </div>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-sm">M</span>
      </div>
      <span className="text-xl font-bold flex-1">MindMerge</span>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 hover:bg-muted"
        onClick={onToggle}
        title="Collapse sidebar"
      >
        <Menu className="h-4 w-4" />
      </Button>
    </div>
  )
}

/**
 * Main navigation links
 */
interface SidebarNavigationProps {
  isCollapsed?: boolean
}

function SidebarNavigation({ isCollapsed }: SidebarNavigationProps) {
  const navigationItems = [
    {
      icon: MessageCircle,
      label: "AI Chat Helper",
      href: "/",
      active: true
    },
    {
      icon: LayoutDashboard,
      label: "Templates",
      href: "/templates",
      isPro: true
    },
    {
      icon: Folder,
      label: "My Projects",
      href: "/projects",
      isPro: true
    },
    {
      icon: BarChart3,
      label: "Statistics",
      href: "/statistics",
      isPro: true
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings"
    },
    {
      icon: HelpCircle,
      label: "Updates & FAQ",
      href: "/help"
    }
  ]

  return (
    <nav className="flex-grow space-y-2">
      {navigationItems.map((item) => (
        <SidebarNavItem key={item.label} {...item} isCollapsed={isCollapsed} />
      ))}
    </nav>
  )
}

/**
 * Individual navigation item
 */
interface SidebarNavItemProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
  active?: boolean
  isPro?: boolean
  isCollapsed?: boolean
}

function SidebarNavItem({ icon: Icon, label, href, active, isPro, isCollapsed }: SidebarNavItemProps) {
  if (isCollapsed) {
    return (
      <Button
        variant={active ? "default" : "ghost"}
        className={cn(
          "w-full justify-center px-2 py-2 h-10",
          active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        )}
        asChild
        title={label}
      >
        <a href={href}>
          <Icon className="h-4 w-4" />
        </a>
      </Button>
    )
  }

  return (
    <Button
      variant={active ? "default" : "ghost"}
      className={cn(
        "w-full justify-start px-4 py-2 h-auto",
        active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
      )}
      asChild
    >
      <a href={href}>
        <Icon className="mr-3 h-4 w-4" />
        <span>{label}</span>
        {isPro && (
          <Badge variant="secondary" className="ml-auto bg-yellow-400 text-yellow-900 text-xs font-bold">
            PRO
          </Badge>
        )}
      </a>
    </Button>
  )
}

/**
 * Pro plan upgrade section
 */
function ProPlanSection() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 rounded-xl text-center text-white">
      <h3 className="text-lg font-bold">Pro Plan</h3>
      <p className="text-sm mt-1 opacity-80">Strengthen artificial intelligence, get plan!</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-bold">$10 / mo</span>
        <Button size="sm" className="bg-white text-purple-700 hover:bg-gray-100">
          Get
        </Button>
      </div>
    </div>
  )
}

/**
 * Sidebar footer with logout
 */
interface SidebarFooterProps {
  isCollapsed?: boolean
}

function SidebarFooter({ isCollapsed }: SidebarFooterProps) {
  if (isCollapsed) {
    return (
      <Button 
        variant="ghost" 
        className="w-full justify-center px-2 py-2 h-10 text-muted-foreground hover:text-foreground"
        title="Log out"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button variant="ghost" className="w-full justify-start px-4 py-2 text-muted-foreground hover:text-foreground">
      <LogOut className="mr-3 h-4 w-4" />
      Log out
    </Button>
  )
}