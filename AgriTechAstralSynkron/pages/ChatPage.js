import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import supabase from '../supabaseclient';

const ChatPage = () => {
  const [messages, setMessages] = useState([]); // Stores all messages
  const [newMessage, setNewMessage] = useState(''); // For input message
  const toast = useToast();

  useEffect(() => {
    // Fetch existing messages on component mount
    fetchMessages();

    // Set up a real-time subscription to listen for new messages
    const subscription = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prevMessages) => [...prevMessages, payload.new]);
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: true });
    if (error) {
      console.error('Error fetching messages:', error.message);
      toast({
        title: 'Error',
        description: 'Failed to fetch messages.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      setMessages(data);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) {
      toast({
        title: 'Error',
        description: 'Message cannot be empty.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const { error } = await supabase.from('messages').insert([
      { content: newMessage, sender: 'User', created_at: new Date().toISOString() },
    ]);

    if (error) {
      console.error('Error sending message:', error.message);
      toast({
        title: 'Error',
        description: 'Failed to send message.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      setNewMessage(''); // Clear input field
    }
  };

  return (
    <Box maxWidth="600px" margin="auto" padding="20px" boxShadow="lg" borderRadius="md" backgroundColor="white">
      <VStack spacing={4} align="stretch">
        <Box height="400px" overflowY="auto" border="1px solid #e2e8f0" padding="10px" borderRadius="md">
          {messages.map((message, index) => (
            <Flex
              key={index}
              justify={message.sender === 'User' ? 'flex-end' : 'flex-start'}
              marginBottom="10px"
            >
              <Box
                backgroundColor={message.sender === 'User' ? 'teal.500' : 'gray.200'}
                color={message.sender === 'User' ? 'white' : 'black'}
                padding="10px"
                borderRadius="md"
                maxWidth="70%"
              >
                <Text fontSize="sm">{message.sender}</Text>
                <Text>{message.content}</Text>
              </Box>
            </Flex>
          ))}
        </Box>

        <Flex>
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            marginRight="10px"
          />
          <Button colorScheme="teal" onClick={sendMessage}>
            Send
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default ChatPage;
