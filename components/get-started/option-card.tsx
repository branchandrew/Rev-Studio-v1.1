"use client"

import type { OptionCardContent } from "@/lib/content/get-started-content"

interface OptionCardProps {
  option: OptionCardContent
  isSelected: boolean
  onClick: () => void
}

export function OptionCard({ option, isSelected, onClick }: OptionCardProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-start pt-10 pb-8 px-4 rounded-md border cursor-pointer hover:bg-gray-50 transition-colors ${
        isSelected ? "border-primary bg-primary/5" : "border-gray-200"
      }`}
      onClick={onClick}
    >
      <div className="w-[50px] h-[50px] flex items-center justify-center mb-6">{option.icon}</div>
      <h3 className="text-lg font-semibold text-center mb-2">{option.title}</h3>
      <p className="text-sm text-gray-600 text-center">{option.description}</p>
    </div>
  )
}
