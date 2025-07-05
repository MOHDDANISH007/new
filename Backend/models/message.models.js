import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false // AI messages won't have a userId
    },

    role: {
      type: String,
      enum: ['user', 'ai'],
      required: true
    },

    content: {
      type: String,
      required: true
    },

    voiceUrl: {
      type: String,
      default: null // Optional voice message or AI TTS response
    }
  },
  { timestamps: true }
)

const Message = mongoose.model('Message', messageSchema)

export default Message
