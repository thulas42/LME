import { useState, useEffect } from 'react'
import { applicationsAPI } from '../services/api'

export function useApplications() {
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const response = await applicationsAPI.getAll()
      setApplications(response.data)
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch applications')
      console.error('Error fetching applications:', err)
    } finally {
      setLoading(false)
    }
  }

  const createApplication = async (data: any) => {
    try {
      const response = await applicationsAPI.create(data)
      setApplications(prev => [response.data, ...prev])
      return response.data
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to create application')
    }
  }

  const updateApplication = async (id: string, data: any) => {
    try {
      const response = await applicationsAPI.update(id, data)
      setApplications(prev => prev.map(app => app.id === id ? response.data : app))
      return response.data
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to update application')
    }
  }

  return {
    applications,
    loading,
    error,
    fetchApplications,
    createApplication,
    updateApplication,
  }
}

