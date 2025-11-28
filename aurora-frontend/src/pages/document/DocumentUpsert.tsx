import DocViewer, { DocViewerRenderers } from "react-doc-viewer"
import { ArrowLeft, CheckCircle2, CloudUpload, FileText, PenSquare } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SheetDescription } from "@/components/ui/sheet"
import type { DocumentItem } from "@/features/documents/data"
import { mockDocuments } from "@/features/documents/data"
import { cn } from "@/lib/utils"
import { FileIcon, defaultStyles } from "react-file-icon"
import type { DefaultExtensionType } from "react-file-icon"

const ACCEPTED_EXTENSIONS = [
  "pdf",
  "doc",
  "docx",
  "md",
  "txt",
  "xlsx",
  "xls",
  "png",
  "jpg",
  "jpeg",
  "gif",
  "svg",
  "webp",
]

const ACCEPT_ATTRIBUTE = ACCEPTED_EXTENSIONS.map((ext) => `.${ext}`).join(",")

const previewableExtensions = new Set([
  "pdf",
  "doc",
  "docx",
  "ppt",
  "pptx",
  "xls",
  "xlsx",
  "csv",
  "txt",
  "md",
  "png",
  "jpg",
  "jpeg",
  "gif",
  "svg",
  "webp",
])

type MetadataState = {
  title: string
  category: string
  owner: string
  description: string
  tags: string
}

const DEFAULT_METADATA: MetadataState = {
  title: "",
  category: "operations",
  owner: "",
  description: "",
  tags: "",
}

