import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Bot, User, Phone, CheckCircle2, ChevronRight } from 'lucide-react';
import { projectData } from '../data/projectData';

interface LuxuryConciergeChatProps {
  onOpenBooking: () => void;
  onOpenBrochure: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  quickReplies?: string[];
}

export const LuxuryConciergeChat: React.FC<LuxuryConciergeChatProps> = ({
  onOpenBooking,
  onOpenBrochure
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Namaste! Welcome to Saheel Luxton Wakad. I am your 24/7 AI Luxury Concierge. How may I assist your home search today?",
      timestamp: 'Just now',
      quickReplies: [
        'What are the 2, 3 & 4 BHK prices?',
        'Tell me about the 4,000 sq.ft lobby',
        'How close is Phoenix Mall?',
        'Verify MahaRERA number'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // AI Intelligent Response Logic
    setTimeout(() => {
      let aiReply = "";
      let replies: string[] = [];

      const lower = textToSend.toLowerCase();

      if (lower.includes('price') || lower.includes('cost') || lower.includes('rate') || lower.includes('emi')) {
        aiReply = "Saheel Luxton luxury residences start at ₹97 Lakhs* for 2 BHK (753-809 sq.ft), ₹1.32 Cr* for 3 BHK (1,027-1,162 sq.ft), and ₹1.86 Cr* for 4 BHK Presidential Sky Suites (1,458 sq.ft). Pre-approved bank loans available from SBI and HDFC.";
        replies = ['Download Itemized Cost Sheet', 'Book VIP Visit & Lock Offers'];
      } else if (lower.includes('lobby') || lower.includes('arrival') || lower.includes('amenities')) {
        aiReply = "Saheel Luxton introduces Pune's 1st 4,000 Sq. Ft. Double-Height Italian Marble Grand Lobby with 24/7 concierge, plus a 5-Star Rooftop Sky Club featuring an Open-Air Aqua Theatre & Infinity Horizon Pool on the 30th floor!";
        replies = ['Explore 30+ Amenities', 'View 360° Virtual Tour'];
      } else if (lower.includes('phoenix') || lower.includes('location') || lower.includes('metro') || lower.includes('hinjawadi')) {
        aiReply = "Saheel Luxton is situated at S. No. 111, Wakad — just 5 minutes from Phoenix Mall of the Millennium, 4 minutes from the upcoming Metro Line 3 Wakad station, and 7 minutes from Hinjawadi IT Park Phase 1.";
        replies = ['View Location & Map', 'Schedule Cab Pickup'];
      } else if (lower.includes('rera') || lower.includes('approval') || lower.includes('possession') || lower.includes('legal')) {
        aiReply = "Saheel Luxton is registered under MahaRERA No. PM1260002502043 with targeted possession in June 2030. All statutory clearances (SEIAA environmental, clear freehold title, CFO fire NOC) are 100% verified.";
        replies = ['Verify on MahaRERA Portal', 'Download Project Legal Dossier'];
      } else if (lower.includes('visit') || lower.includes('book') || lower.includes('cab') || lower.includes('tour')) {
        aiReply = "We would be delighted to host you for a private preview at our experience center. Complimentary AC cab pickup and personalized walk-in closet tours are arranged on request.";
        replies = ['Schedule VIP Site Visit', 'Connect on WhatsApp'];
      } else {
        aiReply = `Thank you for your interest in Saheel Luxton. We offer iconic 30-storey luxury residences in prime Wakad with Pune's 1st 4,000 sq.ft grand lobby. Would you like to download our master brochure or schedule a VIP visit?`;
        replies = ['Download Master Brochure', 'Schedule VIP Site Visit'];
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies: replies
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleQuickReplyClick = (reply: string) => {
    if (reply.includes('Cost Sheet') || reply.includes('Brochure') || reply.includes('Dossier') || reply.includes('Specs')) {
      onOpenBrochure();
    } else if (reply.includes('Visit') || reply.includes('Pickup') || reply.includes('Lock') || reply.includes('Offers')) {
      onOpenBooking();
    } else if (reply.includes('WhatsApp')) {
      window.open(`https://wa.me/${projectData.whatsappPhone}?text=${encodeURIComponent("Hello Saheel Properties, I was chatting with your AI Concierge and would like more details.")}`, '_blank');
    } else if (reply.includes('MahaRERA')) {
      window.open('https://maharera.mahaonline.gov.in', '_blank');
    } else {
      handleSendMessage(reply);
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-40 p-3.5 sm:p-4 rounded-full btn-auric text-slate-950 shadow-gold-glow flex items-center gap-2 cursor-pointer border-2 border-champagne-300"
        aria-label="Toggle AI Luxury Concierge"
      >
        <Sparkles className="w-5 h-5 animate-pulse text-slate-950" />
        <span className="text-xs font-bold font-cinzel hidden sm:inline text-slate-950">AI Concierge</span>
      </motion.button>

      {/* Interactive Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 left-4 sm:left-6 z-50 w-[calc(100vw-2rem)] sm:w-96 rounded-3xl ultra-glass border-2 border-champagne-500/40 bg-white/95 shadow-2xl overflow-hidden flex flex-col max-h-[520px] backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white flex items-center justify-between border-b border-champagne-500/30">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl btn-auric text-slate-950 flex items-center justify-center font-bold shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold font-cinzel text-white flex items-center gap-1.5">
                    Saheel AI Concierge
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </h4>
                  <span className="text-[10px] text-champagne-400 font-mono">Verified Instant Intelligence</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Stream */}
            <div className="p-4 overflow-y-auto space-y-3.5 flex-1 text-xs max-h-80 bg-milky-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'btn-auric text-slate-950 rounded-br-none shadow-sm font-medium'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 font-mono px-1">
                    {msg.timestamp}
                  </span>

                  {/* Quick Action Suggestion Chips */}
                  {msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                      {msg.quickReplies.map((qr, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuickReplyClick(qr)}
                          className="text-[10px] px-2.5 py-1 rounded-xl bg-champagne-100/80 hover:bg-champagne-500 hover:text-white text-champagne-900 border border-champagne-400/40 transition font-bold cursor-pointer"
                        >
                          {qr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 italic p-2 bg-white rounded-2xl border border-slate-200 w-24">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-600 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-600 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-600 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about prices, lobby, MahaRERA..."
                className="flex-1 px-3.5 py-2.5 rounded-2xl bg-milky-100 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-champagne-500 text-slate-800 font-medium"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2.5 rounded-2xl btn-auric text-slate-950 disabled:opacity-50 transition shadow-sm cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
