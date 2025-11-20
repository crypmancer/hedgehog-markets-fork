"use client"

import { cn } from "@/lib/utils"

const categories = [
  { id: "all", label: "All Markets" },
  { id: "crypto", label: "Crypto" },
  { id: "politics", label: "Politics" },
  { id: "tech", label: "Tech" },
  { id: "sports", label: "Sports" },
  { id: "entertainment", label: "Entertainment" },
]

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap",
            selectedCategory === category.id
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}
