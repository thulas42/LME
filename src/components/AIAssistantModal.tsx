import { X, Sparkles, Send } from 'lucide-react'
import { useState } from 'react'

interface AIAssistantModalProps {
  onClose: () => void
}

export default function AIAssistantModal({ onClose }: AIAssistantModalProps) {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', text: 'Hello! I\'m your AI assistant. How can I help you with loan origination today?' }
  ])
  const [input, setInput] = useState('')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { id: messages.length + 1, role: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'Based on the borrower profile, I recommend a credit score assessment. The current market conditions suggest a spread of 175-185 bps would be appropriate.',
        'I can help you generate the required documentation. Which type of loan agreement do you need?',
        'For this sector, I\'ve identified 3 similar deals in the past 6 months. Would you like to see the pricing comparison?',
        'The compliance check shows all requirements are met. You can proceed to the next step.',
      ]
      const aiResponse = {
        id: messages.length + 2,
        role: 'assistant',
        text: responses[Math.floor(Math.random() * responses.length)]
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content ai-assistant-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Sparkles className="section-icon" />
            <h2>AI Assistant</h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="ai-chat">
          <div className="ai-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`ai-message ${msg.role}`}>
                <div className="message-content">{msg.text}</div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="ai-input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about loan origination..."
              className="ai-input"
            />
            <button type="submit" className="btn btn-primary">
              <Send className="btn-icon" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

