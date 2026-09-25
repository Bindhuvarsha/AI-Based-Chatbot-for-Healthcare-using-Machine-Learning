import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Sparkles, AlertCircle, Bot, User, Pill, Heart, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { logError, getErrorMessage, validateSymptoms } from '../utils/errorHandler';

const API_BASE = "/api";

const SymptomChecker = ({ setDiagnosisContext, setActiveTab }) => {
  const [messages, setMessages] = useState([
    { 
      role: 'ai', 
      content: 'Hello! I am your AI Health Assistant. Describe your symptoms or ask a health question, and I will analyze them for you. Remember, this is not a substitute for professional medical advice.',
      isInitial: true
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [accumulatedSymptoms, setAccumulatedSymptoms] = useState([]);
  const [currentDiagnosis, setCurrentDiagnosis] = useState(null);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Generate conversation ID on mount
    if (!conversationId) {
      setConversationId(`conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    }
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    // Validate input
    const validation = validateSymptoms(input);
    if (!validation.valid) {
      setError(validation.error);
      setTimeout(() => setError(null), 5000);
      return;
    }

    if (loading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE}/chat`, {
        message: input,
        conversation_id: conversationId,
        include_context: true
      }, {
        timeout: 15000
      });

      const { data } = response;

      // Update accumulated symptoms
      if (data.symptoms_updated && data.symptoms_updated.length > 0) {
        setAccumulatedSymptoms(data.symptoms_updated);
      }

      // Store diagnosis for hospital finder
      if (data.diagnosis) {
        setCurrentDiagnosis(data.diagnosis);
        if (setDiagnosisContext) {
          setDiagnosisContext(data.diagnosis);
        }
      }

      // Format AI response
      let aiContent = data.message;
      
      // Add diagnosis details if available
      if (data.diagnosis) {
        aiContent += `\n\n📋 **Possible Conditions:**\n`;
        data.diagnosis.conditions?.forEach(condition => {
          aiContent += `- ${condition.name} (${(condition.probability * 100).toFixed(0)}% likely)\n`;
        });
        
        if (data.diagnosis.severity) {
          aiContent += `\n⚠️ Severity: ${data.diagnosis.severity}`;
        }
        
        if (data.diagnosis.requires_immediate_attention) {
          aiContent += `\n🚨 **Please seek immediate medical attention!**`;
        }

        if (data.diagnosis.recommended_specialties?.length > 0) {
          aiContent += `\n\n👨‍⚕️ **Recommended Specialists:**\n`;
          data.diagnosis.recommended_specialties.forEach(spec => {
            aiContent += `- ${spec}\n`;
          });
        }
      }

      // Add medicine recommendations if available
      if (data.medicines) {
        aiContent += `\n\n💊 **Medicine Options:**\n`;
        data.medicines.over_the_counter?.slice(0, 3).forEach(med => {
          aiContent += `- ${med.name} (${med.dosage}) - ${med.frequency}\n`;
        });
        
        if (data.medicines.drug_interaction_warnings?.length > 0) {
          aiContent += `\n⚠️ **Drug Interactions:**\n`;
          data.medicines.drug_interaction_warnings.forEach(warning => {
            aiContent += `- ${warning}\n`;
          });
        }
      }

      // Add follow-up questions
      if (data.followup_questions?.length > 0) {
        aiContent += `\n\n❓ **Follow-up Questions:**\n`;
        data.followup_questions.slice(0, 2).forEach(q => {
          aiContent += `- ${q}\n`;
        });
      }

      const aiMsg = { 
        role: 'ai', 
        content: aiContent,
        symptoms: data.symptoms_extracted,
        diagnosis: data.diagnosis,
        medicines: data.medicines,
        confidence: data.confidence_score
      };

      setMessages(prev => [...prev, aiMsg]);

    } catch (error) {
      const errorMessage = getErrorMessage(error, 'symptoms');
      logError(error, { context: 'symptom_checker', conversationId });

      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: errorMessage,
        isError: true
      }]);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleFindHospitals = () => {
    if (setActiveTab) {
      setActiveTab('hospitals');
    }
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-6 px-4 py-6 custom-scrollbar">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`p-2 rounded-xl border flex-shrink-0 ${
                msg.role === 'user' 
                ? 'bg-emerald-500 text-slate-950 border-emerald-400' 
                : msg.isError 
                ? 'bg-red-900 text-red-200 border-red-700'
                : 'bg-slate-900 border-slate-800 text-emerald-400'
              }`}>
                {msg.role === 'user' ? <User size={18} /> : msg.isError ? <AlertTriangle size={18} /> : <Bot size={18} />}
              </div>
              
              <div className={`flex flex-col gap-3 max-w-[80%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                <div className={`p-5 rounded-2xl shadow-xl leading-relaxed whitespace-pre-wrap text-sm ${
                  msg.role === 'user'
                  ? 'bg-emerald-500 text-slate-950 font-semibold rounded-tr-none'
                  : msg.isError
                  ? 'bg-red-900/30 border border-red-700/50 text-red-200 rounded-tl-none'
                  : 'bg-slate-900/80 backdrop-blur-md border border-slate-800 text-slate-200 rounded-tl-none'
                }`}>
                  {msg.isError && <AlertCircle className="inline-block mr-2 text-red-500" size={16} />}
                  {msg.content}
                </div>

                {/* Extracted Symptoms Tags */}
                {msg.symptoms && msg.symptoms.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {msg.symptoms.map((s, idx) => (
                      <span key={idx} className="text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {/* Confidence Score */}
                {msg.confidence && (
                  <div className="text-xs text-slate-500 font-semibold">
                    Confidence: {(msg.confidence * 100).toFixed(0)}%
                  </div>
                )}

                {/* Find Hospitals Button */}
                {msg.diagnosis && msg.role === 'ai' && (
                  <button
                    onClick={handleFindHospitals}
                    className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2 self-start"
                  >
                    <Heart size={16} />
                    Find Nearby Hospitals
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-4">
             <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 flex-shrink-0">
                <Bot size={18} />
             </div>
             <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 p-5 rounded-2xl rounded-tl-none">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
             </div>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Error Alert */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mx-4 p-3 bg-red-900/20 border border-red-700/50 text-red-300 rounded-lg text-sm flex items-start gap-2"
        >
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Accumulated Symptoms Display */}
      {accumulatedSymptoms.length > 0 && (
        <div className="px-6 py-3 bg-slate-900/50 border-t border-slate-800 border-b">
          <p className="text-xs uppercase font-bold text-slate-400 mb-2">Identified Symptoms:</p>
          <div className="flex flex-wrap gap-2">
            {accumulatedSymptoms.map((symptom, idx) => (
              <span key={idx} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/40">
                {symptom}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-6 bg-slate-950/80 backdrop-blur-2xl border-t border-slate-800 flex gap-4 items-end">
        <div className="relative flex-1 group">
          <div className="absolute inset-0 bg-emerald-500/10 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity rounded-2xl" />
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Describe your symptoms (e.g., 'headache, fever, body aches')..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500/50 transition-all resize-none min-h-[60px] text-slate-100 placeholder:text-slate-600 relative z-10"
            rows={1}
            disabled={loading}
          />
        </div>
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-emerald-500 text-slate-950 p-4 rounded-2xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed h-[60px] w-[60px] flex items-center justify-center relative z-10 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <Send size={24} className="relative z-10" />
        </button>
      </div>
      
      <div className="px-6 pb-4 text-center">
        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
          <Sparkles size={12} className="text-emerald-500" /> Powered by OpenAI GPT-4 Medical Model
        </p>
      </div>
    </div>
  );
};

export default SymptomChecker;
