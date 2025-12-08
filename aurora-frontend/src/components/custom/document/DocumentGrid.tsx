import { FileIcon, defaultStyles } from "react-file-icon"
import { Eye, MoreHorizontal, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { DocumentItem, DocumentViewMode } from "@/features/documents/data"
import { cn } from "@/lib/utils"

type DocumentGridProps = {
  documents: DocumentItem[]
  viewMode: DocumentViewMode
  onPreview: (document: DocumentItem) => void
}

const SUPPORTED_ICONS = Object.keys(defaultStyles)

export const DocumentGrid = ({
  documents,
  viewMode,
  onPreview,
}: DocumentGridProps) => {
  if (!documents.length) {
    return (
      <div className="border-muted/40 bg-card/50 text-muted-foreground flex h-60 flex-col items-center justify-center rounded-2xl border text-center">
        <p className="text-base font-medium">Chưa có tài liệu nào</p>
        <p className="text-sm">Hãy tải tài liệu đầu tiên của bạn lên hệ thống.</p>
      </div>
    )
  }

  if (viewMode === "list") {
    return <DocumentTable documents={documents} onPreview={onPreview} />
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {documents.map((document) => (
        <Card
          key={document.id}
          onClick={() => onPreview(document)}
          className="group cursor-pointer border-muted/60 bg-white/70 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
        >
          <CardHeader className="grid-cols-[1fr_auto] gap-4">
            <div className="flex items-center gap-3">
              <FileTypeIcon extension={document.extension} />
              <div>
                <CardTitle className="line-clamp-1 text-base">
                  {document.name}
                </CardTitle>
                <CardDescription>
                  Cập nhật {formatUpdatedAt(document.updatedAt)}
                </CardDescription>
              </div>
            </div>
            <CardAction className="hidden sm:flex">
              {document.starred && (
                <Badge variant="outline" className="gap-1 text-amber-600">
                  <Star className="size-3 fill-amber-500 text-amber-500" />
                  Được ghim
                </Badge>
              )}
              <DocumentActions document={document} />
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="text-muted-foreground flex items-center gap-4 text-sm">
              <span className="font-semibold text-foreground">{document.owner}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
              <span>{document.size}</span>
            </div>
            <Button
              variant="outline"
              className="gap-2 self-start"
              size="sm"
              onClick={(event) => {
                event.stopPropagation()
                onPreview(document)
              }}
            >
              <Eye className="size-4" />
              Xem nhanh
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

type DocumentTableProps = {
  documents: DocumentItem[]
  onPreview: (document: DocumentItem) => void
}

const DocumentTable = ({ documents, onPreview }: DocumentTableProps) => (
  <div className="rounded-2xl border bg-white/70 p-2 shadow-sm">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tên tài liệu</TableHead>
          <TableHead>Chủ sở hữu</TableHead>
          <TableHead>Kích thước</TableHead>
          <TableHead>Chỉnh sửa</TableHead>
          <TableHead className="text-right">Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((document) => (
          <TableRow
            key={document.id}
            className="cursor-pointer"
            onClick={() => onPreview(document)}
          >
            <TableCell>
              <div className="flex items-center gap-3">
                <FileTypeIcon extension={document.extension} />
                <div className="flex flex-col">
                  <span className="font-medium">{document.name}</span>
                  <span className="text-muted-foreground text-xs uppercase">
                    {document.extension}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell>{document.owner}</TableCell>
            <TableCell>{document.size}</TableCell>
            <TableCell>{formatUpdatedAt(document.updatedAt)}</TableCell>
            <TableCell className="text-right">
              <DocumentActions document={document} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
)

const DocumentActions = ({ document }: { document: DocumentItem }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-primary/10"
        onClick={(event) => event.stopPropagation()}
      >
        <MoreHorizontal className="size-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-48">
      <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
      <DropdownMenuItem>Xem trước</DropdownMenuItem>
      <DropdownMenuItem>Tải xuống</DropdownMenuItem>
      <DropdownMenuItem>Sao chép liên kết</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive">Xóa</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

const FileTypeIcon = ({ extension }: { extension: string }) => {
  const normalized = extension.toLowerCase()
  const styleKey = SUPPORTED_ICONS.includes(normalized) ? normalized : "doc"
  return (
    <div className="size-12 rounded-xl bg-muted/60 p-2">
      <FileIcon extension={normalized} {...defaultStyles[styleKey]} />
    </div>
  )
}

const formatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
})

const formatUpdatedAt = (value: string) => formatter.format(new Date(value))

