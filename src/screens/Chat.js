import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { useMyContextController } from '../context';
import firestore from '@react-native-firebase/firestore';

const Chat = ({ route }) => {
  const { service } = route.params;
  const [messages, setMessages] = useState([]);
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;

  useEffect(() => {
    // Assume there is a field 'unreadMessages' in each service
    // Decrease unread messages count when entering the chat
    if (service.unreadMessages > 0) {
      firestore().collection('services').doc(service.id).update({
        unreadMessages: 0,
      });
    }
  
    // Load previous messages from Firestore in descending order
    const unsubscribe = firestore()
      .collection('services')
      .doc(service.id)
      .collection('chatMessages')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const loadedMessages = [];
        querySnapshot.forEach((doc) => {
          loadedMessages.push(doc.data());
        });
        setMessages(loadedMessages.reverse());
      });
  
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [service]);
  
  function onSend(newMessages = []) {
    const formattedMessages = newMessages.map((message) => ({
      ...message,
      createdAt: message.createdAt.toISOString(),
    }));
  
    // If the sender is the admin, update the inquiry
    if (formattedMessages[0].user._id === 1) {
      firestore().collection('services').doc(service.id).update({
        inquiry: formattedMessages[0].text,
      });
    }
  
    // Save messages to Firestore
    firestore()
      .collection('services')
      .doc(service.id)
      .collection('chatMessages')
      .add({
        ...formattedMessages[0],
        serviceId: service.id,
      });
  }
  

  return (
    <GiftedChat
  messages={messages.reverse()}  // Reverse the order of messages
  onSend={onSend}
  user={{
    _id: userLogin.role === 'admin' ? 1 : 2, // ID của admin hoặc customer
    name: userLogin.name,
  }}
/>

  );
};

export default Chat;
