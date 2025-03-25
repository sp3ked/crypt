import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

// Function to send a message to the chatbot API
export const sendChatMessage = async (message: string): Promise<string> => {
  try {
    const response = await axios.post(API_ENDPOINTS.CHATBOT.CHAT, {
      message
    });
    
    return response.data.reply;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw new Error('Failed to get response from the chatbot');
  }
}; 