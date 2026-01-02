import { FileText, Download, Sparkles, CheckCircle } from 'lucide-react'

const templates = [
  {
    id: 1,
    name: 'LMA Term Loan Agreement',
    category: 'Standard',
    version: '2024.1',
    compliant: true,
    usage: 156,
  },
  {
    id: 2,
    name: 'Revolving Credit Facility',
    category: 'Standard',
    version: '2024.1',
    compliant: true,
    usage: 89,
  },
  {
    id: 3,
    name: 'Syndicated Loan Agreement',
    category: 'Standard',
    version: '2024.1',
    compliant: true,
    usage: 124,
  },
  {
    id: 4,
    name: 'Green Loan Agreement',
    category: 'Specialized',
    version: '2024.2',
    compliant: true,
    usage: 45,
  },
]

export default function DocumentTemplates() {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Document Templates</h2>
        <span className="card-subtitle">LMA-compliant templates</span>
      </div>
      <div className="card-body">
        <div className="template-list">
          {templates.map((template) => (
            <div key={template.id} className="template-item">
              <div className="template-header">
                <FileText className="template-icon" />
                <div className="template-info">
                  <div className="template-name">{template.name}</div>
                  <div className="template-meta">
                    <span className="template-category">{template.category}</span>
                    <span className="template-version">v{template.version}</span>
                  </div>
                </div>
                {template.compliant && (
                  <CheckCircle className="compliant-icon" />
                )}
              </div>
              <div className="template-footer">
                <span className="template-usage">Used {template.usage} times</span>
                <div className="template-actions">
                  <button
                    className="btn-icon-only"
                    onClick={() => {
                      console.log('Generate document from template:', template.name)
                      // In a real app, this would open the generate modal
                    }}
                    title="Generate from template"
                  >
                    <Sparkles />
                  </button>
                  <button
                    className="btn-icon-only"
                    onClick={() => {
                      console.log('Downloading template:', template.name)
                      // In a real app, this would download the template
                    }}
                    title="Download template"
                  >
                    <Download />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

