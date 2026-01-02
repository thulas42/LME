import { useState, useEffect } from 'react'
import { documentsAPI } from '../services/api'

export function useDocuments() {
  const [documents, setDocuments] = useState<any[]>([])
  const [templates, setTemplates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDocuments()
    fetchTemplates()
  }, [])

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      const response = await documentsAPI.getAll()
      setDocuments(response.data)
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch documents')
      console.error('Error fetching documents:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchTemplates = async () => {
    try {
      const response = await documentsAPI.getTemplates()
      setTemplates(response.data)
    } catch (err: any) {
      console.error('Error fetching templates:', err)
    }
  }

  const generateDocument = async (data: any) => {
    try {
      const response = await documentsAPI.generate(data)
      setDocuments(prev => [response.data, ...prev])
      await fetchTemplates() // Refresh templates to update usage count
      return response.data
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to generate document')
    }
  }

  const uploadDocument = async (file: File, metadata: any) => {
    try {
      const response = await documentsAPI.upload(metadata)
      setDocuments(prev => [response.data, ...prev])
      return response.data
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to upload document')
    }
  }

  return {
    documents,
    templates,
    loading,
    error,
    fetchDocuments,
    generateDocument,
    uploadDocument,
  }
}

