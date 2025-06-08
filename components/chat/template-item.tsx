"use client"

interface TemplateItemProps {
  title: string
  description: string
  category: string
  onClick: () => void
}

export function TemplateItem({ title, description, category, onClick }: TemplateItemProps) {
  return (
    <div
      className="flex flex-col gap-1 p-3 hover:bg-gray-50 cursor-pointer border-b border-[#BEC8DA] last:border-0"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-sm">{title}</h4>
        <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">{category}</span>
      </div>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  )
}
