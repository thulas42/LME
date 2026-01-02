import { FileText, Calendar, User, CheckCircle, Clock, AlertTriangle } from 'lucide-react'

const documents = [
  {
    id: 1,
    name: 'TechCorp Term Loan Agreement',
    deal: 'TechCorp Industries - $50M',
    status: 'approved',
    lastModified: '2024-01-15',
    modifiedBy: 'John Smith',
    version: 'v2.3',
  },
  {
    id: 2,
    name: 'GreenEnergy Credit Facility',
    deal: 'GreenEnergy Solutions - $75M',
    status: 'pending',
    lastModified: '2024-01-14',
    modifiedBy: 'Sarah Johnson',
    version: 'v1.8',
  },
  {
    id: 3,
    name: 'InfraBuild Syndicated Agreement',
    deal: 'InfraBuild Ltd - $120M',
    status: 'review',
    lastModified: '2024-01-13',
    modifiedBy: 'Michael Chen',
    version: 'v3.1',
  },
]

export default function DocumentLibrary() {
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
                    <div className="document-deal">{doc.deal}</div>
                  </div>
                  <StatusIcon className="status-icon" />
                </div>
                <div className="document-footer">
                  <div className="document-meta">
                    <span className="document-version">{doc.version}</span>
                    <span className="document-date">
                      <Calendar className="meta-icon" />
                      {doc.lastModified}
                    </span>
                    <span className="document-author">
                      <User className="meta-icon" />
                      {doc.modifiedBy}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

