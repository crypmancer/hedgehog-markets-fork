"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="h-9 w-9">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  // Use resolvedTheme to get the actual theme being used (handles "system" theme)
  const currentTheme = resolvedTheme || theme
  const isLight = currentTheme === "light"

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-9 w-9"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      aria-label="Toggle theme"
    >
      {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Button>
  )
}

