
import React, { useState, useCallback, useRef, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"
import { ArrowLeft, Upload, FileText, Eye, Trash2 } from "lucide-react"
import type { DocumentItem } from "@/features/documents/data"
import { mockDocuments } from "@/features/documents/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const ACCEPTED_EXTENSIONS = [
  "pdf",
  "md",
  "txt",
]

const ACCEPT_ATTRIBUTE = ACCEPTED_EXTENSIONS.map((ext) => `.${ext}`).join(",")

const DOCUMENT_CATEGORIES = [
  { value: "operations", label: "Vận hành" },
  { value: "policy", label: "Chính sách" },
  { value: "training", label: "Đào tạo" },
  { value: "financial", label: "Tài chính" },
  { value: "legal", label: "Pháp lý" },
  { value: "marketing", label: "Marketing" },
  { value: "other", label: "Khác" },
]

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
  owner: "Admin User", // Mặc định là người dùng hiện tại
  description: "",
  tags: "",
}

type FileInfo = {
  file: File
  name: string
  size: string
  type: string
  url: string
  fileData?: string // Base64 data for DocViewer
}

export default function DocumentUpsertPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const docId = searchParams.get("docId")
  const isEditing = Boolean(docId)
  
  const [metadata, setMetadata] = useState<MetadataState>(DEFAULT_METADATA)
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null)
  const [existingDocument, setExistingDocument] = useState<DocumentItem | null>(null)

  // Load existing document data when editing
  useEffect(() => {
    if (isEditing && docId) {
      const document = mockDocuments.find(doc => doc.id === docId)
      if (document) {
        setExistingDocument(document)
        setMetadata({
          title: document.name.replace(/\.[^/.]+$/, ""),
          category: "operations", // Default since not in DocumentItem
          owner: document.owner,
          description: "", // Default since not in DocumentItem
          tags: "", // Default since not in DocumentItem
        })
        // For editing, we show the existing document preview
        setFileInfo({
          file: new File([], document.name), // Placeholder file
          name: document.name,
          size: document.size,
          type: document.extension,
          url: document.url,
          // For existing documents, we'll use uri instead of fileData
        })
      }
    }
  }, [isEditing, docId])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFileLoading, setIsFileLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileExtension = (filename: string): string => {
    return filename.split(".").pop()?.toLowerCase() || ""
  }

  const isFileSupported = useCallback((filename: string): boolean => {
    const extension = getFileExtension(filename)
    return ACCEPTED_EXTENSIONS.includes(extension)
  }, [])

  const handleFileSelect = useCallback(async (file: File) => {
    if (!isFileSupported(file.name)) {
      alert(`Định dạng file không được hỗ trợ. Chỉ chấp nhận: ${ACCEPTED_EXTENSIONS.join(", ")}`)
      return
    }

    setIsFileLoading(true)
    try {
      // Convert file to base64 for DocViewer
      const fileData = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = () => reject(new Error('Failed to read file'))
        reader.readAsDataURL(file)
      })

      const url = URL.createObjectURL(file)
      const newFileInfo: FileInfo = {
        file,
        name: file.name,
        size: formatFileSize(file.size),
        type: getFileExtension(file.name),
        url,
        fileData, // Add fileData for DocViewer
      }

      setFileInfo(newFileInfo)
      
      // Auto-fill title from filename if empty
      if (!metadata.title) {
        const nameWithoutExtension = file.name.replace(/\.[^/.]+$/, "")
        setMetadata(prev => ({ ...prev, title: nameWithoutExtension }))
      }
    } catch (error) {
      console.error('Error reading file:', error)
      alert('Không thể đọc file. Vui lòng thử lại với file khác.')
    } finally {
      setIsFileLoading(false)
    }
  }, [metadata.title, isFileSupported])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }, [handleFileSelect])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleClearFile = () => {
    if (fileInfo?.url) {
      URL.revokeObjectURL(fileInfo.url)
    }
    setFileInfo(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleMetadataChange = (field: keyof MetadataState, value: string) => {
    setMetadata(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!fileInfo && !isEditing) {
      alert("Vui lòng chọn file để tải lên")
      return
    }

    if (!metadata.title.trim()) {
      alert("Vui lòng nhập tiêu đề tài liệu")
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log("Document metadata:", metadata)
      console.log("File info:", fileInfo)
      console.log("Existing document:", existingDocument)
      
      alert(isEditing ? "Cập nhật tài liệu thành công!" : "Tải lên tài liệu thành công!")
      navigate("/admin/documents")
    } catch (error) {
      alert("Có lỗi xảy ra. Vui lòng thử lại!")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const docs = fileInfo ? [
    fileInfo.fileData 
      ? { 
          uri: fileInfo.fileData, // Use base64 data as URI
          fileName: fileInfo.name,
          fileType: fileInfo.type
        }
      : { 
          uri: fileInfo.url, 
          fileName: fileInfo.name,
          fileType: fileInfo.type
        }
  ] : []

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100 py-4">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4">
        {/* Header */}
        <header className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin/documents")}
            className="flex items-center gap-2 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
          <div className="flex items-center gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
                Document Hub
              </p>
              <h1 className="text-3xl font-bold text-slate-900">
                {isEditing ? "Chỉnh sửa tài liệu" : "Thêm tài liệu mới"}
              </h1>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - File Upload & Metadata */}
          <div className="space-y-6">
            {/* File Upload Area */}
            {!fileInfo && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Tải lên tài liệu
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                      isDragOver
                        ? "border-primary bg-primary/5"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium mb-2">
                      Kéo thả file vào đây hoặc click để chọn
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Hỗ trợ các định dạng: {ACCEPTED_EXTENSIONS.join(", ").toUpperCase()}
                    </p>
                    <Button variant="outline">Chọn file</Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={ACCEPT_ATTRIBUTE}
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* File Info */}
            {fileInfo && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Thông tin file
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClearFile}
                      className="flex items-center gap-2 text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                      Xóa file
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Tên file:</span>
                    <span className="text-sm">{fileInfo.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Dung lượng:</span>
                    <span className="text-sm">{fileInfo.size}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Định dạng:</span>
                    <Badge variant="secondary">{fileInfo.type.toUpperCase()}</Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Metadata Form */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin tài liệu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề <span className="text-red-400">*</span></Label>
                  <Input
                    id="title"
                    value={metadata.title}
                    onChange={(e) => handleMetadataChange("title", e.target.value)}
                    placeholder="Nhập tiêu đề tài liệu"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Loại tài liệu</Label>
                  <Select
                    value={metadata.category}
                    onValueChange={(value) => handleMetadataChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại tài liệu" />
                    </SelectTrigger>
                    <SelectContent>
                      {DOCUMENT_CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="owner">Người gửi</Label>
                  <Input
                    id="owner"
                    value={metadata.owner}
                    onChange={(e) => handleMetadataChange("owner", e.target.value)}
                    placeholder="Tên người gửi"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={metadata.tags}
                    onChange={(e) => handleMetadataChange("tags", e.target.value)}
                    placeholder="Nhập tags, ngăn cách bởi dấu phẩy"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    value={metadata.description}
                    onChange={(e) => handleMetadataChange("description", e.target.value)}
                    placeholder="Nhập mô tả chi tiết về tài liệu"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  "Đang xử lý..."
                ) : (
                  isEditing ? "Cập nhật tài liệu" : "Tải lên tài liệu"
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/admin/documents")}
                disabled={isLoading}
              >
                Hủy
              </Button>
            </div>
          </div>

          {/* Right Column - Document Preview */}
          <div className="space-y-6">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Xem trước tài liệu
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!fileInfo ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">
                      Chọn file để xem trước nội dung tài liệu
                    </p>
                  </div>
                ) : (
                  <div className="border rounded-lg overflow-hidden" style={{ height: "600px" }}>
                    {isFileLoading ? (
                      <div className="flex h-full items-center justify-center p-8">
                        <div className="space-y-4 text-center">
                          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                          <p className="text-sm text-gray-500">Đang xử lý file...</p>
                        </div>
                      </div>
                    ) : docs.length > 0 ? (
                      <DocViewer
                        documents={docs}
                        pluginRenderers={DocViewerRenderers}
                        config={{
                          header: {
                            disableHeader: false,
                            disableFileName: false,
                            retainURLParams: false,
                          },
                        }}
                        style={{ height: "100%" }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center p-8 text-center">
                        <div className="space-y-4">
                          <FileText className="h-16 w-16 mx-auto text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">{fileInfo.name}</p>
                            <p className="text-sm text-gray-500 mt-1">
                              Không thể hiển thị xem trước cho file này
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              File sẽ được tải lên và có thể xem sau khi lưu
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