export default function DocumentUpsertPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const docId = searchParams.get("docId")

  const existingDocument = useMemo<DocumentItem | null>(() => {
    if (!docId) return null
    return mockDocuments.find((document) => document.id === docId) ?? null
  }, [docId])

  const mode = existingDocument ? "edit" : "create"
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const objectUrlRef = useRef<string | null>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<MetadataState>(DEFAULT_METADATA)
  const [previewDocument, setPreviewDocument] = useState<{
    uri: string
    fileType?: string
  } | null>(null)

  useEffect(() => {
    if (!existingDocument) return
    setMetadata({
      title: existingDocument.name.replace(/\.[^/.]+$/, ""),
      category: "operations",
      owner: existingDocument.owner,
      description: "",
      tags: existingDocument.starred ? "quan-trong,ghi-chu" : "",
    })
    setPreviewDocument({
      uri: existingDocument.url,
      fileType: existingDocument.extension,
    })
  }, [existingDocument])

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current)
      }
    }
  }, [])

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return
    const file = files[0]
    const extension = file.name.split(".").pop()?.toLowerCase() ?? ""

    if (!ACCEPTED_EXTENSIONS.includes(extension)) {
      setValidationError(
        "Định dạng tệp không hợp lệ. Vui lòng chọn pdf, docx, md, txt, xlsx hoặc hình ảnh."
      )
      return
    }

    setValidationError(null)
    setUploadedFile(file)
    setMetadata((prev) => ({
      ...prev,
      title: prev.title || file.name.replace(/\.[^/.]+$/, ""),
    }))

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
    }
    const objectUrl = URL.createObjectURL(file)
    objectUrlRef.current = objectUrl
    setPreviewDocument({
      uri: objectUrl,
      fileType: extension,
    })
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsDragging(false)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    handleFiles(event.dataTransfer.files)
  }

  const canPreview =
    !!previewDocument?.fileType &&
    previewableExtensions.has(previewDocument.fileType.toLowerCase())

  const handleMetadataChange = (
    field: keyof MetadataState,
    value: string
  ) => {
    setMetadata((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Placeholder for integration with API
    console.table({
      mode,
      docId,
      metadata,
      fileName: uploadedFile?.name ?? existingDocument?.name,
    })
  }

  const selectedExtension =
    previewDocument?.fileType ?? existingDocument?.extension ?? "doc"

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => navigate("/admin/documents")}
            >
              <ArrowLeft className="size-4" />
              Trở về danh sách
            </Button>
            <h1 className="text-2xl font-semibold text-slate-900">
              {mode === "edit" ? "Chỉnh sửa tài liệu" : "Tải tài liệu mới"}
            </h1>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <PenSquare className="size-4" />
            {mode === "edit" ? "Chế độ chỉnh sửa" : "Chế độ tải lên"}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-muted/70 bg-white/90 shadow-sm">
            <CardHeader>
              <CardTitle>Khu vực tải tệp</CardTitle>
              <CardDescription>
                Hỗ trợ kéo & thả hoặc chọn tệp từ thiết bị của bạn. Chỉ chấp
                nhận các định dạng phổ biến.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  "border-muted/60 bg-muted/20 flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition",
                  isDragging && "border-primary bg-primary/5"
                )}
              >
                <CloudUpload className="text-primary size-10" />
                <div>
                  <p className="font-semibold text-slate-900">
                    Kéo & thả tệp vào đây
                  </p>
                  <p className="text-muted-foreground text-sm">
                    hoặc
                    <button
                      type="button"
                      className="text-primary ml-1 underline-offset-2 hover:underline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      chọn từ thiết bị
                    </button>
                  </p>
                  <p className="text-muted-foreground mt-2 text-xs">
                    Hỗ trợ: {ACCEPTED_EXTENSIONS.join(", ").toUpperCase()}
                  </p>
                </div>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPT_ATTRIBUTE}
                  className="hidden"
                  onChange={(event) => handleFiles(event.target.files)}
                />
                {validationError && (
                  <p className="text-destructive text-sm">{validationError}</p>
                )}
              </div>

              {(uploadedFile || existingDocument) && (
                <div className="rounded-xl border bg-white/70 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <FileText className="text-primary size-5" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {uploadedFile?.name ?? existingDocument?.name}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {uploadedFile
                          ? formatFileSize(uploadedFile.size)
                          : existingDocument?.size}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="rounded-2xl border bg-white/90 p-4 shadow-inner">
                {previewDocument ? (
                  canPreview ? (
                    <DocViewer
                      documents={[previewDocument]}
                      pluginRenderers={DocViewerRenderers}
                      className="h-[480px] overflow-hidden rounded-xl"
                    />
                  ) : (
                    <PreviewFallback extension={selectedExtension} />
                  )
                ) : (
                  <div className="text-muted-foreground flex h-[320px] flex-col items-center justify-center gap-3 text-center">
                    <CheckCircle2 className="size-10" />
                    <p>Chọn một tệp để xem trước nội dung tại đây.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-muted/70 bg-white/90 shadow-sm">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Thông tin metadata</CardTitle>
                <CardDescription>
                  Điền thông tin để giúp đội ngũ dễ dàng tìm kiếm và phân loại
                  tài liệu.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề</Label>
                  <Input
                    id="title"
                    value={metadata.title}
                    onChange={(event) =>
                      handleMetadataChange("title", event.target.value)
                    }
                    placeholder="VD: Báo cáo doanh thu tháng 10"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Danh mục</Label>
                    <select
                      id="category"
                      value={metadata.category}
                      onChange={(event) =>
                        handleMetadataChange("category", event.target.value)
                      }
                      className="border-input bg-background focus-visible:ring-ring focus-visible:ring-2 block w-full rounded-md border px-3 py-2 text-sm shadow-xs outline-none transition"
                    >
                      <option value="operations">Vận hành</option>
                      <option value="finance">Tài chính</option>
                      <option value="marketing">Marketing</option>
                      <option value="hr">Nhân sự</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="owner">Chủ sở hữu</Label>
                    <Input
                      id="owner"
                      value={metadata.owner}
                      onChange={(event) =>
                        handleMetadataChange("owner", event.target.value)
                      }
                      placeholder="VD: Nguyen Van A"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={metadata.tags}
                    onChange={(event) =>
                      handleMetadataChange("tags", event.target.value)
                    }
                    placeholder="VD: quan-trong, ke-hoach-2025"
                  />
                  <SheetDescription className="!mt-0">
                    Sử dụng dấu phẩy để phân tách thẻ.
                  </SheetDescription>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <textarea
                    id="description"
                    value={metadata.description}
                    onChange={(event) =>
                      handleMetadataChange("description", event.target.value)
                    }
                    rows={5}
                    className="border-input bg-background focus-visible:ring-ring focus-visible:ring-2 block w-full rounded-md border px-3 py-2 text-sm shadow-xs outline-none transition"
                    placeholder="Thêm ghi chú để mọi người hiểu rõ hơn về tài liệu này..."
                  />
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <Button type="submit" className="flex-1 gap-2">
                    <CheckCircle2 className="size-4" />
                    Lưu tài liệu
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate("/admin/documents")}
                  >
                    Hủy
                  </Button>
                </div>

                <p className="text-muted-foreground text-xs">
                  *Lưu ý: Tính năng lưu thực tế sẽ được kết nối với API quản lý
                  tài liệu ở giai đoạn sau.
                </p>
              </CardContent>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

const DEFAULT_STYLE_KEYS = Object.keys(defaultStyles) as DefaultExtensionType[]

const PreviewFallback = ({ extension }: { extension: string }) => {
  const normalized = extension.toLowerCase()
  const styleKey = DEFAULT_STYLE_KEYS.includes(normalized as DefaultExtensionType)
    ? (normalized as DefaultExtensionType)
    : (normalized === "pdf" ? "pdf" : "doc")
  const style = defaultStyles[styleKey]
  return (
    <div className="flex h-[420px] flex-col items-center justify-center gap-4 text-center text-muted-foreground">
      <div className="size-24 rounded-2xl border bg-muted/60 p-4">
        <FileIcon extension={normalized} {...style} />
      </div>
      <p>Không thể hiển thị bản xem trước cho loại tệp này.</p>
    </div>
  )
}

const formatFileSize = (size: number) => {
  if (size >= 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(1)} MB`
  }
  if (size >= 1024) {
    return `${(size / 1024).toFixed(1)} KB`
  }
  return `${size} B`
}
