import { useEffect, useState } from 'react'
import { FileText, Download, Sparkles, CheckCircle } from 'lucide-react'
import { documentsAPI } from '../services/api'

export default function DocumentTemplates() {
  const [templates, setTemplates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      const response = await documentsAPI.getTemplates()
      setTemplates(response.data)
    } catch (error) {
      console.error('Error fetching templates:', error)
      setTemplates([])
    } finally {
      setLoading(false)
    }
  }

  const handleGenerate = (template: any) => {
    console.log('Generate document from template:', template.name)
    // This would trigger the generate modal
  }

  const handleDownload = (template: any) => {
    console.log('Downloading template:', template.name)
    // In a real app, this would download the template file
  }
  return (
    <div className="card">
      <div className="card-header">
        <h2>Document Templates</h2>
        <span className="card-subtitle">LMA-compliant templates</span>
      </div>
      <div className="card-body">
        {loading ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading templates...
          </div>
        ) : templates.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No templates available
          </div>
        ) : (
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
                  {template.compliant === 1 && (
                    <CheckCircle className="compliant-icon" />
                  )}
                </div>
                <div className="template-footer">
                  <span className="template-usage">Used {template.usage_count || 0} times</span>
                  <div className="template-actions">
                    <button
                      className="btn-icon-only"
                      onClick={() => handleGenerate(template)}
                      title="Generate from template"
                    >
                      <Sparkles />
                    </button>
                    <button
                      className="btn-icon-only"
                      onClick={() => handleDownload(template)}
                      title="Download template"
                    >
                      <Download />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

