import type { ReactNode } from "react"

import { LayoutGrid, List, Search, SlidersHorizontal, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import type { DocumentViewMode } from "@/features/documents/data"
import { cn } from "@/lib/utils"

type DocumentToolbarProps = {
  searchTerm: string
  onSearchChange: (value: string) => void
  viewMode: DocumentViewMode
  onViewModeChange: (mode: DocumentViewMode) => void
  onUploadClick?: () => void
}

export const DocumentToolbar = ({
  searchTerm,
  onSearchChange,
  viewMode,
  onViewModeChange,
  onUploadClick,
}: DocumentToolbarProps) => {
  return (
    <div className="bg-card/80 border-card/80 backdrop-blur rounded-2xl border p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
            <Input
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Tìm kiếm tài liệu, chủ sở hữu hoặc loại file..."
              className="pl-10"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full gap-2 md:w-auto">
                <SlidersHorizontal className="size-4" />
                Bộ lọc
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Lọc nhanh</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Được gắn sao</DropdownMenuItem>
              <DropdownMenuItem>Chỉnh sửa gần đây</DropdownMenuItem>
              <DropdownMenuItem>Được chia sẻ với tôi</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Tệp PDF</DropdownMenuItem>
              <DropdownMenuItem>Bảng tính Excel</DropdownMenuItem>
              <DropdownMenuItem>Trình chiếu</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <Button className="gap-2" onClick={onUploadClick}>
            <Upload className="size-4" />
            Tải tài liệu
          </Button>

          <div className="flex rounded-lg border bg-white/70 p-1 shadow-inner">
            <ViewModeButton
              active={viewMode === "grid"}
              icon={<LayoutGrid className="size-4" />}
              label="Dạng lưới"
              onClick={() => onViewModeChange("grid")}
            />
            <ViewModeButton
              active={viewMode === "list"}
              icon={<List className="size-4" />}
              label="Dạng bảng"
              onClick={() => onViewModeChange("list")}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

type ViewModeButtonProps = {
  active: boolean
  icon: ReactNode
  label: string
  onClick: () => void
}

const ViewModeButton = ({ active, icon, label, onClick }: ViewModeButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-all",
      active && "bg-primary/10 text-primary shadow-sm"
    )}
  >
    {icon}
    <span className="hidden sm:inline">{label}</span>
  </button>
)

