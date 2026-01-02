import { useState, useEffect } from 'react'
import { tradingAPI } from '../services/api'

export function useTrading() {
  const [listings, setListings] = useState<any[]>([])
  const [activity, setActivity] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchListings()
    fetchActivity()
  }, [])

  const fetchListings = async (filters?: any) => {
    try {
      setLoading(true)
      const response = await tradingAPI.getListings(filters)
      setListings(response.data)
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch listings')
      console.error('Error fetching listings:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchActivity = async () => {
    try {
      const response = await tradingAPI.getActivity(10)
      setActivity(response.data)
    } catch (err: any) {
      console.error('Error fetching activity:', err)
    }
  }

  const getListing = async (id: string) => {
    try {
      const response = await tradingAPI.getListing(id)
      // Update in listings array
      setListings(prev => prev.map(listing => 
        listing.id === id ? response.data : listing
      ))
      return response.data
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to fetch listing')
    }
  }

  return {
    listings,
    activity,
    loading,
    error,
    fetchListings,
    fetchActivity,
    getListing,
  }
}

