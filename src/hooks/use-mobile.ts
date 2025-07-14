import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Hook to detect mobile screen size with proper hydration handling
 * Prevents hydration mismatches by using mounted state
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // Return false during SSR to match initial server state
  return mounted ? isMobile : false
}
