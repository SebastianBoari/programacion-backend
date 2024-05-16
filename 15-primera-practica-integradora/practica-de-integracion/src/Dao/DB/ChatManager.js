import { chatModel } from '../../models/chat.model.js';

class ChatManager {
    async getMessageHistory() {
        try {
            const messages = await chatModel.find().lean()

            return messages
        } catch (error) {
            throw new Error(`Error getting message history: ${error}`)
        }
    }

    async sendMessage(data) {
        try {
            const newMessage = await chatModel.create({
                message: data.message,
                user: data.user,
            })

            return newMessage
        } catch (error) {
            throw new Error(`Error sending message: ${error}`)
        }
    }
}

const chatManager = new ChatManager()

export default chatManager
