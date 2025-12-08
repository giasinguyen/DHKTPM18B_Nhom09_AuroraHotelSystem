import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

import { DocumentGrid } from "@/components/custom/document/DocumentGrid"
import { DocumentPreview } from "@/components/custom/document/DocumentPreview"
import { DocumentToolbar } from "@/components/custom/document/DocumentToolbar"
import type { DocumentItem, DocumentViewMode } from "@/features/documents/data"
import { mockDocuments } from "@/features/documents/data"

const DocumentListPage = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<DocumentViewMode>("grid")
  const [previewOpen, setPreviewOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null)

  const filteredDocuments = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase()
    if (!keyword) return mockDocuments
    return mockDocuments.filter((document) => {
      const searchable = `${document.name} ${document.owner} ${document.extension}`.toLowerCase()
      return searchable.includes(keyword)
    })
  }, [searchTerm])

  const handlePreview = (document: DocumentItem) => {
    setSelectedDocument(document)
    setPreviewOpen(true)
  }

  const handleUploadNavigate = () => {
    navigate("/admin/documents/upsert")
  }

  const handleEditNavigate = (document: DocumentItem) => {
    navigate(`/admin/documents/upsert?docId=${document.id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
            Document Hub
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Quản lý tài liệu</h1>
        </header>

        <DocumentToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onUploadClick={handleUploadNavigate}
        />

        <DocumentGrid documents={filteredDocuments} viewMode={viewMode} onPreview={handlePreview} />
      </div>

      <DocumentPreview
        document={selectedDocument}
        open={previewOpen}
        onOpenChange={(open) => {
          setPreviewOpen(open)
          if (!open) {
            setSelectedDocument(null)
          }
        }}
        onEdit={handleEditNavigate}
      />
    </div>
  )
}

export default DocumentListPage