"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Copy, MoreHorizontal, Menu } from "lucide-react"

interface HeaderProps {
  title?: string
  className?: string
  onMobileMenuToggle?: () => void
}

/**
 * Main header component for the dashboard
 * Contains title, search bar, and action buttons
 */
export function Header({ title = "AI Chat Helper", className, onMobileMenuToggle }: HeaderProps) {
  return (
    <header className={cn("flex items-center mb-6", className)}>
      {/* Mobile menu button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="lg:hidden mr-2 h-9 w-9"
        onClick={onMobileMenuToggle}
      >
        <Menu className="h-4 w-4" />
        <span className="sr-only">Open menu</span>
      </Button>
      
      <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
      
      <div className="flex items-center ml-auto space-x-2 sm:space-x-4">
        <div className="hidden sm:block">
          <SearchBar />
        </div>
        <HeaderActions />
      </div>
    </header>
  )
}

/**
 * Search input component
 */
function SearchBar() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search"
        className="pl-10 w-32 sm:w-48 bg-muted border-0"
      />
    </div>
  )
}

/**
 * Header action buttons
 */
function HeaderActions() {
  return (
    <div className="flex items-center space-x-2">
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Plus className="h-4 w-4" />
        <span className="sr-only">Add new</span>
      </Button>
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Copy className="h-4 w-4" />
        <span className="sr-only">Copy</span>
      </Button>
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">More options</span>
      </Button>
    </div>
  )
}