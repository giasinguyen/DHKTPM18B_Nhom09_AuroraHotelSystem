export type DocumentViewMode = "grid" | "list"

export type DocumentItem = {
  id: string
  name: string
  extension: string
  mimeType: string
  owner: string
  size: string
  updatedAt: string
  url: string
  starred?: boolean
}

export const mockDocuments: DocumentItem[] = [
  {
    id: "doc-1",
    name: "Hop dong khung 2025.pdf",
    extension: "pdf",
    mimeType: "application/pdf",
    owner: "Nguyen Van A",
    size: "2.4 MB",
    updatedAt: "2025-02-12T08:15:00.000Z",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    starred: true,
  },
  {
    id: "doc-2",
    name: "Bao cao tai chinh Q3.xlsx",
    extension: "xlsx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    owner: "Tran Thi B",
    size: "940 KB",
    updatedAt: "2025-01-04T10:45:00.000Z",
    url: "https://filesamples.com/samples/document/xlsx/sample2.xlsx",
  },
  {
    id: "doc-3",
    name: "Chi phi marketing 2024.pptx",
    extension: "pptx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    owner: "Le Hoang",
    size: "5.1 MB",
    updatedAt: "2025-03-22T13:30:00.000Z",
    url: "https://filesamples.com/samples/document/pptx/sample2.pptx",
  },
  {
    id: "doc-5",
    name: "Catalogue phong tong thong.png",
    extension: "png",
    mimeType: "image/png",
    owner: "Design Team",
    size: "3.2 MB",
    updatedAt: "2025-03-02T07:05:00.000Z",
    url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
  },
]

