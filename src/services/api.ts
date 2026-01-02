import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Applications API
export const applicationsAPI = {
  getAll: () => api.get('/applications'),
  getById: (id: string) => api.get(`/applications/${id}`),
  create: (data: any) => api.post('/applications', data),
  update: (id: string, data: any) => api.put(`/applications/${id}`, data),
  delete: (id: string) => api.delete(`/applications/${id}`),
  getStats: () => api.get('/applications/stats/summary'),
}

// Deals API
export const dealsAPI = {
  getAll: () => api.get('/deals'),
  getById: (id: string) => api.get(`/deals/${id}`),
  create: (data: any) => api.post('/deals', data),
  update: (id: string, data: any) => api.put(`/deals/${id}`, data),
  delete: (id: string) => api.delete(`/deals/${id}`),
  getStats: () => api.get('/deals/stats/summary'),
}

// Documents API
export const documentsAPI = {
  getAll: () => api.get('/documents'),
  getById: (id: string) => api.get(`/documents/${id}`),
  getTemplates: () => api.get('/documents/templates/all'),
  getTemplate: (id: string) => api.get(`/documents/templates/${id}`),
  generate: (data: any) => api.post('/documents/generate', data),
  upload: (data: any) => api.post('/documents/upload', data),
  update: (id: string, data: any) => api.put(`/documents/${id}`, data),
  delete: (id: string) => api.delete(`/documents/${id}`),
  getStats: () => api.get('/documents/stats/summary'),
}

// Trading API
export const tradingAPI = {
  getListings: (filters?: any) => api.get('/trading/listings', { params: filters }),
  getListing: (id: string) => api.get(`/trading/listings/${id}`),
  createListing: (data: any) => api.post('/trading/listings', data),
  getActivity: (limit?: number) => api.get('/trading/activity', { params: { limit } }),
  recordActivity: (data: any) => api.post('/trading/activity', data),
  getStats: () => api.get('/trading/stats/summary'),
}

// Market Intelligence API
export const marketAPI = {
  getIntelligence: () => api.get('/loans/market-intelligence'),
  getDashboardStats: () => api.get('/loans/dashboard/stats'),
}

// Analytics API
export const analyticsAPI = {
  getPerformance: () => api.get('/analytics/performance'),
  getPortfolio: () => api.get('/analytics/portfolio'),
  getRisk: () => api.get('/analytics/risk'),
}

// Sustainability API
export const sustainabilityAPI = {
  getGreenLoans: () => api.get('/sustainability/green-loans'),
  getGreenLoan: (id: string) => api.get(`/sustainability/green-loans/${id}`),
  getTargets: () => api.get('/sustainability/targets'),
  updateTargets: (data: any) => api.put('/sustainability/targets', data),
  getStats: () => api.get('/sustainability/stats'),
}

// Health check
export const healthCheck = () => api.get('/health')

export default api

