import { useState, useEffect } from 'react'
import { dealsAPI } from '../services/api'

export function useDeals() {
  const [deals, setDeals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDeals()
  }, [])

  const fetchDeals = async () => {
    try {
      setLoading(true)
      const response = await dealsAPI.getAll()
      setDeals(response.data)
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch deals')
      console.error('Error fetching deals:', err)
    } finally {
      setLoading(false)
    }
  }

  const createDeal = async (data: any) => {
    try {
      const response = await dealsAPI.create(data)
      setDeals(prev => [response.data, ...prev])
      return response.data
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to create deal')
    }
  }

  const updateDeal = async (id: string, data: any) => {
    try {
      const response = await dealsAPI.update(id, data)
      setDeals(prev => prev.map(deal => deal.id === id ? response.data : deal))
      return response.data
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to update deal')
    }
  }

  return {
    deals,
    loading,
    error,
    fetchDeals,
    createDeal,
    updateDeal,
  }
}

