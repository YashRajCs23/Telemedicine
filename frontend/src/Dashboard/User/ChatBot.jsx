import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, LoaderCircle, Languages } from 'lucide-react';

// Move LanguageSelectionScreen outside App
const LanguageSelectionScreen = ({ handleLanguageSelect }) => (
    <div className="flex flex-col items-center justify-center h-full bg-slate-100 p-8 text-center">
        <div className="bg-white p-10 rounded-2xl shadow-xl">
            <Languages className="w-16 h-16 mx-auto text-blue-600 mb-4" />
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Choose Your Language</h1>
            <p className="text-slate-600 mb-8">Please select your preferred language to continue.</p>
            <div className="flex justify-center gap-4">
                <button onClick={() => handleLanguageSelect('English')} className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                    English
                </button>
                <button onClick={() => handleLanguageSelect('Hindi')} className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
                    हिन्दी (Hindi)
                </button>
            </div>
        </div>
    </div>
);

// Move ChatScreen outside App
const ChatScreen = ({
    language,
    messages,
    isLoading,
    input,
    setInput,
    handleSendMessage,
    chatEndRef
}) => (
    <div className="w-full max-w-2xl h-full flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden">
        <header className="bg-blue-600 text-white p-4 shadow-md z-10">
            <h1 className="text-2xl font-bold text-center">DOXY AI</h1>
            <p className="text-sm text-center text-blue-100">Your AI Medical Information Assistant</p>
        </header>

        <div className="p-3 bg-amber-100 border-b border-amber-200 text-center">
            <p className="text-xs text-amber-800 font-semibold">
                <span className="font-bold">Disclaimer:</span> This AI is for informational purposes only. Always consult a doctor.
            </p>
        </div>

        <main className="flex-1 p-6 overflow-y-auto bg-slate-50">
            <div className="space-y-6">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                        <div className={`p-2 rounded-full flex-shrink-0 ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-white'}`}>
                            {msg.sender === 'user' ? <User size={20} /> : <Bot size={20} />}
                        </div>
                        <div className={`rounded-lg p-3 ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-800'}`}>
                            <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-start gap-3 max-w-[85%]">
                        <div className="p-2 rounded-full flex-shrink-0 bg-slate-700 text-white">
                            <Bot size={20} />
                        </div>
                        <div className="rounded-lg p-3 bg-slate-200 text-slate-800 flex items-center justify-center">
                           <LoaderCircle className="animate-spin text-slate-500" size={20} />
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>
        </main>

        <footer className="p-4 bg-white border-t border-slate-200">
            <form onSubmit={handleSendMessage} className="flex items-center gap-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 p-3 bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder={language === 'Hindi' ? 'एक संदेश लिखें...' : 'Type a message...'}
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading} className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-slate-400 transition-colors">
                    <Send />
                </button>
            </form>
        </footer>
    </div>
);

const ChatBot = () => {
    const [view, setView] = useState('language-select'); // 'language-select' or 'chat'
    const [language, setLanguage] = useState('');
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleLanguageSelect = (lang) => {
        setLanguage(lang);
        const initialMessage = {
            sender: 'bot',
            text: lang === 'Hindi'
                ? 'नमस्ते! मैं मेडीबॉट हूँ। मैं आपके मेडिकल सवालों में कैसे मदद कर सकता हूँ?'
                : "Hello! I'm MediBot. How can I help you with your medical questions today?"
        };
        setMessages([initialMessage]);
        setView('chat');
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (input.trim() === '' || isLoading) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3000/chatbot/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input, language })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const botMessage = { sender: 'bot', text: data.reply };
            setMessages(prev => [...prev, botMessage]);

        } catch (error) {
            console.error("Fetch Error:", error);
            const errorMessage = { 
                sender: 'bot', 
                text: "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later."
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="bg-slate-100 flex flex-col items-center justify-center h-screen p-4 font-sans">
            {view === 'language-select' ? (
                <LanguageSelectionScreen handleLanguageSelect={handleLanguageSelect} />
            ) : (
                <ChatScreen
                    language={language}
                    messages={messages}
                    isLoading={isLoading}
                    input={input}
                    setInput={setInput}
                    handleSendMessage={handleSendMessage}
                    chatEndRef={chatEndRef}
                />
            )}
        </div>
    );
};

export default ChatBot;
