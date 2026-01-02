import { useState, useEffect } from 'react'
import { Search, FileText, Download, Upload, Sparkles, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import DocumentTemplates from '../components/DocumentTemplates'
import DocumentLibrary from '../components/DocumentLibrary'
import UploadDocumentModal from '../components/UploadDocumentModal'
import GenerateDocumentModal from '../components/GenerateDocumentModal'

export default function DocumentManagement() {
  const [showUpload, setShowUpload] = useState(false)
  const [showGenerate, setShowGenerate] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [documentStats, setDocumentStats] = useState({
    active: 0,
    pending: 0,
    requiresUpdate: 0,
  })

  useEffect(() => {
    fetchDocumentStats()
  }, [])

  const fetchDocumentStats = async () => {
    try {
      const { documentsAPI } = await import('../services/api')
      const response = await documentsAPI.getStats()
      setDocumentStats({
        active: response.data.total || 0,
        pending: response.data.pending || 0,
        requiresUpdate: response.data.review || 0,
      })
    } catch (error) {
      console.error('Error fetching document stats:', error)
    }
  }

  const handleUpload = async (file: File, metadata: any) => {
    try {
      const { documentsAPI } = await import('../services/api')
      const response = await documentsAPI.upload({
        name: metadata.name || file.name,
        category: metadata.category,
        dealId: metadata.dealId,
      })
      console.log('Document uploaded:', response.data)
      alert('Document uploaded successfully!')
      await fetchDocumentStats()
    } catch (error: any) {
      console.error('Error uploading document:', error)
      alert(error.message || 'Failed to upload document')
    }
  }

  const handleGenerate = async (data: any) => {
    try {
      const { documentsAPI } = await import('../services/api')
      // Find template ID by name
      const templatesResponse = await documentsAPI.getTemplates()
      const template = templatesResponse.data.find((t: any) => t.name === data.template)
      
      if (!template) {
        throw new Error('Template not found')
      }

      const response = await documentsAPI.generate({
        templateId: template.id,
        dealId: data.dealId,
        borrowerName: data.borrowerName,
        loanAmount: parseFloat(data.loanAmount),
        currency: data.currency,
        loanType: data.loanType,
      })
      console.log('Document generated:', response.data)
      alert('Document generated successfully!')
      await fetchDocumentStats()
    } catch (error: any) {
      console.error('Error generating document:', error)
      alert(error.message || 'Failed to generate document')
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    console.log('Searching documents:', e.target.value)
    // In a real app, this would filter the displayed documents
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
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="document-stats">
        <div className="document-stat">
          <div className="stat-icon completed">
            <CheckCircle />
          </div>
          <div className="stat-info">
            <span className="stat-value">{documentStats.active}</span>
            <span className="stat-label">Active Documents</span>
          </div>
        </div>
        <div className="document-stat">
          <div className="stat-icon pending">
            <Clock />
          </div>
          <div className="stat-info">
            <span className="stat-value">{documentStats.pending}</span>
            <span className="stat-label">Pending Review</span>
          </div>
        </div>
        <div className="document-stat">
          <div className="stat-icon warning">
            <AlertTriangle />
          </div>
          <div className="stat-info">
            <span className="stat-value">{documentStats.requiresUpdate}</span>
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

