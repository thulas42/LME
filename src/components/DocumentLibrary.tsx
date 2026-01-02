import { useEffect, useState } from 'react'
import { FileText, Calendar, User, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import { documentsAPI } from '../services/api'

export default function DocumentLibrary() {
  const [documents, setDocuments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    try {
      const response = await documentsAPI.getAll()
      setDocuments(response.data)
    } catch (error) {
      console.error('Error fetching documents:', error)
      setDocuments([])
    } finally {
      setLoading(false)
    }
  }
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return CheckCircle
      case 'pending':
        return Clock
      case 'review':
        return AlertTriangle
      default:
        return FileText
    }
  }

  const handleDocumentClick = (doc: typeof documents[0]) => {
    console.log('Viewing document:', doc.name)
    // In a real app, this would open the document viewer or editor
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Document Library</h2>
      </div>
      <div className="card-body">
        {loading ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading documents...
          </div>
        ) : documents.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No documents in library
          </div>
        ) : (
          <div className="document-list">
            {documents.map((doc) => {
              const StatusIcon = getStatusIcon(doc.status)
              return (
                <div
                  key={doc.id}
                  className={`document-item ${doc.status}`}
                  onClick={() => handleDocumentClick(doc)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="document-header">
                    <FileText className="document-icon" />
                    <div className="document-info">
                      <div className="document-name">{doc.name}</div>
                      {doc.deal_id && (
                        <div className="document-deal">Deal: {doc.deal_id}</div>
                      )}
                    </div>
                    <StatusIcon className="status-icon" />
                  </div>
                  <div className="document-footer">
                    <div className="document-meta">
                      <span className="document-version">{doc.version || 'v1.0'}</span>
                      <span className="document-date">
                        <Calendar className="meta-icon" />
                        {new Date(doc.last_modified).toLocaleDateString()}
                      </span>
                      {doc.created_by && (
                        <span className="document-author">
                          <User className="meta-icon" />
                          {doc.created_by}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

