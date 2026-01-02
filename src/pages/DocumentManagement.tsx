import { useState } from 'react'
import { Search, FileText, Download, Upload, Sparkles, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import DocumentTemplates from '../components/DocumentTemplates'
import DocumentLibrary from '../components/DocumentLibrary'
import UploadDocumentModal from '../components/UploadDocumentModal'
import GenerateDocumentModal from '../components/GenerateDocumentModal'

export default function DocumentManagement() {
  const [showUpload, setShowUpload] = useState(false)
  const [showGenerate, setShowGenerate] = useState(false)

  const handleUpload = (file: File, metadata: any) => {
    console.log('Uploading document:', file.name, metadata)
    // In a real app, this would upload the file
  }

  const handleGenerate = (data: any) => {
    console.log('Generating document:', data)
    // In a real app, this would generate the document
  }

  return (
    <div className="document-management">
      <div className="page-header">
        <div>
          <h1>Document Management</h1>
          <p className="subtitle">Streamlined creation, management, and compliance for loan documentation</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={() => setShowUpload(true)}>
            <Upload className="btn-icon" />
            Upload
          </button>
          <button className="btn btn-primary" onClick={() => setShowGenerate(true)}>
            <Sparkles className="btn-icon" />
            Generate Document
          </button>
        </div>
      </div>

      {showUpload && (
        <UploadDocumentModal
          onClose={() => setShowUpload(false)}
          onUpload={handleUpload}
        />
      )}

      {showGenerate && (
        <GenerateDocumentModal
          onClose={() => setShowGenerate(false)}
          onGenerate={handleGenerate}
        />
      )}

      <div className="search-bar">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search documents, templates, or clauses..."
          className="search-input"
        />
      </div>

      <div className="document-stats">
        <div className="document-stat">
          <div className="stat-icon completed">
            <CheckCircle />
          </div>
          <div className="stat-info">
            <span className="stat-value">156</span>
            <span className="stat-label">Active Documents</span>
          </div>
        </div>
        <div className="document-stat">
          <div className="stat-icon pending">
            <Clock />
          </div>
          <div className="stat-info">
            <span className="stat-value">12</span>
            <span className="stat-label">Pending Review</span>
          </div>
        </div>
        <div className="document-stat">
          <div className="stat-icon warning">
            <AlertTriangle />
          </div>
          <div className="stat-info">
            <span className="stat-value">3</span>
            <span className="stat-label">Requires Update</span>
          </div>
        </div>
      </div>

      <div className="document-content">
        <div className="document-section">
          <DocumentTemplates />
        </div>
        <div className="document-section">
          <DocumentLibrary />
        </div>
      </div>

      <div className="automation-section">
        <div className="card">
          <div className="card-header">
            <Sparkles className="section-icon" />
            <h2>Automated Document Workflows</h2>
          </div>
          <div className="card-body">
            <div className="workflow-list">
              <div className="workflow-item">
                <div className="workflow-icon">
                  <Sparkles />
                </div>
                <div className="workflow-content">
                  <h3>AI-Powered Template Generation</h3>
                  <p>Generate LMA-compliant documents automatically based on deal parameters</p>
                </div>
              </div>
              <div className="workflow-item">
                <div className="workflow-icon">
                  <CheckCircle />
                </div>
                <div className="workflow-content">
                  <h3>Version Control & Tracking</h3>
                  <p>Automatic versioning and change tracking for all loan documents</p>
                </div>
              </div>
              <div className="workflow-item">
                <div className="workflow-icon">
                  <FileText />
                </div>
                <div className="workflow-content">
                  <h3>Smart Clause Library</h3>
                  <p>Access standardized LMA clauses and customize for specific deals</p>
                </div>
              </div>
              <div className="workflow-item">
                <div className="workflow-icon">
                  <AlertTriangle />
                </div>
                <div className="workflow-content">
                  <h3>Compliance Validation</h3>
                  <p>Real-time checks against regulatory requirements and LMA standards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

