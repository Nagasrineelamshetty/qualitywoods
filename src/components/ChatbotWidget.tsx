import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm here to help you with your furniture needs. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();

      const botMessage = {
        id: messages.length + 2,
        text: data.response || "Sorry, I couldn't find an answer to that.",
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: messages.length + 2,
          text: 'Something went wrong while fetching the answer.',
          isBot: true,
          timestamp: new Date()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-amber-600 hover:bg-amber-700 shadow-lg z-50"
        size="icon"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {/* Chat Panel */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 h-96 bg-white shadow-xl border border-amber-200 z-50 flex flex-col">
          {/* Header */}
          <div className="bg-amber-600 text-white p-4 rounded-t-lg">
            <h3 className="font-semibold">Quality Woods Support</h3>
            <p className="text-sm text-amber-100">Ask anything about our furniture!</p>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg text-sm ${
                    message.isBot
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-amber-600 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-xs text-gray-500">Typing...</div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-amber-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your question..."
                className="flex-1 p-2 text-sm border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-amber-600 hover:bg-amber-700"
                disabled={loading}
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatbotWidget;
