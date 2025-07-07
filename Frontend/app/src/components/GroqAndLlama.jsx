import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/Auth.context'
import { BsRobot, BsSend } from 'react-icons/bs'
import { MdOutlineAccountCircle } from 'react-icons/md'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

// Markdown + highlight
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css' // More modern theme

const GroqAndLlama = () => {
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messageEndRef = useRef(null)

  const BASE_URL = 'https://riseandhackparishackathon.onrender.com'

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const parseMarkdown = async text => {
    const file = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(text)

    return String(file)
  }

  const handleSend = async () => {
    if (!input.trim() || loading) return

    // Add user message immediately
    const userMessage = {
      role: 'user',
      content: input,
      id: Date.now()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await axios.post(
        `${BASE_URL}/chat/chat_with_ai`,
        {
          userId: user._id,
          conversationMessage: input
        },
        { withCredentials: true }
      )

      const parsedMessages = await Promise.all(
        res.data.messages.map(async msg => ({
          ...msg,
          content:
            msg.role === 'ai' ? await parseMarkdown(msg.content) : msg.content,
          id: Date.now() + Math.random() // Unique ID for each message
        }))
      )

      setMessages(prev => [...prev, ...parsedMessages])
    } catch (error) {
      console.error('Chat error:', error)
      // Add error message
      setMessages(prev => [
        ...prev,
        {
          role: 'ai',
          content:
            '<p class="text-red-500">Sorry, there was an error processing your request. Please try again.</p>',
          id: Date.now()
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 py-8 px-4 sm:px-6 lg:px-8'>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className='max-w-6xl mx-auto rounded-2xl shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden flex flex-col h-[85vh] border border-gray-700'
      >
        {/* Header */}
        <div className='bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-white flex items-center justify-between shadow-lg'>
          <div className='flex items-center gap-3'>
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 5
              }}
            >
              <BsRobot className='text-2xl' />
            </motion.div>
            <div>
              <h1 className='font-bold text-xl'>Groq + LLaMA 3 Turbo</h1>
              <p className='text-xs opacity-80'>AI Financial Assistant</p>
            </div>
          </div>
          {user && (
            <div className='flex items-center gap-2 text-sm'>
              <MdOutlineAccountCircle className='text-xl' />
              <span>{user.name || user.email.split('@')[0]}</span>
            </div>
          )}
        </div>

        {/* Chat messages */}
        <div className='flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-indigo-700 scrollbar-track-gray-800'>
          <AnimatePresence>
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className='flex flex-col items-center justify-center h-full text-center text-gray-400'
              >
                <BsRobot className='text-5xl mb-4 text-indigo-400 opacity-50' />
                <h3 className='text-xl font-medium mb-2'>
                  Welcome to your AI Financial Assistant
                </h3>
                <p className='max-w-md'>
                  Ask me anything about personal finance, investments, or money
                  management. I can help analyze your financial situation and
                  provide insights.
                </p>
                <div className='mt-6 grid grid-cols-2 gap-3 w-full max-w-md'>
                  {[
                    'Best way to save for retirement?',
                    'How to reduce my taxes?',
                    'Explain index funds',
                    'Create a budget plan'
                  ].map((prompt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className='bg-gray-700 hover:bg-gray-600 text-sm p-2 rounded-lg border border-gray-600 transition-all'
                      onClick={() => setInput(prompt)}
                    >
                      "{prompt}"
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: msg.role === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex max-w-xl ${
                    msg.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  {msg.role === 'ai' ? (
                    <div className='flex-shrink-0 mr-3 mt-1'>
                      <div className='bg-indigo-600 p-1.5 rounded-full'>
                        <BsRobot className='text-white text-lg' />
                      </div>
                    </div>
                  ) : (
                    <div className='flex-shrink-0 ml-3 mt-1'>
                      <div className='bg-gray-600 p-1.5 rounded-full'>
                        <MdOutlineAccountCircle className='text-white text-lg' />
                      </div>
                    </div>
                  )}
                  <div
                    className={`prose prose-sm px-4 py-3 rounded-xl ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-700 text-gray-100'
                    } ${msg.role === 'ai' ? 'prose-invert' : ''}`}
                    dangerouslySetInnerHTML={{ __html: msg.content }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='flex justify-start'
            >
              <div className='flex max-w-xl'>
                <div className='flex-shrink-0 mr-3 mt-1'>
                  <div className='bg-indigo-600 p-1.5 rounded-full'>
                    <BsRobot className='text-white text-lg' />
                  </div>
                </div>
                <div className='bg-gray-700 px-4 py-3 rounded-xl flex items-center space-x-2'>
                  <div className='flex space-x-1'>
                    <div
                      className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                      style={{ animationDelay: '0ms' }}
                    />
                    <div
                      className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                      style={{ animationDelay: '150ms' }}
                    />
                    <div
                      className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                  <span className='text-gray-300'>Thinking...</span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messageEndRef} />
        </div>

        {/* Input area */}
        <div className='border-t border-gray-700 px-4 py-4 bg-gray-800'>
          <motion.div
            className='flex items-center gap-3'
            whileHover={{
              boxShadow: '0 0 0 2px rgba(129, 140, 248, 0.5)'
            }}
          >
            <input
              type='text'
              className='flex-1 border border-gray-600 bg-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 placeholder-gray-400'
              placeholder='Ask anything about your finances...'
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <motion.button
              onClick={handleSend}
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <BsSend className='text-lg' />
              <span className='hidden sm:inline'>Send</span>
            </motion.button>
          </motion.div>
          <p className='text-xs text-gray-500 mt-2 text-center'>
            LLaMA 3 may produce inaccurate information. Always verify important
            financial decisions.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className='text-center mt-6 text-sm text-gray-400'
      >
        <p>
          ⚡ Powered by{' '}
          <span className='text-indigo-400 font-semibold'>Groq</span> &{' '}
          <span className='text-purple-400 font-semibold'>LLaMA 3 Turbo</span> —{' '}
          <span className='text-white'>10x faster</span> financial insights
        </p>
        <p className='mt-1 text-xs text-gray-500'>
          Model: llama3-70b-8192 • Response time: ~200ms
        </p>
      </motion.div>
    </div>
  )
}

export default GroqAndLlama
