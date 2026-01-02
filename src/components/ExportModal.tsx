import { X, Download, FileText, FileSpreadsheet } from 'lucide-react'
import { useState } from 'react'

interface ExportModalProps {
  onClose: () => void
  onExport: (format: string) => void
  type?: 'market' | 'trading'
}

export default function ExportModal({ onClose, onExport, type = 'market' }: ExportModalProps) {
  const [format, setFormat] = useState('csv')

  const handleExport = () => {
    onExport(format)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content export-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Download className="section-icon" />
            <h2>Export Data</h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="export-content">
          <div className="form-section">
            <h3>Select Export Format</h3>
            <div className="format-options">
              <div
                className={`format-option ${format === 'csv' ? 'active' : ''}`}
                onClick={() => setFormat('csv')}
              >
                <FileSpreadsheet className="format-icon" />
                <div>
                  <div className="format-name">CSV</div>
                  <div className="format-desc">Comma-separated values</div>
                </div>
              </div>
              <div
                className={`format-option ${format === 'xlsx' ? 'active' : ''}`}
                onClick={() => setFormat('xlsx')}
              >
                <FileSpreadsheet className="format-icon" />
                <div>
                  <div className="format-name">Excel</div>
                  <div className="format-desc">Microsoft Excel format</div>
                </div>
              </div>
              <div
                className={`format-option ${format === 'pdf' ? 'active' : ''}`}
                onClick={() => setFormat('pdf')}
              >
                <FileText className="format-icon" />
                <div>
                  <div className="format-name">PDF</div>
                  <div className="format-desc">Portable document format</div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleExport}>
              <Download className="btn-icon" />
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

