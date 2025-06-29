import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ChatBubbleProps {
  children: ReactNode;
  isUser: boolean;
  delay?: number;
}

export default function ChatBubble({ children, isUser, delay = 0 }: ChatBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.3,
        delay,
        ease: "easeOut"
      }}
      className={`flex items-start space-x-3 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {children}
    </motion.div>
  );
}
