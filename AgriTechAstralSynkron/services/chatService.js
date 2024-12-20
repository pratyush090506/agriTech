import supabase from '../supabaseclient';

// Send a message
export const sendMessage = async (chatId, senderId, messageText) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([{ chat_id: chatId, sender_id: senderId, text: messageText }]);
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error sending message:', err.message);
    return null;
  }
};

// Fetch messages for a chat
export const fetchMessages = async (chatId) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error fetching messages:', err.message);
    return null;
  }
};
import supabase from '../supabaseclient';

// Send a message
export const sendMessage = async (chatId, senderId, messageText) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([{ chat_id: chatId, sender_id: senderId, text: messageText }]);
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error sending message:', err.message);
    return null;
  }
};

// Fetch messages for a chat
export const fetchMessages = async (chatId) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error fetching messages:', err.message);
    return null;
  }
};
