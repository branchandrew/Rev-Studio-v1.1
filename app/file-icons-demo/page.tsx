import { type FileType, FileTypeIcon } from "@/components/shared/file-type-icons"

export default function FileIconsDemo() {
  // All file types
  const fileTypes: FileType[] = [
    "folder",
    "word",
    "clip",
    "captions",
    "csv",
    "transcript",
    "aiInsight",
    "humanCaptions",
    "pdf",
    "videoUpload",
    "subtitles",
    "humanTranscript",
    "textUpload",
  ]

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">File Type Icons</h1>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Icons Only</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {fileTypes.map((type) => (
              <div key={type} className="flex flex-col items-center justify-center p-4 border rounded">
                <FileTypeIcon type={type} />
                <span className="mt-2 text-sm text-gray-500">{type}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Icons with Labels</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {fileTypes.map((type) => (
              <div key={type} className="p-4 border rounded">
                <FileTypeIcon type={type} showLabel />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Pill Variant</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {fileTypes.map((type) => (
              <div key={type} className="p-4 border rounded">
                <FileTypeIcon type={type} variant="pill" />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Labeled Variant</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {fileTypes.map((type) => (
              <div key={type} className="p-4 border rounded flex items-center justify-center">
                <FileTypeIcon type={type} variant="labeled" />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Size Variations</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-medium mb-3">Small</h3>
              <div className="flex flex-wrap gap-6">
                {fileTypes.slice(0, 6).map((type) => (
                  <FileTypeIcon key={type} type={type} size="sm" />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">Medium (Default)</h3>
              <div className="flex flex-wrap gap-6">
                {fileTypes.slice(0, 6).map((type) => (
                  <FileTypeIcon key={type} type={type} size="md" />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">Large</h3>
              <div className="flex flex-wrap gap-6">
                {fileTypes.slice(0, 6).map((type) => (
                  <FileTypeIcon key={type} type={type} size="lg" />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Usage Examples</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded flex items-center gap-3">
              <FileTypeIcon type="pdf" size="sm" />
              <span className="flex-1">quarterly-report-2023.pdf</span>
              <span className="text-sm text-gray-500">2.4 MB</span>
            </div>
            <div className="p-4 border rounded flex items-center gap-3">
              <FileTypeIcon type="word" size="sm" />
              <span className="flex-1">project-proposal.docx</span>
              <span className="text-sm text-gray-500">1.8 MB</span>
            </div>
            <div className="p-4 border rounded flex items-center gap-3">
              <FileTypeIcon type="videoUpload" size="sm" />
              <span className="flex-1">company-presentation.mp4</span>
              <span className="text-sm text-gray-500">24.7 MB</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
