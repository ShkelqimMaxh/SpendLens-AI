import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { COLORS, FONT, SPACING } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      isUser: true,
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    
    // TODO: Integrate with OpenAI API
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm analyzing your question...",
        isUser: false,
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 500);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView 
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map(message => (
          <View 
            key={message.id} 
            style={[
              styles.message,
              message.isUser ? styles.userMessage : styles.aiMessage
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask a question..."
          placeholderTextColor={COLORS.text.secondary}
          multiline
        />
        <Pressable 
          style={({ pressed }) => [
            styles.sendButton,
            pressed && { opacity: 0.8 }
          ]}
          onPress={handleSend}
        >
          <Ionicons name="send" size={24} color={COLORS.text.white} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: SPACING.md,
  },
  message: {
    maxWidth: '80%',
    padding: SPACING.md,
    borderRadius: SPACING.sm,
    marginBottom: SPACING.md,
  },
  userMessage: {
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: COLORS.secondary,
    alignSelf: 'flex-start',
  },
  messageText: {
    ...FONT.regular,
    fontSize: FONT.sizes.md,
    color: COLORS.text.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background.primary,
  },
  input: {
    flex: 1,
    ...FONT.regular,
    fontSize: FONT.sizes.md,
    color: COLORS.text.primary,
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.md,
    borderRadius: SPACING.sm,
    marginRight: SPACING.sm,
    maxHeight: 100,
  },
  sendButton: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 