import { X, Upload, FileText } from 'lucide-react'
import { useState } from 'react'

interface UploadDocumentModalProps {
  onClose: () => void
  onUpload: (file: File, metadata: any) => void
}

export default function UploadDocumentModal({ onClose, onUpload }: UploadDocumentModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [metadata, setMetadata] = useState({
    name: '',
    category: 'Agreement',
    dealId: '',
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      if (!metadata.name) {
        setMetadata(prev => ({ ...prev, name: selectedFile.name }))
      }
    }
  }

  const handleUpload = () => {
    if (file) {
      onUpload(file, metadata)
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content upload-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Upload className="section-icon" />
            <h2>Upload Document</h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="upload-content">
          <div className="form-section">
            <div className="file-upload-area">
              <input
                type="file"
                id="file-upload"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="file-input"
              />
              <label htmlFor="file-upload" className="file-upload-label">
                {file ? (
                  <div className="file-selected">
                    <FileText className="file-icon" />
                    <div>
                      <div className="file-name">{file.name}</div>
                      <div className="file-size">{(file.size / 1024).toFixed(2)} KB</div>
                    </div>
                  </div>
                ) : (
                  <div className="file-upload-placeholder">
                    <Upload className="upload-icon" />
                    <div>Click to upload or drag and drop</div>
                    <div className="file-types">PDF, DOC, DOCX (Max 10MB)</div>
                  </div>
                )}
              </label>
            </div>

            <div className="form-group">
              <label>Document Name</label>
              <input
                type="text"
                value={metadata.name}
                onChange={(e) => setMetadata(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter document name"
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                value={metadata.category}
                onChange={(e) => setMetadata(prev => ({ ...prev, category: e.target.value }))}
              >
                <option value="Agreement">Agreement</option>
                <option value="Amendment">Amendment</option>
                <option value="Certificate">Certificate</option>
                <option value="Report">Report</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Deal ID (Optional)</label>
              <input
                type="text"
                value={metadata.dealId}
                onChange={(e) => setMetadata(prev => ({ ...prev, dealId: e.target.value }))}
                placeholder="LN-2024-XXX"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpload}
              disabled={!file}
            >
              <Upload className="btn-icon" />
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

