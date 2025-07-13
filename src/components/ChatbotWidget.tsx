
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

  const quickQuestions = [
    "Where is my order?",
    "What woods do you use?",
    "Can I request a custom size?",
    "What's your delivery time?",
    "Do you offer installation?"
  ];

  const handleQuickQuestion = (question: string) => {
    const userMessage = {
      id: messages.length + 1,
      text: question,
      isBot: false,
      timestamp: new Date()
    };

    let botResponse = "";
    switch (question) {
      case "Where is my order?":
        botResponse = "You can track your order status on our tracking page. Please enter your order ID to get real-time updates.";
        break;
      case "What woods do you use?":
        botResponse = "We use premium quality woods including Teak, Mahogany, Oak, Sheesham, and Pine. All our wood is sustainably sourced.";
        break;
      case "Can I request a custom size?":
        botResponse = "Absolutely! We specialize in custom furniture. You can specify your exact dimensions when placing an order.";
        break;
      case "What's your delivery time?":
        botResponse = "Standard delivery is 3-4 weeks. Custom pieces may take 4-6 weeks depending on complexity.";
        break;
      case "Do you offer installation?":
        botResponse = "Yes, we provide professional installation service for all our furniture at no extra cost within city limits.";
        break;
      default:
        botResponse = "Thank you for your question. Our team will get back to you soon!";
    }

    const botMessage = {
      id: messages.length + 2,
      text: botResponse,
      isBot: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      isBot: false,
      timestamp: new Date()
    };

    const botMessage = {
      id: messages.length + 2,
      text: "Thank you for your message! Our customer service team will get back to you within 24 hours.",
      isBot: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setInput('');
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
            <h3 className="font-semibold">FurnitureCraft Support</h3>
            <p className="text-sm text-amber-100">We're here to help!</p>
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

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 text-center">Quick questions:</p>
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="block w-full text-left text-xs bg-amber-50 hover:bg-amber-100 p-2 rounded border border-amber-200 text-amber-700 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
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
                placeholder="Type your message..."
                className="flex-1 p-2 text-sm border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-amber-600 hover:bg-amber-700"
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
